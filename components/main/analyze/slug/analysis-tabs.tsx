"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  Cpu,
  FlaskConical,
  History,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function AnalysisTabs() {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">
          <FileText className="size-3.5" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="ai-details">
          <Cpu className="size-3.5" />
          AI Details
        </TabsTrigger>
        <TabsTrigger value="environmental">
          <FlaskConical className="size-3.5" />
          Environmental Data
        </TabsTrigger>
        <TabsTrigger value="history">
          <History className="size-3.5" />
          History
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Analysis Overview</CardTitle>
            <CardDescription>
              Summary of the latest beach water quality analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              The AI analysis of Kuta Beach captured on June 30, 2026 indicates
              <span className="font-medium text-success"> good water quality</span>{" "}
              with a confidence score of{" "}
              <span className="font-medium text-foreground">97%</span>. The coastal
              environment shows{" "}
              <span className="font-medium text-foreground">minimal pollution</span>{" "}
              and the shoreline is well-maintained. Environmental metrics indicate low
              turbidity (18%), minimal floating waste (7%), and high water clarity (86%).
            </p>
            <Separator />
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">97%</p>
                <p className="text-xs text-muted-foreground">Overall Score</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">Good</p>
                <p className="text-xs text-muted-foreground">Classification</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">6</p>
                <p className="text-xs text-muted-foreground">Objects Detected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="ai-details" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>AI Model Details</CardTitle>
            <CardDescription>
              Technical information about the classification model
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoRow label="Model Name" value="AQuality Vision v2.4" />
                <InfoRow label="Model Type" value="CNN + Transformer" />
                <InfoRow label="Inference Time" value="1.23 seconds" />
                <InfoRow label="Input Resolution" value="1920 × 1080" />
                <InfoRow label="Framework" value="PyTorch 2.3" />
                <InfoRow label="Last Updated" value="15 Jun 2026" />
              </div>
              <Separator />
              <div className="space-y-3">
                <p className="text-sm font-medium">Confidence Distribution</p>
                <div className="space-y-2">
                  <ConfidenceRow label="Water Quality" value={97} />
                  <ConfidenceRow label="Object Detection" value={94} />
                  <ConfidenceRow label="Pollution Assessment" value={91} />
                  <ConfidenceRow label="Shoreline Analysis" value={89} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="environmental" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Environmental Data</CardTitle>
            <CardDescription>
              Chemical and physical water parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <EnvironmentParam label="pH Level" value="7.8" unit="pH" status="Normal" />
              <EnvironmentParam label="Salinity" value="35.2" unit="ppt" status="Normal" />
              <EnvironmentParam label="Dissolved Oxygen" value="6.8" unit="mg/L" status="Good" />
              <EnvironmentParam label="Turbidity" value="4.2" unit="NTU" status="Low" />
              <EnvironmentParam label="Temperature" value="28.5" unit="°C" status="Normal" />
              <EnvironmentParam label="Conductivity" value="52.4" unit="mS/cm" status="Normal" />
              <EnvironmentParam label="Total Dissolved Solids" value="34,100" unit="mg/L" status="Normal" />
              <EnvironmentParam label="Chlorophyll-a" value="1.2" unit="μg/L" status="Low" />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history" className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle>Analysis History</CardTitle>
            <CardDescription>
              Previous analyses for this beach location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Quality</th>
                    <th className="pb-3 font-medium">Confidence</th>
                    <th className="pb-3 font-medium">Pollution</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <HistoryRow date="30 Jun 2026" quality="Good" qualityColor="text-success" confidence={97} pollution="Low" />
                  <HistoryRow date="23 Jun 2026" quality="Good" qualityColor="text-success" confidence={94} pollution="Low" />
                  <HistoryRow date="16 Jun 2026" quality="Moderate" qualityColor="text-warning" confidence={89} pollution="Moderate" />
                  <HistoryRow date="09 Jun 2026" quality="Good" qualityColor="text-success" confidence={92} pollution="Low" />
                  <HistoryRow date="02 Jun 2026" quality="Excellent" qualityColor="text-primary" confidence={98} pollution="Very Low" />
                  <HistoryRow date="26 May 2026" quality="Good" qualityColor="text-success" confidence={91} pollution="Low" />
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function ConfidenceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium tabular-nums">{value}%</span>
      </div>
      <Progress value={value} className="h-1.5" />
    </div>
  );
}

function EnvironmentParam({
  label,
  value,
  unit,
  status,
}: {
  label: string;
  value: string;
  unit: string;
  status: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-muted/20 p-4 transition-colors hover:bg-muted/40">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-xl font-bold">{value}</span>
        <span className="text-xs text-muted-foreground">{unit}</span>
      </div>
      <Badge
        variant="outline"
        className="mt-2 border-success/30 text-success text-[10px]"
      >
        {status}
      </Badge>
    </div>
  );
}

function HistoryRow({
  date,
  quality,
  qualityColor,
  confidence,
  pollution,
}: {
  date: string;
  quality: string;
  qualityColor: string;
  confidence: number;
  pollution: string;
}) {
  return (
    <tr className="transition-colors hover:bg-muted/30">
      <td className="py-3 font-medium">{date}</td>
      <td className={`py-3 font-semibold ${qualityColor}`}>{quality}</td>
      <td className="py-3 tabular-nums">{confidence}%</td>
      <td className="py-3">{pollution}</td>
      <td className="py-3">
        <Button variant="ghost" size="xs">
          <Eye className="size-3" />
          View
        </Button>
      </td>
    </tr>
  );
}
