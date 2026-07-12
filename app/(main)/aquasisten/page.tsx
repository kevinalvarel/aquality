import { Suspense } from "react";
import {
  ChatContainer,
  ChatContainerSkeleton,
} from "@/components/aquasisten/chat-container";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aquasisten — Asisten AI Lingkungan | Aquality",
  description:
    "Tanya Aquasisten tentang data lingkungan pesisir, abrasi pantai, kesehatan mangrove, dan kualitas air.",
};

export default function AquasistenPage() {
  return (
    <section className="flex w-full flex-col items-center px-4 py-4 md:px-6 md:py-6">
      <Suspense fallback={<ChatContainerSkeleton />}>
        <ChatContainer />
      </Suspense>
    </section>
  );
}
