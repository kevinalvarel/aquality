'use client';

import { useCallback, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ChatHeader } from './chat-header';
import { ChatMessageList } from './chat-message-list';
import { ChatInput } from './chat-input';
import { ChatHistorySidebar } from './chat-history-sidebar';
import { useAquasistenChat } from '@/hooks/use-aquasisten-chat';
import { cn } from '@/lib/utils';
import { AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ChatContainer() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    dismissError,
    conversations,
    activeConversationId,
    selectConversation,
    deleteConversation,
    isConversationsLoading,
  } = useAquasistenChat();

  const [pendingSuggestion, setPendingSuggestion] = useState<string | null>(
    null,
  );

  const handleSelectSuggestion = useCallback(
    (prompt: string) => {
      sendMessage(prompt);
    },
    [sendMessage],
  );

  const handleSend = useCallback(
    (message: string) => {
      sendMessage(message);
    },
    [sendMessage],
  );

  return (
    <div className='flex w-full gap-6 items-stretch'>
      <Card
        className={cn(
          'flex flex-1 flex-col overflow-hidden',
          'h-[calc(100vh-8rem)] md:h-[calc(100vh-9rem)]',
          'border-border/50 bg-background/95 backdrop-blur-sm',
          'dark:bg-background/50 dark:border-border/50',
          'shadow-lg',
        )}
      >
        {/* Header */}
        <ChatHeader messageCount={messages.length} onClearChat={clearChat} />

        {/* Error banner */}
        {error && (
          <div
            className={cn(
              'flex items-center gap-2 px-4 py-2 text-sm',
              'bg-destructive/10 text-destructive border-b border-destructive/20',
            )}
            role='alert'
          >
            <AlertCircle className='size-4 shrink-0' />
            <span className='flex-1'>{error}</span>
            <Button
              variant='ghost'
              size='icon-xs'
              onClick={dismissError}
              className='text-destructive hover:text-destructive'
              aria-label='Tutup pesan error'
            >
              <X className='size-3' />
            </Button>
          </div>
        )}

        {/* Message list */}
        <ChatMessageList
          messages={messages}
          isLoading={isLoading}
          onSelectSuggestion={handleSelectSuggestion}
          onSend={handleSend}
          className='flex-1 overflow-hidden'
        />

        {/* Input - only show when there is message history */}
        {messages.length > 0 && (
          <ChatInput onSend={handleSend} isLoading={isLoading} />
        )}
      </Card>

      {/* Sidebar - shown on desktop */}
      <div className='hidden lg:flex w-80 shrink-0'>
        <ChatHistorySidebar
          onNewChat={clearChat}
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={selectConversation}
          onDeleteConversation={deleteConversation}
          isLoading={isConversationsLoading}
        />
      </div>
    </div>
  );
}

/**
 * Loading skeleton shown while the page hydrates.
 */
export function ChatContainerSkeleton() {
  return (
    <div className='flex w-full gap-6 items-stretch'>
      <Card
        className={cn(
          'flex flex-1 flex-col overflow-hidden',
          'h-[calc(100vh-8rem)] md:h-[calc(100vh-9rem)]',
          'border-border/50 bg-card/80',
          'shadow-lg',
        )}
      >
        {/* Header skeleton */}
        <div className='flex items-center justify-between px-4 py-3 md:px-6 border-b border-border/50'>
          <div className='flex items-center gap-3'>
            <Skeleton className='size-9 rounded-xl' />
            <div className='space-y-1.5'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-3 w-14' />
            </div>
          </div>
        </div>

        {/* Messages skeleton */}
        <div className='flex-1 space-y-5 p-4 md:p-6'>
          {/* Centered empty state skeleton */}
          <div className='flex flex-col items-center justify-center h-full gap-4'>
            <Skeleton className='size-16 rounded-2xl' />
            <Skeleton className='h-6 w-48' />
            <Skeleton className='h-4 w-64' />
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-lg mt-4'>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className='h-20 rounded-xl' />
              ))}
            </div>
          </div>
        </div>

        {/* Input skeleton */}
        <div className='flex items-end gap-2 border-t border-border/50 px-4 py-3 md:px-6'>
          <Skeleton className='h-10 flex-1 rounded-xl' />
          <Skeleton className='size-8 rounded-xl' />
        </div>
      </Card>

      {/* Sidebar Skeleton */}
      <div className='hidden lg:flex w-80 shrink-0'>
        <Card
          className={cn(
            'flex flex-col overflow-hidden h-[calc(100vh-8rem)] md:h-[calc(100vh-9rem)] w-full',
            'border-border/50 bg-card/80 shadow-lg p-4 gap-4',
          )}
        >
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-3 w-8' />
            </div>
            <Skeleton className='h-8 w-full rounded-xl' />
          </div>
          <Skeleton className='h-7 w-full rounded-lg' />
          <div className='flex-1 space-y-4 py-2'>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className='flex gap-2 items-center'>
                <Skeleton className='size-4 rounded-full' />
                <div className='space-y-1.5 flex-1'>
                  <Skeleton className='h-3 w-32' />
                  <Skeleton className='h-2.5 w-12' />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
