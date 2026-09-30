import React, { useState } from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { MillariLogo } from './MillariLogo';
import { SITE_CONFIG } from '../config/siteData';
import { useConfig } from '../context/ConfigContext';

// Imagem oficial permanente da Equipe Millari (estética cinematográfica editorial de alta qualidade)
const OFFICIAL_TEAM_PHOTO = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85';

export const About: React.FC = () => {
  const { getWhatsAppUrl } = useConfig();
  const [imageError, setImageError] = useState(false);

  return (
    <section id="sobre" className="py-20 md:py-28 bg-[#150308] relative border-t border-[#e8b3a0]/10 overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#4e0c1b]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column 1: Portrait Space (5 cols) - Imagem fixa permanente sem opção de upload */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer decorative rose gold border & offset shadow */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-b from-[#2e0610] via-[#1c040a] to-[#120306] border-2 border-[#e8b3a0]/30 shadow-[0_20px_50px_rgba(20,3,7,0.8)] flex flex-col justify-between group">
                {/* Background decorative texture */}
                <div
                  className="absolute inset-0 opacity-15 bg-[radial-gradient(#e8b3a0_1px,transparent_1px)] pointer-events-none"
                  style={{ backgroundSize: '20px 20px' }}
                />

                {/* Real Permanent Photo Layer */}
                {!imageError ? (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={OFFICIAL_TEAM_PHOTO}
                      alt="Equipe Millari - Videomaker e Criação de Conteúdo em Piquete/SP"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Editorial vignette gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120306] via-[#120306]/35 to-transparent opacity-90 pointer-events-none" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-[#e8b3a0]/25 rounded-3xl pointer-events-none" />
                  </div>
                ) : (
                  /* Stylized Vector Portrait Fallback */
                  <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#320610] to-[#120306]">
                    <div className="relative w-28 h-28 mb-4">
                      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                        <circle cx="36" cy="35" r="16" fill="#e8b3a0" opacity="0.9" />
                        <path d="M 20 75 C 20 54 52 54 52 75 Z" fill="#200409" stroke="#e8b3a0" strokeWidth="1.5" />
                        <circle cx="64" cy="30" r="15" fill="#f5d4c8" opacity="0.95" />
                        <path d="M 48 75 C 48 50 80 50 80 75 Z" fill="#150206" stroke="#e8b3a0" strokeWidth="1.5" />
                        <circle cx="84" cy="28" r="10" fill="none" stroke="#f5d4c8" strokeWidth="2.5" />
                        <rect x="34" y="55" width="4" height="12" rx="2" fill="#d69580" />
                        <circle cx="36" cy="53" r="3.5" fill="#c01235" />
                      </svg>
                    </div>

                    <p className="font-editorial text-xl text-white font-medium">
                      Equipe Millari
                    </p>
                    <p className="text-xs text-[#e8b3a0]/80 mt-1 max-w-xs">
                      Videomaker, Áudio & Iluminação Profissional
                    </p>
                  </div>
                )}

                {/* Top Corner Emblem */}
                <div className="relative z-10 p-5 flex items-center justify-between">
                  <div className="bg-[#120306]/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#e8b3a0]/30 shadow-md">
                    <MillariLogo variant="mark" size="sm" />
                  </div>
                </div>

                {/* Bottom Card Identity & Badge */}
                <div className="relative z-10 p-6 space-y-2 text-center mt-auto">
                  <div className="space-y-0.5">
                    <p className="font-editorial text-2xl sm:text-3xl text-white font-medium tracking-tight drop-shadow-md">
                      Equipe Millari
                    </p>
                    <p className="text-xs text-[#e8b3a0] font-medium tracking-wider uppercase">
                      Videomaker & Criação de Conteúdo
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-[11px] text-[#f4ece8]/90 bg-[#120306]/85 backdrop-blur-md px-3 py-1 rounded-full border border-[#e8b3a0]/25 shadow-sm">
                    <MapPin className="w-3 h-3 text-[#e8b3a0]" />
                    <span>Piquete/SP & Vale do Paraíba</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Biography & Mission (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] text-[#e8b3a0] font-medium">
              Sobre a Criadora
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-white tracking-tight leading-tight">
              Um olhar sensível e estratégico para a realidade do seu negócio
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#f4ece8]/85 font-light leading-relaxed">
              <p>
                Por trás da <strong className="font-medium text-white">MILLARI</strong> está a dedicação de quem entende que marcas locais possuem histórias autênticas e produtos incríveis — mas que muitas vezes não têm o tempo ou as ferramentas necessárias para traduzir esse valor em vídeos de alto impacto no Instagram.
              </p>

              <p>
                Com base de atuação em <strong className="font-medium text-[#e8b3a0]">Piquete/SP</strong> e disponibilidade para atendimento em cidades da região, o trabalho une técnica de captação cinematográfica, equipamentos dedicados (iluminação e microfonia de estúdio) e sensibilidade estética apurada para a linguagem contemporânea das redes.
              </p>

              <p>
                O objetivo não é apenas gravar vídeos bonitos, mas criar um ecossistema de conteúdo que faça os clientes da sua cidade olharem para a sua marca com orgulho e desejo de consumo.
              </p>
            </div>

            {/* Micro Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#e8b3a0]/15">
              <div className="p-3.5 rounded-xl bg-[#24050d] border border-[#e8b3a0]/15 space-y-1">
                <span className="text-[#e8b3a0] font-editorial text-lg font-medium">01. Autoria</span>
                <p className="text-xs text-[#f4ece8]/75">Cada negócio tem sua identidade única, sem fórmulas repetidas.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#24050d] border border-[#e8b3a0]/15 space-y-1">
                <span className="text-[#e8b3a0] font-editorial text-lg font-medium">02. Técnica</span>
                <p className="text-xs text-[#f4ece8]/75">Captação em alta resolução com áudio limpo e direção de cena.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#24050d] border border-[#e8b3a0]/15 space-y-1">
                <span className="text-[#e8b3a0] font-editorial text-lg font-medium">03. Proximidade</span>
                <p className="text-xs text-[#f4ece8]/75">Atendimento próximo e dedicado para comerciantes de Piquete e região.</p>
              </div>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={getWhatsAppUrl("Olá Milla! Vi a história no site da Millari e gostaria de conversar sobre produção de vídeos para o meu negócio.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#d69580] hover:bg-[#e8b3a0] text-[#120306] font-semibold text-sm transition-all shadow-[0_10px_25px_rgba(214,149,128,0.25)] hover:shadow-[0_12px_30px_rgba(214,149,128,0.4)]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Conversar com a Criadora</span>
              </a>

              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#24050d] hover:bg-[#350812] text-[#f4ece8] text-sm border border-[#e8b3a0]/25 transition-colors"
              >
                <span>Ver no Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
