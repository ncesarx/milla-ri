import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Sliders, ExternalLink } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const PreLaunchBanner: React.FC = () => {
  const { whatsAppNumber, setWhatsAppNumber, isWhatsAppConfigured, setIsChecklistOpen } = useConfig();
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempNumber, setTempNumber] = useState(whatsAppNumber);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveNumber = (e: React.FormEvent) => {
    e.preventDefault();
    setWhatsAppNumber(tempNumber);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <aside
      aria-label="Aviso de pré-publicação"
      className="bg-[#24060d] border-b border-[#e8b3a0]/25 text-[#f4ece8] text-xs px-4 py-2 transition-all relative z-50"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#621023] text-[#e8b3a0]">
            <AlertCircle className="w-3.5 h-3.5" />
          </span>
          <p className="font-medium text-[#f5d4c8]">
            <span className="font-semibold text-white">Modo Pré-Publicação:</span> Os campos com colchetes{' '}
            <code className="bg-[#120306] px-1.5 py-0.5 rounded text-[#e8b3a0] border border-[#e8b3a0]/20">
              [ex: WhatsApp e fotos]
            </code>{' '}
            estão prontos para receber seus dados oficiais antes de publicar.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-xs text-[#e8b3a0] hover:text-white transition-colors py-1 px-2.5 rounded bg-[#350812] hover:bg-[#490b19] border border-[#e8b3a0]/20"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isWhatsAppConfigured ? 'WhatsApp Configurado' : 'Definir WhatsApp Oficial'}</span>
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <button
            onClick={() => setIsChecklistOpen(true)}
            className="inline-flex items-center gap-1 text-xs text-[#f4ece8] hover:text-white font-medium py-1 px-2.5 rounded bg-[#8e0e25] hover:bg-[#a5122e] transition-colors"
          >
            <span>Checklist para Publicar</span>
          </button>
        </div>
      </div>

      {/* Expanded quick settings drawer */}
      {isExpanded && (
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-[#e8b3a0]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs bg-[#1a0409] p-3 rounded-lg">
          <div className="space-y-1">
            <p className="font-medium text-white">Configuração do botão WhatsApp:</p>
            <p className="text-[#e8b3a0]/80">
              Insira o número oficial com DDD (ex: <code>12999999999</code>) para que todos os botões de orçamento abram diretamente a conversa com você.
            </p>
          </div>

          <form onSubmit={handleSaveNumber} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Ex: 12981234567"
              value={tempNumber}
              onChange={(e) => setTempNumber(e.target.value)}
              className="bg-[#120306] border border-[#e8b3a0]/30 rounded px-2.5 py-1.5 text-xs text-white placeholder-[#e8b3a0]/40 focus:outline-none focus:border-[#e8b3a0] w-44"
            />
            <button
              type="submit"
              className="bg-[#d69580] hover:bg-[#e8b3a0] text-[#120306] font-semibold px-3 py-1.5 rounded transition-colors whitespace-nowrap"
            >
              Salvar
            </button>
            {savedSuccess && (
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Salvo!
              </span>
            )}
          </form>
        </div>
      )}
    </aside>
  );
};
