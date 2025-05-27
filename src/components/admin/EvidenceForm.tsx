"use client";
import { useState, useEffect } from "react";

type Media = {
  type: "image" | "video" | "link";
  url: string;
  caption: string;
};

type TextAttachment = {
  title: string;
  content: string;
};

type EvidenceFormProps = {
  selected: Evidence | null;
  onSuccess: () => void;
  onCancel: () => void;
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

export default function EvidenceForm({
  selected,
  onSuccess,
  onCancel,
}: EvidenceFormProps) {
  const [form, setForm] = useState({
    code: "",
    type: "A",
    title: "",
    description: "",
    tags: "",
  });

  const [media, setMedia] = useState<Media[]>([]);
  const [texts, setTexts] = useState<TextAttachment[]>([]);

  useEffect(() => {
    if (selected) {
      setForm({
        code: selected.code,
        type: selected.type,
        title: selected.title || "",
        description: selected.description || "",
        tags: selected.tags || "",
      });
      setMedia(selected.media || []);
      setTexts(selected.texts || []);
    }
  }, [selected]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = selected ? "PUT" : "POST";
    const endpoint = selected
      ? `/api/evidences/${form.code}`
      : "/api/evidences";

    // Handle the form submission by sending data to the API
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, media, texts }),
    });

    if (res.ok) onSuccess();
  };

  const addMedia = () =>
    setMedia([...media, { type: "link", url: "", caption: "" }]);

  const updateMedia = (i: number, field: keyof Media, value: string) => {
    const updated = [...media];
    updated[i][field] = value as Media["type"]; // Cast value to 'image' | 'video' | 'link'
    setMedia(updated);
  };

  const removeMedia = (i: number) =>
    setMedia(media.filter((_, index) => index !== i));

  const addText = () => setTexts([...texts, { title: "", content: "" }]);

  const updateText = (
    i: number,
    field: keyof TextAttachment,
    value: string
  ) => {
    const updated = [...texts];
    updated[i][field] = value;
    setTexts(updated);
  };

  const removeText = (i: number) =>
    setTexts(texts.filter((_, index) => index !== i));

  const handleFileUpload = async (
    file: File,
    i: number,
    evidenceId: number,
    caption?: string
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("evidenceId", evidenceId.toString());
    if (caption) {
      formData.append("caption", caption);
    }

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.url) {
        updateMedia(i, "url", data.url); // Update the media entry at index i with the returned URL
      } else {
        alert("Errore durante l'upload");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload fallito");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-base-100 rounded-lg"
    >
      <h3 className="text-lg font-bold mb-4">
        {selected ? "✏️ Modifica Evidenza" : "➕ Nuova Evidenza"}
      </h3>

      <div className="grid gap-4 ">
        {/* Form Fields */}
        <div className="form-control">
          <input
            type="text"
            name="code"
            placeholder="Code"
            className="input input-bordered w-full"
            value={form.code}
            onChange={handleChange}
            disabled={!!selected}
            required
          />
        </div>

        {/* Other form inputs for type, title, description, and tags */}
        <div className="form-control w-full">
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="A">Tipo A</option>
            <option value="B">Tipo B</option>
            <option value="C">Tipo C</option>
            <option value="D">Tipo D</option>
          </select>
        </div>

        <div className="form-control w-full">
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-control w-full">
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Description"
            rows={4}
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-control w-full">
          <input
            name="tags"
            className="input input-bordered w-full"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* MEDIA SECTION */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-4">📸 Media allegati</h4>

        {media.map((m, i) => (
          <div key={i} className="grid">
            <div className="border border-base-300 rounded-lg p-4 mb-4 w-full">
              <select
                id={`media-type-${i}`}
                className="select select-bordered w-full mb-4"
                value={m.type}
                onChange={(e) => updateMedia(i, "type", e.target.value)}
              >
                <option value="link">🔗 Link</option>
                {selected && <option value="image">🖼️ Immagine</option>}
              </select>

              {m.type === "image" ? (
                <div className="flex flex-col gap-3">
                  {m.url ? (
                    <img
                      src={m.url}
                      alt="Preview"
                      className="w-full h-auto rounded-md shadow-md mb-4"
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const uploadButton = document.getElementById(
                          `upload-btn-${i}`
                        );
                        if (uploadButton) uploadButton.click();
                      }}
                      className="btn btn-primary w-full sm:w-fit mb-4"
                    >
                      📤 Seleziona file immagine
                    </button>
                  )}

                  <input
                    id={`upload-btn-${i}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && selected)
                        handleFileUpload(file, i, selected.id); // Pass selected.id as evidenceId
                    }}
                  />
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="URL"
                  className="input input-bordered w-full mb-4"
                  value={m.url}
                  onChange={(e) => updateMedia(i, "url", e.target.value)}
                />
              )}

              <input
                type="text"
                placeholder="Didascalia"
                className="input input-bordered w-full"
                value={m.caption}
                onChange={(e) => updateMedia(i, "caption", e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeMedia(i)}
                className="btn btn-error text-white text-xs mt-4 w-fit"
              >
                Rimuovi
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addMedia}
          className="btn btn-primary text-white text-sm mt-4 w-fit"
        >
          + Aggiungi media
        </button>
      </div>

      {/* TEXT SECTION */}
      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-4">📖 Testi allegati</h4>

        {texts.map((t, i) => (
          <div
            key={i}
            className="border border-base-300 rounded-lg p-4 mb-4 w-full"
          >
            <input
              type="text"
              placeholder="Titolo"
              className="input input-bordered w-full mb-2"
              value={t.title}
              onChange={(e) => updateText(i, "title", e.target.value)}
            />
            <textarea
              rows={3}
              placeholder="Contenuto"
              className="textarea textarea-bordered w-full mb-2"
              value={t.content}
              onChange={(e) => updateText(i, "content", e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeText(i)}
              className="btn btn-error text-white text-xs mt-4 w-fit"
            >
              Rimuovi
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addText}
          className="btn btn-primary text-white text-sm mt-4 w-fit"
        >
          + Aggiungi testo
        </button>
      </div>

      <div className="mt-6 flex gap-4 justify-between">
        <button type="button" onClick={onCancel} className="btn btn-outline">
          Annulla
        </button>
        <button type="submit" className="btn btn-primary text-white">
          Salva
        </button>
      </div>
    </form>
  );
}
