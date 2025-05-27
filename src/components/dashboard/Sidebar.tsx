"use client";
import React from "react";

interface MediaItem {
  type: string;
  url: string;
  caption?: string;
}

interface TextItem {
  title: string;
  content: string;
}

interface SelectedNode {
  code: string;
  title: string;
  description: string;
  tags?: string[];
  media?: MediaItem[];
  texts?: TextItem[];
}

interface SidebarProps {
  selectedNode?: SelectedNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  selectedNode,
  isOpen,
  onClose,
}: SidebarProps): React.JSX.Element | null {
  if (!selectedNode || !isOpen) {
    return null;
  }

  return (
    <>
      {/* Modal Background (with shadow instead of black background) */}
      <div
        className={`fixed inset-0 z-40 ${isOpen ? "block" : "hidden"}`}
        onClick={onClose} // Close modal when clicking outside
      >
        <div className="w-full h-full bg-opacity-20 backdrop-blur-md shadow-lg"></div>
      </div>

      {/* Modal Content */}
      <div
        className={`fixed inset-0 flex justify-center items-center z-50 ${
          isOpen ? "modal modal-open" : ""
        }`}
      >
        <div className="modal-box w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-base-200 p-8 rounded-lg shadow-2xl relative mx-4">
          {/* Main Modal Content */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <h2 className="flex-1 text-3xl font-bold text-gray-800 min-w-0">
                {selectedNode.code} – {selectedNode.title}
              </h2>
              <button
                onClick={onClose}
                className="btn btn-lg btn-outline btn-error shadow-lg shrink-0"
              >
                Close
              </button>
            </div>

            <p className="text-sm text-gray-600 mt-4">
              {selectedNode.description}
            </p>

            {/* Sezione dei Tag */}
            {Array.isArray(selectedNode.tags) &&
              selectedNode.tags.length > 0 && (
                <div className="mt-6 bg-base-100 p-4 rounded-md">
                  <h3 className="text-lg font-semibold text-gray-800">Tag:</h3>
                  <div className="flex flex-wrap gap-3 mt-3">
                    {selectedNode.tags.map((tag, i) => (
                      <span key={i} className="badge badge-primary text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            {/* Sezione dei Media */}
            {selectedNode.media && selectedNode.media.length > 0 && (
              <div className="mt-6 bg-base-100 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  📸 Media:
                </h3>
                <ul className="space-y-4">
                  {selectedNode.media.map((m, i) => (
                    <li key={i}>
                      {m.type === "image" ? (
                        <div>
                          <img
                            src={`${m.url}`}
                            alt={""}
                            className="w-full h-auto rounded-md shadow-md"
                          />
                          {m.caption && (
                            <p className="text-sm text-gray-600 mt-4 text-center">
                              {m.caption}
                            </p>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span>🔗</span>
                          <a
                            href={m.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link link-primary text-sm"
                          >
                            {m.caption || m.type}
                          </a>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sezione dei Testi */}
            {selectedNode.texts && selectedNode.texts.length > 0 && (
              <div className="mt-6 bg-base-100 p-4 rounded-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  📖 Testi:
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {selectedNode.texts.map((t, i) => (
                    <li key={i} className="text-sm">
                      <strong>{t.title}:</strong>{" "}
                      {t.content.length > 100
                        ? `${t.content.slice(0, 100)}...`
                        : t.content}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
