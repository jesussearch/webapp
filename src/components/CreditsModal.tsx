'use client';

import React, { useState } from 'react';

export default function CreditsModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* TASTO DI APERTURA: Più in basso, centrato e con un riquadro (bordo) */}
      <button
        onClick={() => setIsOpen(true)}
        className="mt-8 px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium text-sm"
        style={{ marginTop: '35px' }} 
      >
        Crediti
      </button>

      {/* FINESTRA MODALE */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl text-gray-800">
            
            {/* Header fisso */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Crediti del Progetto</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-semibold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Corpo con Scroll interno */}
            <div className="p-6 overflow-y-auto space-y-8 text-left text-sm leading-relaxed">
              
              {/* SEZIONE 1: PARTNER */}
              <section className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 mb-3 uppercase tracking-wider text-xs">I Partner</h3>
                <p className="mb-3 text-gray-700">
                  Questo strumento è il prodotto di un progetto scolastico presso il <strong>Liceo Scientifico Statale "Vito Volterra" di Ciampino</strong> che si attua come percorso di Formazione Scuola-Lavoro in partnership con:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-4">
                  <li>L'<strong>Ateneo Pontificio Regina Apostolorum</strong>, Roma</li>
                  <li>La <strong>Shroud of Turin Education and Research Association</strong>, USA</li>
                </ul>
                <div className="pt-2 border-t border-blue-100">
                  <span className="font-semibold text-gray-600">Contatti: </span>
                  <a href="mailto:alessandro.malantrucco@liceovolterra.edu.it" className="text-blue-600 hover:underline">
                    alessandro.malantrucco@liceovolterra.edu.it
                  </a>
                </div>
              </section>

              {/* SEZIONE 2: PROFESSORI E RELATORI */}
              <section className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-1 uppercase tracking-wider text-xs">Professori e Relatori</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 text-xs font-semibold uppercase">Responsabile del progetto</p>
                    <p className="font-medium text-gray-900">Prof. Alessandro Malantrucco</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-xs font-semibold uppercase">Tutor esterni</p>
                    <p className="font-medium text-gray-900">Prof. Rafael Pascual (APRA)</p>
                    <p className="font-medium text-gray-900">Dr. Guy Powell (STERA)</p>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-gray-600 text-xs font-semibold uppercase mb-1">Un ringraziamento va a</p>
                  <p className="text-gray-700">
                    <strong>Prof. Massimo Pescatori</strong> (per l'aiuto all'avvio del progetto), <strong>Prof.ssa Anna D'Aquino</strong> (per la supervisione al lavoro di traduzione italiano-inglese), <strong>Prof. Bruno Barberis</strong> e <strong>Francesco Mattioli</strong> (per la partecipazione alla tavola rotonda epistemologica sulla Sindone).
                  </p>
                </div>
              </section>

              {/* SEZIONE 3: STUDENTI */}
              <section className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-1 uppercase tracking-wider text-xs">Studenti Collaboratori</h3>
                
                {/* Anno 2024/25 */}
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-2 text-blue-700 border-l-2 border-blue-500 pl-2">Gruppo di lavoro 2024/25</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-gray-50 p-3 rounded-lg text-xs">
                    <div><strong>Mattia Tacconi</strong> (5 SA)</div>
                    <div><strong>Lorenzo Cappellari</strong> (5 SC)</div>
                    <div><strong>Luca Sambucini</strong> (5 SC)</div>
                    <div><strong>Vincenzo Avizzano</strong> (5 SC)</div>
                    <div><strong>Marco Del Vecchio</strong> (5 SA)</div>
                    <div><strong>Maria Tedesco</strong> (1 B)</div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 italic pt-1">
                  Gli studenti che collaborano all'elaborazione della app per l'anno 2025/26 sono organizzati in tre gruppi di lavoro:
                </p>

                {/* Sviluppatori */}
                <div className="space-y-1">
                  <h5 className="font-bold text-gray-700 text-xs uppercase text-emerald-700">Sviluppatori 2025/26</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-emerald-50/50 p-3 rounded-lg text-xs border border-emerald-100">
                    <div><strong>Filippo Felici</strong> (5 SC)</div>
                    <div><strong>Valerio Rovagna</strong> (5 SC)</div>
                    <div><strong>Flavio Ingrosso</strong> (5 SC)</div>
                    <div><strong>Leonardo Nagni</strong> (5 SC)</div>
                    <div><strong>Santiago Ruscica</strong> (5 SC)</div>
                    <div><strong>Lorenzo Tomassetti</strong> (3 SA)</div>
                  </div>
                </div>

                {/* Ricercatori */}
                <div className="space-y-1">
                  <h5 className="font-bold text-gray-700 text-xs uppercase text-amber-700">Ricercatori 2025/26</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-amber-50/50 p-3 rounded-lg text-xs border border-amber-100">
                    <div><strong>Maria Tedesco</strong> (2 B)</div>
                    <div><strong>Chiara Stamegna</strong> (4 D)</div>
                    <div><strong>Gabriele Ortolani</strong> (5 SA)</div>
                    <div><strong>Christiani Papi</strong> (5 SA)</div>
                    <div><strong>Edoardo Toselli</strong> (5 SC)</div>
                    <div><strong>Filippo Pallotta</strong> (5 SE)</div>
                    <div><strong>Leonardo Martufi</strong> (5 SE)</div>
                    <div><strong>William D'Antilio</strong> (5 SE)</div>
                    <div><strong>Christian Martinelli</strong> (3 SA)</div>
                    <div><strong>Matteo Papi</strong> (3 SA)</div>
                    <div><strong>Dario Taranto</strong> (3 SA)</div>
                    <div><strong>Valerio Zaru</strong> (3 SA)</div>
                  </div>
                </div>

                {/* Traduttori */}
                <div className="space-y-1">
                  <h5 className="font-bold text-gray-700 text-xs uppercase text-purple-700">Traduttori 2025/26</h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-purple-50/50 p-3 rounded-lg text-xs border border-purple-100">
                    <div><strong>Alessio Calvieri</strong> (5 SC)</div>
                    <div><strong>Alex Rey Nicosia</strong> (5 SC)</div>
                    <div><strong>Angela Aniceti</strong> (3 SA)</div>
                    <div><strong>Rasvan Munteanu</strong> (3 SA)</div>
                    <div><strong>Beatrice Matulescu/strong> (3 SA)</div>
                  </div>
                </div>

              </section>
            </div>

            {/* Footer fisso */}
            <div className="p-4 border-t border-gray-100 text-center bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-gray-900 text-white rounded-xl text-xs font-medium hover:bg-gray-800 transition-colors"
              >
                Chiudi finestra
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
