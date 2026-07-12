"use client";

import { useState, useMemo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MessageSquare,
  Search,
  Plus,
  Trash2,
  Clock,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface HistoryItem {
  id: string;
  title: string;
  timestamp: string;
  group: "Hari Ini" | "Kemarin" | "Minggu Ini";
}

const INITIAL_HISTORY: HistoryItem[] = [
  {
    id: "1",
    title: "Analisis Abrasi Pantai Kuta",
    timestamp: "14:32",
    group: "Hari Ini",
  },
  {
    id: "2",
    title: "Kesehatan Mangrove Muara Gembong",
    timestamp: "10:15",
    group: "Hari Ini",
  },
  {
    id: "3",
    title: "Kualitas Air Danau Toba",
    timestamp: "Kemarin",
    group: "Kemarin",
  },
  {
    id: "4",
    title: "Pencemaran Plastik Kepulauan Seribu",
    timestamp: "Kemarin",
    group: "Kemarin",
  },
  {
    id: "5",
    title: "Restorasi Pesisir Surabaya",
    timestamp: "3 hari yang lalu",
    group: "Minggu Ini",
  },
  {
    id: "6",
    title: "Suhu Permukaan Selat Sunda",
    timestamp: "5 hari yang lalu",
    group: "Minggu Ini",
  },
];

interface ChatHistorySidebarProps {
  onNewChat: () => void;
  className?: string;
}

export function ChatHistorySidebar({
  onNewChat,
  className,
}: ChatHistorySidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>(INITIAL_HISTORY);

  // Filter items by search query
  const filteredHistory = useMemo(() => {
    return history.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [history, searchQuery]);

  // Group items
  const groups = useMemo(() => {
    const grouped: Record<string, HistoryItem[]> = {
      "Hari Ini": [],
      "Kemarin": [],
      "Minggu Ini": [],
    };

    filteredHistory.forEach((item) => {
      grouped[item.group].push(item);
    });

    return grouped;
  }, [filteredHistory]);

  const handleDeleteItem = useCallback((id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering chat loading
    setHistory((prev) => prev.filter((item) => item.id !== id));
    toast.success(`Riwayat "${title}" berhasil dihapus`);
  }, []);

  const handleSelectHistory = useCallback((title: string) => {
    toast.info(`Memuat percakapan: "${title}"`, {
      description: "Fitur sinkronisasi riwayat akan segera hadir.",
    });
  }, []);

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden h-[calc(100vh-8rem)] md:h-[calc(100vh-9rem)] w-full",
        "border-border/50 bg-background/95 backdrop-blur-sm shadow-lg",
        "dark:bg-background/50 dark:border-border/50",
        className,
      )}
    >
      {/* Sidebar Header */}
      <div className="flex flex-col gap-3 p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-primary" />
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              Riwayat Chat
            </h2>
          </div>
          <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground font-medium">
            Demo UI
          </span>
        </div>

        {/* Start New Chat Button */}
        <Button
          onClick={onNewChat}
          className="w-full gap-2 justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-medium py-4 shadow-sm hover:shadow"
        >
          <Plus className="size-4" />
          Chat Baru
        </Button>
      </div>

      {/* Search bar */}
      <div className="px-4 py-3 border-b border-border/40 bg-card/10">
        <div className="relative flex items-center">
          <Search className="absolute left-3 size-3.5 text-muted-foreground/60" />
          <input
            type="text"
            placeholder="Cari riwayat..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={cn(
              "w-full pl-9 pr-3 py-1.5 rounded-lg border border-border/50 bg-background/50",
              "text-xs placeholder:text-muted-foreground/50 text-foreground outline-none",
              "focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all",
            )}
          />
        </div>
      </div>

      {/* History Items Scroll Area */}
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-4 p-4">
          {filteredHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <MessageSquare className="size-8 text-muted-foreground/30 mb-2" />
              <p className="text-xs text-muted-foreground font-medium">
                Tidak ada riwayat ditemukan
              </p>
            </div>
          ) : (
            Object.entries(groups).map(([groupName, items]) => {
              if (items.length === 0) return null;

              return (
                <div key={groupName} className="space-y-1.5">
                  <h3 className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-wider px-2">
                    {groupName}
                  </h3>
                  <div className="space-y-1">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectHistory(item.title)}
                        className={cn(
                          "group flex items-center justify-between gap-2 p-2.5 rounded-xl text-left cursor-pointer",
                          "transition-all duration-150 border border-transparent",
                          "hover:bg-muted/70 hover:border-border/40",
                          "dark:hover:bg-muted/20",
                        )}
                      >
                        <div className="flex items-start gap-2.5 min-w-0 flex-1">
                          <MessageSquare className="size-4 text-muted-foreground/60 group-hover:text-primary transition-colors mt-0.5 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-foreground truncate group-hover:text-foreground transition-colors leading-normal">
                              {item.title}
                            </p>
                            <span className="text-[9px] text-muted-foreground/60 leading-none">
                              {item.timestamp}
                            </span>
                          </div>
                        </div>

                        {/* Hover Actions */}
                        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            onClick={(e) => handleDeleteItem(item.id, item.title, e)}
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md"
                            title="Hapus riwayat"
                          >
                            <Trash2 className="size-3" />
                          </Button>
                          <ChevronRight className="size-3.5 text-muted-foreground/40" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}
