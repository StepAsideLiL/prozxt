"use client";

import LexicalReadonly from "@/components/lexical-rte/lexical-readonly";

export default function UserPortfolio({
  content,
}: {
  content: string | undefined;
}) {
  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <LexicalReadonly content={content} />
    </section>
  );
}
