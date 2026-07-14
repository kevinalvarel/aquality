"use client";

import { useState, useMemo, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Search,
  Plus,
  Trash2,
  Clock,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface HistoryItem {
  id: string;
  title: string;
  timestamp: string;
  group: "Hari Ini" | "Kemarin" | "Minggu Ini" | "Sebelumnya";
}

function getGroupAndTimestamp(dateString: string | Date): {
  group: "Hari Ini" | "Kemarin" | "Minggu Ini" | "Sebelumnya";
  timestamp: string;
} {
  const date = new Date(dateString);
  const now = new Date();

  const dMidnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const nowMidnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const diffTime = nowMidnight.getTime() - dMidnight.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let group: "Hari Ini" | "Kemarin" | "Minggu Ini" | "Sebelumnya" =
    "Sebelumnya";

  if (diffDays === 0) {
    group = "Hari Ini";
  } else if (diffDays === 1) {
    group = "Kemarin";
  } else if (diffDays < 7) {
    group = "Minggu Ini";
  } else {
    group = "Sebelumnya";
  }

  let timestamp = "";
  if (group === "Hari Ini") {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    timestamp = `${hours}:${minutes}`;
  } else if (group === "Kemarin") {
    timestamp = "Kemarin";
  } else if (group === "Minggu Ini") {
    timestamp = `${diffDays} hari yang lalu`;
  } else {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    timestamp = `${day}/${month}/${year}`;
  }

  return { group, timestamp };
}

interface ChatHistorySidebarProps {
  onNewChat: () => void;
  conversations: any[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  isLoading: boolean;
  className?: string;
}

export function ChatHistorySidebar({
  onNewChat,
  conversations,
  activeConversationId,
  onSelectConversation,
  onDeleteConversation,
  isLoading,
  className,
}: ChatHistorySidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const historyItems = useMemo((): HistoryItem[] => {
    return conversations.map((conv) => {
      const { group, timestamp } = getGroupAndTimestamp(conv.updatedAt);
      return {
        id: conv.id,
        title: conv.title,
        timestamp,
        group,
      };
    });
  }, [conversations]);

  const filteredHistory = useMemo(() => {
    return historyItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [historyItems, searchQuery]);

  const groups = useMemo(() => {
    const grouped: Record<string, HistoryItem[]> = {
      "Hari Ini": [],
      Kemarin: [],
      "Minggu Ini": [],
      Sebelumnya: [],
    };

    filteredHistory.forEach((item) => {
      grouped[item.group].push(item);
    });

    return grouped;
  }, [filteredHistory]);

  const handleDeleteItem = useCallback(
    (id: string, title: string, e: React.MouseEvent) => {
      e.stopPropagation();
      if (confirm(`Apakah Anda yakin ingin menghapus riwayat "${title}"?`)) {
        onDeleteConversation(id);
      }
    },
    [onDeleteConversation],
  );

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
          {isLoading && (
            <Loader2 className="size-3 text-muted-foreground animate-spin" />
          )}
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
                {isLoading
                  ? "Memuat riwayat..."
                  : "Tidak ada riwayat ditemukan"}
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
                    {items.map((item) => {
                      const isActive = item.id === activeConversationId;
                      return (
                        <div
                          key={item.id}
                          onClick={() => onSelectConversation(item.id)}
                          className={cn(
                            "group flex items-center justify-between gap-2 p-2.5 rounded-xl text-left cursor-pointer",
                            "transition-all duration-150 border",
                            isActive
                              ? "bg-primary/5 border-primary/20 hover:bg-primary/10"
                              : "border-transparent hover:bg-muted/70 hover:border-border/40 dark:hover:bg-muted/20",
                          )}
                        >
                          <div className="flex items-start gap-2.5 min-w-0 flex-1">
                            <MessageSquare
                              className={cn(
                                "size-4 mt-0.5 shrink-0 transition-colors",
                                isActive
                                  ? "text-primary"
                                  : "text-muted-foreground/60 group-hover:text-primary",
                              )}
                            />
                            <div className="min-w-0 flex-1">
                              <p
                                className={cn(
                                  "text-xs font-medium truncate leading-normal transition-colors",
                                  isActive
                                    ? "text-primary font-semibold"
                                    : "text-foreground group-hover:text-foreground",
                                )}
                              >
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
                              onClick={(e) =>
                                handleDeleteItem(item.id, item.title, e)
                              }
                              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md"
                              title="Hapus riwayat"
                            >
                              <Trash2 className="size-3" />
                            </Button>
                            <ChevronRight className="size-3.5 text-muted-foreground/40" />
                          </div>
                        </div>
                      );
                    })}
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
