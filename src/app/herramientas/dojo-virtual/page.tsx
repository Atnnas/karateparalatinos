import { Suspense } from "react";
import DojoVirtual from "@/components/sections/DojoVirtual";

export default function DojoVirtualPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E52B34]" />
      </div>
    }>
      <DojoVirtual />
    </Suspense>
  );
}
