"use client";
import { useEffect, useRef, useState } from "react";
import cytoscape, { ElementDefinition } from "cytoscape";
import Sidebar from "@/components/dashboard/Sidebar";

interface NodeData {
  id: string;
  label: string;
  type: "A" | "B" | "C" | "D" | string;
  full: SelectedNode;
}

interface SelectedNode {
  code: string;
  title: string;
  description: string;
  tags?: string[];
  media?: { type: string; url: string; caption?: string }[];
  texts?: { title: string; content: string }[];
}

interface MindMapProps {
  data: ElementDefinition[];
}

export default function MindMap({ data }: MindMapProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SelectedNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const typeColors: Record<string, string> = {
    A: "#4f46e5", // indigo
    B: "#10b981", // emerald
    C: "#f59e0b", // amber
    D: "#ef4444", // red
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const cy = cytoscape({
      container: containerRef.current,
      elements: data,
      style: [
        {
          selector: "node",
          style: {
            "background-color": (ele) => {
              const t = (ele.data() as NodeData).type;
              return typeColors[t] || "#6b7280";
            },
            label: "data(label)",
            color: "#fff",
            "text-outline-color": "#000",
            "text-outline-width": 2,
            "font-size": "12px",
            "text-valign": "center",
            "text-halign": "center",
            width: "label",
            height: "label",
            padding: "8px",
            shape: "ellipse",
          },
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#d1d5db",
            "curve-style": "bezier",
            "target-arrow-shape": "none",
            "target-arrow-color": "#d1d5db",
          },
        },
      ],
      layout: {
        name: "cose",
        padding: 30,
        animate: true,
        nodeRepulsion: (node) => 100000, // Providing a function to return the value
        idealEdgeLength: () => 100,
        edgeElasticity: () => 0.1,
        nestingFactor: 0.75,
        gravity: 0.25,
      },
      userZoomingEnabled: true,
      zoomingEnabled: true,

      minZoom: 0.1,
      maxZoom: 20,
      wheelSensitivity: 0.2,
    });

    cy.ready(() => {
      cy.zoom(0.4); // Zoom out
      cy.center(); // Center the whole layout
    });

    cy.on("tap", "node", (evt) => {
      const data = (evt.target.data() as NodeData).full;
      setSelectedNode(data);
      setIsModalOpen(true); // Open modal when a node is tapped
    });

    cy.on("mouseover", "node", (evt) => {
      const data = (evt.target.data() as NodeData).full;
      setHoveredNode(data);
    });

    cy.on("mouseout", "node", () => {
      setHoveredNode(null);
    });

    return () => {
      cy.destroy();
    };
  }, [data]);

  // Close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNode(null); // Clear the selected node when closing the modal
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div
        className="flex-grow h-[80vh] bg-white rounded-lg shadow"
        ref={containerRef}
      ></div>

      {/* Pass the modal-related props to Sidebar */}
      <Sidebar
        selectedNode={selectedNode || hoveredNode || undefined}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
