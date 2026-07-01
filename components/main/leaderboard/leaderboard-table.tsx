"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { BeachLeaderboard } from "@/types/leaderboard";
import { Bot, ExternalLink } from "lucide-react";
import { getStatusColor, formatRelativeDate } from "./utils";

interface LeaderboardTableProps {
  data: BeachLeaderboard[];
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onRowClick: (beach: BeachLeaderboard) => void;
}

export function LeaderboardTable({
  data,
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
  onRowClick,
}: LeaderboardTableProps) {
  const startRank = (page - 1) * pageSize;

  const paginationPages = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push("ellipsis");
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <section id="leaderboard-table" className="space-y-4">
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Rank</TableHead>
              <TableHead>Beach</TableHead>
              <TableHead className="hidden sm:table-cell">Location</TableHead>
              <TableHead className="text-center">Score</TableHead>
              <TableHead className="text-center hidden sm:table-cell">
                Status
              </TableHead>
              <TableHead className="text-center hidden md:table-cell">
                AI Conf.
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                Last Analysis
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((beach, idx) => {
              const rank = startRank + idx + 1;
              const statusColor = getStatusColor(beach.status);

              return (
                <TableRow
                  key={beach.id}
                  className="cursor-pointer"
                  onClick={() => onRowClick(beach)}
                  id={`leaderboard-row-${beach.id}`}
                >
                  <TableCell>
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-muted text-xs font-bold">
                      {rank}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="size-8 shrink-0 rounded-md bg-gradient-to-br from-primary/20 to-chart-2/20" />
                      <span className="font-medium">{beach.beachName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {beach.location}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-bold text-lg tabular-nums">
                      {beach.environmentalScore}
                    </span>
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    <Badge
                      variant="outline"
                      className={`border-none ${statusColor.bg} ${statusColor.text}`}
                    >
                      <span
                        className={`mr-1 inline-block size-1.5 rounded-full ${statusColor.dot}`}
                      />
                      {beach.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center hidden md:table-cell">
                    <div className="flex items-center justify-center gap-1 text-muted-foreground">
                      <Bot className="size-3" />
                      <span className="tabular-nums">{beach.aiConfidence}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-muted-foreground">
                    {formatRelativeDate(beach.lastAnalyzed)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="xs"
                      asChild
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Link href={`/analyze/${beach.slug}`}>
                        <ExternalLink className="size-3" data-icon="inline-start" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing {startRank + 1}–{Math.min(startRank + pageSize, total)} of{" "}
            {total} beaches
          </p>
          <Pagination className="w-auto mx-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) onPageChange(page - 1);
                  }}
                  aria-disabled={page === 1}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {paginationPages().map((p, i) =>
                p === "ellipsis" ? (
                  <PaginationItem key={`e-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={p === page}
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(p);
                      }}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < totalPages) onPageChange(page + 1);
                  }}
                  aria-disabled={page === totalPages}
                  className={
                    page === totalPages ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </section>
  );
}
