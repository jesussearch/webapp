"use client";
import { useState } from "react";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function LoginDialog({
  isOpen,
  onClose,
  onSuccess,
}: LoginDialogProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        // Use relative URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token); // Store token in localStorage
        onSuccess(); // Close dialog and redirect
      } else {
        setError("Credenziali non valide");
      }
    } catch (err) {
      setError("Errore di rete");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center"> {/* bg-gradient-to-br from-gray-50 to-blue-100 */}
      <div className="bg-white/40 p-6 rounded-lg w-[350px] shadow-xl relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Accedi</h2>
        <input
          className="input input-bordered w-full mb-3"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input input-bordered w-full mb-4"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

        <div className="flex flex-col">
          <button onClick={handleLogin} className="btn btn-primary w-full mt-3">
            Login
          </button>
          <button
            onClick={onClose}
            className="btn btn-link text-gray-500 hover:underline w-full mt-3"
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
}
