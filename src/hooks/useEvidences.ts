// hooks/useEvidences.ts
"use client";
import { useState, useEffect } from "react";
import { Evidence } from "@/components/admin/EvidenceTable";

export function useEvidences() {
  const [evidences, setEvidences] = useState<Evidence[]>([]);

  const loadEvidences = () => {
    fetch("/api/evidences")
      .then((res) => res.json())
      .then(setEvidences)
      .catch(console.error);
  };

  useEffect(() => {
    loadEvidences();
  }, []);

  return { evidences, reload: loadEvidences };
}
