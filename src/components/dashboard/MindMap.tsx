"use client";
import { useEffect, useRef, useState } from "react";
import cytoscape, { ElementDefinition } from "cytoscape";
// @ts-ignore
import coseBilkent from "cytoscape-cose-bilkent";
import Sidebar from "@/components/dashboard/Sidebar";
cytoscape.use(coseBilkent);

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

const keywordsByCategory: Record<string, string[]> = {
  "Material & Fabric Keywords": [
    "Linen", "Fiber", "Yarn", "Weave", "Impurity layer", "Coating",
    "Cellulose", "Lignin", "Starch", "Flax", "Ghosts",
  ],
  "Chemical & Physical Properties": [
    "Image color", "Surface", "Coating", "Adhesive", "Scorch", "Reduction",
    "Polysaccharides", "Fluorescence", "Spectrometry", "Pyridine", "Calcium",
    "Strontium", "Iron", "Carbon", "Crystallinity", "Chemical agent", "Vanillin", "Pyrolysis",
  ],
  "Microscopy & Imaging Techniques": [
    "Photomicrograph", "Microscopy", "Ultraviolet", "Infrared", "Phase-contrast",
    "Optical density", "Reflectance", "Emission", "Thermograms",
  ],
  "Anatomical & Image Features": [
    "Body image", "Frontal", "Dorsal", "Contours", "Luminance", "Hair", "Face", "Nose",
    "Fingers", "Hands", "Thumbs", "Feet", "Calves", "Torso", "Eye sockets",
    "Grooves", "Swelling", "Beard", "Skin", "Scourge", "Crucifixion", "Nails",
  ],
  "Blood & Body Fluids": [
    "Blood", "Serum", "Stains", "Bloodstains", "Clots", "Scourge marks",
    "Hemin", "Albumin", "Porphyrins", "Proteolytic enzyme", "Capillary", "Migration",
    "Liquid separation", "Specular reflection", "No smears",
  ],
  "Fire, Heat, and Damage": [
    "Fire", "Burn marks", "Burn holes", "Scorch", "Temperature", "Heat damage",
    "Charring", "Silver", "Mild washing", "Water stains",
  ],
  "Scientific Analysis Terms": [
    "Image-formation", "Spectroscopy", "Mass spectrometry", "X-ray fluorescence",
    "Carbon dating", "Testing", "Chemical properties", "Spectral response",
    "No pigments", "Anthropological",
  ],
  "Preservation, Aging, and Residues": [
    "Non-image areas", "Superficial", "Degradation", "Tissue breakdown",
    "Aldehyde", "Carboxylic acid", "Wax", "Dust", "Earth", "Limestone",
    "Fluorescent fibers",
  ],
  "DNA & Organic Material": [
    "Organic matrix", "Protein", "DNA degradation", "No potassium signals",
    "No phosphorescence", "No putrefaction",
  ],
  "Descriptive & Analytical Metadata Terms": [
    "Discontinuous", "Superficial", "Background", "Resolution", "Saturation",
    "Anatomical accuracy", "Consistency", "Symmetry", "Comparison", "Absence",
  ],
};

export default function MindMap({ data }: MindMapProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<SelectedNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<string>("");

  const cyRef = useRef<cytoscape.Core | null>(null);

  const typeColors: Record<string, string> = {
    A: "#4f46e5",
    B: "#10b981",
    C: "#f59e0b",
    D: "#ef4444",
  };

  // Funzione per evidenziare i nodi secondo la keyword
  const highlightNodesByKeyword = (keyword: string) => {
    if (!cyRef.current) return;

    cyRef.current.nodes().removeClass("highlighted");

    if (!keyword) return;

    const lowerKeyword = keyword.toLowerCase();

    cyRef.current.nodes().forEach((node) => {
      const data = node.data() as NodeData;
      const content = `
        ${data.label}
        ${data.full?.title ?? ""}
        ${data.full?.description ?? ""}
        ${data.full?.tags?.join(" ") ?? ""}
      `.toLowerCase();

      if (content.includes(lowerKeyword)) {
        node.addClass("highlighted");
      }
    });
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
            color: "#ffffff",
            "text-outline-color": "#00000033",
            "text-outline-width": 1,
            "font-size": "14px",
            "text-valign": "center",
            "text-halign": "center",
            shape: "roundrectangle",
            "border-width": 2,
            "border-color": "#ffffff99",
            padding: "10px",
            "background-opacity": 0.9,
            width: "label",
            height: "label",
          },
        },
        {
          selector: "edge",
          style: {
            width: 2,
            "line-color": "#9ca3af",
            "curve-style": "bezier",
            "target-arrow-shape": "triangle",
            "target-arrow-color": "#9ca3af",
            "arrow-scale": 1,
            opacity: 0.6,
          },
        },
        {
          selector: ".highlighted",
          style: {
            "border-color": "#facc15",
            "border-width": 6,
            "background-color": "#fef08a",
            "transition-property": "background-color, border-width",
            "transition-duration": "0.3s",
            "z-index": 999,
          },
        },
      ],
      layout: {
        name: "cose-bilkent",
        animate: "end",
        animationEasing: "ease-out",
        animationDuration: 1000,
        nodeDimensionsIncludeLabels: true,
        randomize: false,
        fit: true,
        padding: 30,
        idealEdgeLength: 150,
        edgeElasticity: 0.2,
        nodeRepulsion: 100000,
      },
      userZoomingEnabled: true,
      userPanningEnabled: true,
      motionBlur: true,
      pixelRatio: 1,
      minZoom: 0.1,
      maxZoom: 20,
      wheelSensitivity: 0.2,
    });

    cy.ready(() => {
      cy.zoom(0.4);
      cy.center();
    });

    cy.on("tap", "node", (evt) => {
      const data = (evt.target.data() as NodeData).full;
      setSelectedNode(data);
      setIsModalOpen(true);
    });

    cy.on("mouseover", "node", (evt) => {
      const data = (evt.target.data() as NodeData).full;
      setHoveredNode(data);
    });

    cy.on("mouseout", "node", () => {
      setHoveredNode(null);
    });

    cyRef.current = cy;

    // Applica l'highlight iniziale (se keyword selezionata)
    if (selectedKeyword) {
      highlightNodesByKeyword(selectedKeyword);
    }

    return () => {
      cy.destroy();
      cyRef.current = null;
    };
  }, [data]);

  // Aggiorna l'highlight ogni volta che cambia la keyword
  useEffect(() => {
    highlightNodesByKeyword(selectedKeyword);
  }, [selectedKeyword]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNode(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="flex flex-col gap-2 max-w-xs">
        <label htmlFor="keyword-select" className="font-semibold">
          Highlight by Keyword
        </label>
        <select
          id="keyword-select"
          value={selectedKeyword}
          onChange={(e) => setSelectedKeyword(e.target.value)}
          className="p-2 rounded border"
        >
          <option value="">-- Select Keyword --</option>
          {Object.entries(keywordsByCategory).map(([category, keywords]) => (
            <optgroup key={category} label={category}>
              {keywords.map((kw) => (
                <option key={kw} value={kw}>
                  {kw}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div
        className="flex-grow h-[80vh] bg-white rounded-lg shadow"
        ref={containerRef}
        style={{
          backgroundImage: `url('/bg_image.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <Sidebar
        selectedNode={selectedNode || hoveredNode || undefined}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
