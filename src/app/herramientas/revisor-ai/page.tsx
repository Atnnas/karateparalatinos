import { Suspense } from "react";
import RevisorAISection from "@/components/sections/RevisorAISection";

export default function RevisorAIPage() {
  return (
    <Suspense fallback={
      <div className="w-full min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E52B34]" />
      </div>
    }>
      <RevisorAISection />
    </Suspense>
  );
}
