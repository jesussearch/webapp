// components/CreditsModal.tsx
'use client';

import React, { useState } from 'react';

interface Contributor {
  nome: string;
  cognome: string;
  ruolo: string;
}

const contributors: Contributor[] = [
  { nome: "Mario", cognome: "Rossi", ruolo: "Lead Developer" },
  { nome: "Giulia", cognome: "Verdi", ruolo: "UI/UX Designer" },
  { nome: "Luca", cognome: "Bianchi", ruolo: "Data Analyst (Cytoscape Expert)" },
  { nome: "Elena", cognome: "Neri", ruolo: "Backend Architect" },
];

export default function CreditsModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Testo cliccabile per attivare l'interfaccia */}
      <span 
        onClick={() => setIsOpen(true)} 
        style={{ cursor: 'pointer', textDecoration: 'underline', color: '#0070f3' }}
      >
        Crediti
      </span>

      {/* Overlay e Interfaccia Crediti */}
      {isOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2>Team di Progetto</h2>
            <hr />
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {contributors.map((person, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <strong>{person.nome} {person.cognome}</strong> - <em>{person.ruolo}</em>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setIsOpen(false)}
              style={closeButtonStyle}
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Semplici stili inline (puoi spostarli in CSS/Tailwind)
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  minWidth: '300px',
  color: '#333',
};

const closeButtonStyle: React.CSSProperties = {
  marginTop: '20px',
  padding: '8px 16px',
  cursor: 'pointer',
  backgroundColor: '#0070f3',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
};
