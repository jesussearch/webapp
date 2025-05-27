"use client";

import { useState } from "react";
import EvidenceForm from "./EvidenceForm";
import { useEvidences } from "@/hooks/useEvidences";

type Media = {
  type: "image" | "video" | "link"; // Updated to match the type in EvidenceForm
  url: string;
  caption: string;
};

type TextAttachment = {
  title: string;
  content: string;
};

export type Evidence = {
  id: number;
  code: string;
  type: string;
  title: string;
  description: string;
  tags: string;
  media: Media[];
  texts: TextAttachment[];
};

export default function EvidenceTable() {
  const { evidences, reload } = useEvidences();
  const [editing, setEditing] = useState<Evidence | null>(null);
  const [creating, setCreating] = useState(false);

  const deleteEvidence = async (code: string) => {
    const confirmed = confirm(`Eliminare l’evidenza ${code}?`);
    if (!confirmed) return;

    const res = await fetch(`/api/evidences/${code}`, {
      method: "DELETE",
    });

    if (res.ok) reload();
  };

  const closeModal = () => {
    setCreating(false);
    setEditing(null);
  };

  return (
    <div className="mt-4">
      {/* Modal */}
      {(creating || editing) && (
        <>
          <input
            type="checkbox"
            id="evidence-modal"
            className="modal-toggle"
            checked
            readOnly
          />
          <div className="modal modal-open">
            <div className="modal-box w-11/12 max-w-3xl">
              <EvidenceForm
                selected={editing}
                onSuccess={() => {
                  reload();
                  closeModal();
                }}
                onCancel={closeModal}
              />
            </div>
            <label
              className="modal-backdrop"
              htmlFor="evidence-modal"
              onClick={closeModal}
            ></label>
          </div>
        </>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-primary">📋 Elenco Evidenze</h2>
        <button
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-focus"
          onClick={() => setCreating(true)}
        >
          + Aggiungi
        </button>
      </div>

      <table className="w-full text-sm border-collapse">
        <thead className="bg-base-200 text-left">
          <tr>
            <th className="p-2 border-b">Codice</th>
            <th className="p-2 border-b">Titolo</th>
            <th className="p-2 border-b">Tipo</th>
            <th className="p-2 border-b">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {evidences.map((e) => (
            <tr key={e.id} className="border-b bg-base-100">
              <td className="p-2">{e.code}</td>
              <td className="p-2">{e.title}</td>
              <td className="p-2">{e.type}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="text-primary hover:underline text-xs"
                  onClick={() => setEditing(e)}
                >
                  Modifica
                </button>
                <button
                  className="text-error hover:underline text-xs"
                  onClick={() => deleteEvidence(e.code)}
                >
                  Elimina
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
