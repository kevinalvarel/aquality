"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Eye, ExternalLink } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { fetchAnalysesAction } from "@/servers/analysis-actions";
import { formatDate, formatRelativeDate } from "@/lib/utils";

interface AnalysisRow {
  id: string;
  slug: string;
  beachName: string;
  status: "Excellent" | "Good" | "Moderate" | "Poor";
  confidence: number;
  createdAt: string;
}

const statusLabels: Record<string, string> = {
  Excellent: "Sangat Baik",
  Good: "Baik",
  Moderate: "Sedang",
  Poor: "Buruk",
};

const statusConfig: Record<AnalysisRow["status"], { className: string }> = {
  Excellent: {
    className: "bg-primary/15 text-primary border border-primary/30",
  },
  Good: {
    className: "bg-success/15 text-success border border-success/30",
  },
  Moderate: {
    className: "bg-warning/15 text-warning border border-warning/30",
  },
  Poor: {
    className:
      "bg-destructive/15 text-destructive border border-destructive/30",
  },
};

const mapStatus = (status: string | null): AnalysisRow["status"] => {
  if (!status) return "Moderate";
  const lower = status.toLowerCase();
  if (lower === "excellent") return "Excellent";
  if (lower === "good") return "Good";
  if (lower === "poor") return "Poor";
  return "Moderate";
};

export function RecentAnalysesTable() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "all";
  const sort = searchParams.get("sort") || "newest";

  const [analyses, setAnalyses] = useState<AnalysisRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(
    async (isPoll = false) => {
      if (!isPoll) setIsLoading(true);

      // Map URL sort to API sortField and sortDirection
      let sortField: "createdAt" | "aiConfidence" = "createdAt";
      let sortDirection: "asc" | "desc" = "desc";

      if (sort === "oldest") {
        sortField = "createdAt";
        sortDirection = "asc";
      } else if (sort === "highest") {
        sortField = "aiConfidence";
        sortDirection = "desc";
      } else if (sort === "lowest") {
        sortField = "aiConfidence";
        sortDirection = "asc";
      }

      const filters: {
        page: number;
        pageSize: number;
        sortField: "createdAt" | "aiConfidence";
        sortDirection: "asc" | "desc";
        search?: string;
        status?: string;
      } = {
        page: 1,
        pageSize: 8,
        sortField,
        sortDirection,
      };

      if (search.trim() !== "") {
        filters.search = search;
      }
      if (status !== "all") {
        filters.status = status;
      }

      const result = await fetchAnalysesAction(filters);
      if (result.success && result.data) {
        const mapped: AnalysisRow[] = result.data.map((item) => ({
          id: item.id,
          slug: item.slug,
          beachName: item.beachName,
          status: mapStatus(item.overallStatus),
          confidence: item.aiConfidence ?? 0,
          createdAt: item.createdAt,
        }));
        setAnalyses(mapped);
        setTotalCount(result.total);
      }
      setIsLoading(false);
    },
    [search, status, sort],
  );

  useEffect(() => {
    loadData();

    // Poll every 3 seconds for realtime updates
    const interval = setInterval(() => {
      loadData(true);
    }, 3000);

    return () => clearInterval(interval);
  }, [loadData]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Analisis Terbaru</CardTitle>
            <CardDescription>
              Penilaian kualitas air pantai bertenaga AI terbaru
            </CardDescription>
          </div>
          <span className="text-xs text-muted-foreground">
            {isLoading && analyses.length === 0
              ? "Memuat hasil..."
              : `Menampilkan ${analyses.length} dari ${totalCount} hasil`}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Pantai</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Keyakinan AI</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Terakhir Diperbarui</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && analyses.length === 0 ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="h-5 w-16 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="ml-auto h-8 w-24 animate-pulse rounded bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : analyses.length > 0 ? (
              analyses.map((row) => (
                <TableRow key={row.id} className="group transition-colors">
                  <TableCell className="font-medium">{row.beachName}</TableCell>
                  <TableCell>
                    <Badge
                      variant="default"
                      className={statusConfig[row.status].className}
                    >
                      {statusLabels[row.status] || row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={row.confidence}
                            className="h-1.5 w-16"
                          />
                          <span className="text-sm tabular-nums">
                            {row.confidence}%
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Keyakinan AI: {row.confidence}%</p>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(row.createdAt)}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatRelativeDate(row.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/analyze/${row.slug}`}>
                        <Eye className="size-3.5" />
                        Lihat Detail
                        <ExternalLink className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  Tidak ada analisis ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
