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

interface AnalysisRow {
  id: string;
  slug: string;
  beachName: string;
  status: "Excellent" | "Good" | "Moderate" | "Poor";
  confidence: number;
  date: string;
  lastUpdated: string;
}

const statusConfig: Record<
  AnalysisRow["status"],
  { className: string }
> = {
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
    className: "bg-destructive/15 text-destructive border border-destructive/30",
  },
};

const dummyData: AnalysisRow[] = [
  {
    id: "1",
    slug: "pantai-merak",
    beachName: "Merak Beach",
    status: "Good",
    confidence: 97,
    date: "30 Jun 2026",
    lastUpdated: "2 hours ago",
  },
  {
    id: "2",
    slug: "pantai-anyer",
    beachName: "Anyer Beach",
    status: "Moderate",
    confidence: 92,
    date: "28 Jun 2026",
    lastUpdated: "2 days ago",
  },
  {
    id: "3",
    slug: "pantai-carita",
    beachName: "Carita Beach",
    status: "Excellent",
    confidence: 99,
    date: "25 Jun 2026",
    lastUpdated: "5 days ago",
  },
  {
    id: "4",
    slug: "pantai-tanjung-lesung",
    beachName: "Tanjung Lesung Beach",
    status: "Good",
    confidence: 95,
    date: "24 Jun 2026",
    lastUpdated: "6 days ago",
  },
  {
    id: "5",
    slug: "pantai-sawarna",
    beachName: "Sawarna Beach",
    status: "Excellent",
    confidence: 98,
    date: "22 Jun 2026",
    lastUpdated: "1 week ago",
  },
  {
    id: "6",
    slug: "pantai-karang-bolong",
    beachName: "Karang Bolong Beach",
    status: "Poor",
    confidence: 85,
    date: "20 Jun 2026",
    lastUpdated: "10 days ago",
  },
  {
    id: "7",
    slug: "pantai-bagedur",
    beachName: "Bagedur Beach",
    status: "Good",
    confidence: 93,
    date: "18 Jun 2026",
    lastUpdated: "12 days ago",
  },
  {
    id: "8",
    slug: "pantai-kuta",
    beachName: "Kuta Beach",
    status: "Good",
    confidence: 96,
    date: "15 Jun 2026",
    lastUpdated: "2 weeks ago",
  },
];

export function RecentAnalysesTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Recent Analyses</CardTitle>
            <CardDescription>
              Latest AI-powered beach water quality assessments
            </CardDescription>
          </div>
          <span className="text-xs text-muted-foreground">
            Showing {dummyData.length} of 152 results
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Beach Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>AI Confidence</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyData.map((row) => (
              <TableRow
                key={row.id}
                className="group transition-colors"
              >
                <TableCell className="font-medium">{row.beachName}</TableCell>
                <TableCell>
                  <Badge
                    variant="default"
                    className={statusConfig[row.status].className}
                  >
                    {row.status}
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
                      <p>AI confidence: {row.confidence}%</p>
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {row.date}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {row.lastUpdated}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/analyze/${row.slug}`}>
                      <Eye className="size-3.5" />
                      View Details
                      <ExternalLink className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
