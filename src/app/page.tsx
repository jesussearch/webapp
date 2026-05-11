"use client";
import { useState } from "react";
import LoginDialog from "@/components/dashboard/LoginDialog";
import CreditsModal from '@/components/CreditsModal.tsx';

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    window.location.href = "/admin"; // oppure usa router.push
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center text-center p-8"
      style={{
        backgroundImage: "url('/images/bg_image2.png')",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        backgroundColor: "#f0f4f8",
      }}
    >
      {/* Only show the content when login dialog is not visible */}
      {!showLogin && (
        <div className="flex flex-col items-center justify-center text-center bg-white/40 p-8 rounded-lg backdrop-blur-sm">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            🧵 Shroud Visual App
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            Explore, organize and analyze all the scientific evidence on the
            Shroud in an interactive way.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => (window.location.href = "/map")}
              className="btn btn-primary px-6 py-3"
            >
              Go to Map
            </button>
            <button
              onClick={() => setShowLogin(true)}
              className="btn btn-outline px-6 py-3"
            >
              Login
            </button>
          </div>
        </div>
      )}

      <LoginDialog
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSuccess={handleLoginSuccess}
      />
      <CreditsModal />
    </main>
  );
}
