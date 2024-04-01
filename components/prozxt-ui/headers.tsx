import React from "react";
import ModeToggle from "@/components/prozxt-ui/mode-toggle";
import { Logo } from "@/components/prozxt-ui/logo";

export function NewEditHeader({ title }: { title?: string }) {
  return (
    <header className="container flex items-center justify-between py-3">
      <div className="flex items-center gap-5">
        <Logo size={24} variant="link" />

        {title && <h1 className="font-semibold">{title}</h1>}
      </div>

      <div className="flex items-center gap-5">
        <ModeToggle />
      </div>
    </header>
  );
}
