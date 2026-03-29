"use client";
import { useEffect, useState } from "react";
import MindMap from "@/components/dashboard/MindMap";
import InfoPanel from "@/components/dashboard/InfoPanel";

interface Evidence {
  code: string;
  title: string;
  type: string;
  [key: string]: any; // Per gestire eventuali altri campi dinamici
}

interface NodeElement {
  data: {
    id: string;
    label: string;
    type: string;
    full: Evidence;
  };
}

interface EdgeElement {
  data: {
    id: string;
    source: string;
    target: string;
  };
}

type Element = NodeElement | EdgeElement;

const typeColors: Record<string, string> = {
  A: "#4F46E5",
  B: "#059669",
  C: "#D97706",
  D: "#DC2626"
};

export default function Home(): React.JSX.Element {
  const [elements, setElements] = useState<Element[]>([]);

  useEffect(() => {
    fetch("/api/evidences")
      .then((res) => res.json())
      .then((data: Evidence[]) => {
        const nodes: NodeElement[] = data.map((ev, index) => ({
          data: {
            id: `e${index}`,
            label: `${ev.code}`,
            type: ev.type,
            full: ev,
          },
        }));

        const edges: EdgeElement[] = [];
        const byType: Record<string, string[]> = {};

        data.forEach((ev, i) => {
          if (!byType[ev.type]) byType[ev.type] = [];
          byType[ev.type].push(`e${i}`);
        });

        Object.values(byType).forEach((group) => {
          for (let i = 0; i < group.length - 1; i++) {
            edges.push({
              data: {
                id: `${group[i]}_${group[i + 1]}`,
                source: group[i],
                target: group[i + 1],
              },
            });
          }
        });

        setElements([...nodes, ...edges]);
      })
      .catch((err) => {
        console.error("Errore nel fetch delle evidenze:", err);
      });
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          🧠 Interactive Map of Evidences
        </h1>
      </header>

      <InfoPanel />
      <div
        className="relative rounded-lg overflow-hidden"
        style={{
          backgroundImage: "url('/images/bg_image.png')",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          minHeight: "70vh",
          backgroundColor: "#2E2E2E",
          backgroundBlendMode: "Multiply"
        }}
      >
        {/* Add a semi-transparent overlay */}
        <div className="absolute inset-0 bg-white opacity-70"></div>

        {/* Content with relative positioning to appear above the overlay */}
        <div className="relative z-10">
          {elements.length > 0 ? (
            <MindMap data={elements} />
          ) : (
            <p className="text-center p-4">Loading...</p>
          )}
        </div>
      </div>
    </main>
  );
}
