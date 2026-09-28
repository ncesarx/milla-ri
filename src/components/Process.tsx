import React from 'react';
import { MessageSquare, FileText, Clapperboard, Send, ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '../config/siteData';
import { useConfig } from '../context/ConfigContext';

export const Process: React.FC = () => {
  const { getWhatsAppUrl } = useConfig();

  const iconList = [
    <MessageSquare className="w-5 h-5 text-[#e8b3a0]" />,
    <FileText className="w-5 h-5 text-[#e8b3a0]" />,
    <Clapperboard className="w-5 h-5 text-[#e8b3a0]" />,
    <Send className="w-5 h-5 text-[#e8b3a0]" />,
  ];

  return (
    <section id="como-funciona" className="py-20 md:py-28 bg-[#120306] relative border-t border-[#e8b3a0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#e8b3a0] font-medium mb-3">
            Passo a Passo
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-white tracking-tight">
            Como funciona nossa parceria
          </h2>
          <p className="mt-3 text-sm text-[#f4ece8]/75">
            Um fluxo transparente, prático e sem complicações para que você cuide do seu negócio enquanto seu conteúdo ganha vida.
          </p>
          <p className="mt-2 text-xs text-[#e8b3a0]/70 italic">
            * Sugestão de processo a ser validada e personalizada com a profissional antes da publicação.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {PROCESS_STEPS.map((item, index) => (
            <div
              key={item.step}
              className="relative p-6 rounded-2xl bg-[#1b0409] border border-[#e8b3a0]/20 flex flex-col justify-between hover:border-[#e8b3a0]/45 transition-all group"
            >
              <div>
                {/* Step header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e8b3a0]/15">
                  <span className="font-editorial text-3xl font-light text-[#e8b3a0]">
                    {item.step}
                  </span>
                  <div className="p-2.5 rounded-lg bg-[#2b050e] border border-[#e8b3a0]/20">
                    {iconList[index]}
                  </div>
                </div>

                <h3 className="text-xl font-editorial font-medium text-white mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-[#f4ece8]/80 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#e8b3a0]/10 flex items-center justify-between text-[11px] text-[#e8b3a0]/60">
                <span>Etapa {index + 1} de 4</span>
                <span className="text-[#e8b3a0]/40 group-hover:text-[#e8b3a0] transition-colors">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA to start Step 1 */}
        <div className="mt-14 text-center">
          <a
            href={getWhatsAppUrl('Olá! Quero dar o primeiro passo e agendar uma conversa inicial sobre minha marca.')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-semibold text-[#120306] bg-gradient-to-r from-[#f5d4c8] via-[#e8b3a0] to-[#d69580] hover:brightness-105 rounded-lg shadow-lg transition-all"
          >
            <span>Iniciar o primeiro passo: Conversa inicial</span>
            <ArrowRight className="w-4 h-4 text-[#120306]" />
          </a>
        </div>
      </div>
    </section>
  );
};
