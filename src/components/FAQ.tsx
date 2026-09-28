import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQ_ITEMS } from '../config/siteData';
import { useConfig } from '../context/ConfigContext';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { getWhatsAppUrl } = useConfig();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="duvidas" className="py-20 md:py-28 bg-[#150308] relative border-t border-[#e8b3a0]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-[#e8b3a0] font-medium mb-3">
            Dúvidas Frequentes
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-white tracking-tight">
            Perguntas & Respostas
          </h2>
          <p className="mt-3 text-sm text-[#f4ece8]/75">
            Tire suas principais dúvidas sobre o processo, atendimento regional e como solicitar uma proposta sob medida.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-[#e8b3a0]/20 bg-[#1c040a] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-[#25050e] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b3a0]"
                  aria-expanded={isOpen}
                >
                  <span className="font-editorial text-lg sm:text-xl font-medium text-white">
                    {item.question}
                  </span>
                  <span
                    className={`p-1.5 rounded-full bg-[#2e050e] text-[#e8b3a0] transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 bg-[#8e0e25] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-[#f4ece8]/85 font-light leading-relaxed border-t border-[#e8b3a0]/10 bg-[#170307]">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Helper footer */}
        <div className="mt-12 text-center p-6 rounded-xl bg-[#1f050b] border border-[#e8b3a0]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="font-editorial text-lg text-white font-medium">
              Ficou com alguma dúvida específica sobre seu segmento?
            </p>
            <p className="text-xs text-[#e8b3a0]/80">
              Estamos à disposição para explicar cada detalhe de forma direta e sem jargões.
            </p>
          </div>
          <a
            href={getWhatsAppUrl('Olá! Gostaria de tirar uma dúvida sobre os serviços da Millari.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#2e050e] hover:bg-[#3d0814] border border-[#e8b3a0]/30 text-xs font-semibold text-[#f4ece8] transition-colors whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#e8b3a0]" />
            <span>Fazer uma pergunta no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
