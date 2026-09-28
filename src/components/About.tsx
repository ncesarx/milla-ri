import React, { useRef, useState } from 'react';
import { Camera, MapPin, Heart, Sparkles, Instagram, ArrowUpRight, Upload, CheckCircle2, RefreshCw } from 'lucide-react';
import { MillariLogo } from './MillariLogo';
import { SITE_CONFIG } from '../config/siteData';
import { useConfig } from '../context/ConfigContext';

export const About: React.FC = () => {
  const { getWhatsAppUrl, profilePhotoUrl, setProfilePhotoUrl } = useConfig();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageError, setImageError] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setProfilePhotoUrl(result);
          setImageError(false);
          setUploadSuccess(true);
          setTimeout(() => setUploadSuccess(false), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="sobre" className="py-20 md:py-28 bg-[#150308] relative border-t border-[#e8b3a0]/10 overflow-hidden">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#4e0c1b]/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Column 1: Portrait Space (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer decorative rose gold border & offset shadow */}
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-b from-[#2e0610] via-[#1c040a] to-[#120306] border-2 border-[#e8b3a0]/30 shadow-[0_20px_50px_rgba(20,3,7,0.8)] flex flex-col justify-between group">
                {/* Background decorative texture */}
                <div
                  className="absolute inset-0 opacity-15 bg-[radial-gradient(#e8b3a0_1px,transparent_1px)] pointer-events-none"
                  style={{ backgroundSize: '20px 20px' }}
                />

                {/* Real Photo Layer */}
                {!imageError && profilePhotoUrl ? (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={profilePhotoUrl}
                      alt="Milla e equipe Millari - Videomaker e Criadora de Conteúdo em Piquete/SP"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Editorial vignette gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120306] via-[#120306]/30 to-transparent opacity-85 pointer-events-none" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-[#e8b3a0]/25 rounded-3xl pointer-events-none" />
                  </div>
                ) : (
                  /* Stylized Vector Portrait Fallback representing the two creators in black blazers & burgundy shirts */
                  <div className="absolute inset-0 z-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#320610] to-[#120306]">
                    <div className="relative w-28 h-28 mb-4">
                      {/* Stylized Duo Silhouette */}
                      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                        <circle cx="36" cy="35" r="16" fill="#e8b3a0" opacity="0.9" />
                        <path d="M 20 75 C 20 54 52 54 52 75 Z" fill="#200409" stroke="#e8b3a0" strokeWidth="1.5" />
                        <circle cx="64" cy="30" r="15" fill="#f5d4c8" opacity="0.95" />
                        <path d="M 48 75 C 48 50 80 50 80 75 Z" fill="#150206" stroke="#e8b3a0" strokeWidth="1.5" />
                        {/* Ring Light */}
                        <circle cx="84" cy="28" r="10" fill="none" stroke="#f5d4c8" strokeWidth="2.5" />
                        {/* Mic */}
                        <rect x="34" y="55" width="4" height="12" rx="2" fill="#d69580" />
                        <circle cx="36" cy="53" r="3.5" fill="#c01235" />
                      </svg>
                    </div>

                    <p className="font-editorial text-xl text-white font-medium">
                      Fotografia Oficial
                    </p>
                    <p className="text-xs text-[#e8b3a0]/80 mt-1 max-w-xs">
                      Milla & Criadoras · Videomaker, Áudio & Iluminação Profissional
                    </p>

                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#8e0e25] hover:bg-[#a5122e] text-xs font-semibold text-white shadow-md transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Carregar La_La.jpg</span>
                    </button>
                  </div>
                )}

                {/* Top Corner Emblem & Status */}
                <div className="relative z-10 p-5 flex items-center justify-between">
                  <div className="bg-[#120306]/75 backdrop-blur-md px-3 py-1 rounded-full border border-[#e8b3a0]/30 shadow-md">
                    <MillariLogo variant="mark" size="sm" />
                  </div>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    title="Alterar ou atualizar fotografia oficial"
                    className="p-2 rounded-full bg-[#120306]/80 hover:bg-[#8e0e25] text-[#e8b3a0] hover:text-white border border-[#e8b3a0]/30 transition-all backdrop-blur-md shadow-md"
                    aria-label="Alterar ou carregar fotografia"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Card Identity & Badge */}
                <div className="relative z-10 p-6 space-y-2 text-center mt-auto">
                  <div className="space-y-0.5">
                    <p className="font-editorial text-2xl sm:text-3xl text-white font-medium tracking-tight drop-shadow-md">
                      Milla & Equipe
                    </p>
                    <p className="text-xs text-[#e8b3a0] font-medium tracking-wider uppercase">
                      Videomaker & Criação de Conteúdo
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-[11px] text-[#f4ece8]/90 bg-[#120306]/85 backdrop-blur-md px-3 py-1 rounded-full border border-[#e8b3a0]/25 shadow-sm">
                    <MapPin className="w-3 h-3 text-[#e8b3a0]" />
                    <span>Piquete/SP & Vale do Paraíba</span>
                  </div>

                  {uploadSuccess && (
                    <div className="mt-2 text-[11px] text-emerald-400 font-medium flex items-center justify-center gap-1 bg-[#120306]/90 py-1 rounded">
                      <CheckCircle2 className="w-3 h-3" /> Foto atualizada com sucesso!
                    </div>
                  )}
                </div>

                {/* Hidden File Input for Instant Direct Upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  aria-label="Upload de foto de perfil"
                />
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

              <p className="text-xs text-[#e8b3a0]/80 italic p-3 rounded-lg bg-[#1f040b] border border-[#e8b3a0]/15">
                <span className="font-medium text-white">[Campo editável para a profissional]:</span>{' '}
                Aqui você poderá complementar com seu nome completo, ano de formação ou marcos de sua trajetória, detalhando suas inspirações criativas antes de publicar oficialmente.
              </p>

              <p>
                O objetivo não é seguir fórmulas genéricas de agência, mas criar uma presença visual com personalidade, elegância e proximidade — gerando admiração e novos clientes para cada parceiro atendido.
              </p>
            </div>

            {/* Three Pillar Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#e8b3a0]/15">
              <div className="p-4 rounded-xl bg-[#1c040a] border border-[#e8b3a0]/15">
                <Heart className="w-5 h-5 text-[#e8b3a0] mb-2" />
                <h4 className="font-editorial text-base font-medium text-white">
                  Proximidade Real
                </h4>
                <p className="text-xs text-[#f4ece8]/70 mt-1">
                  Atendimento direto, humano e atento às particularidades do comércio local.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1c040a] border border-[#e8b3a0]/15">
                <Camera className="w-5 h-5 text-[#e8b3a0] mb-2" />
                <h4 className="font-editorial text-base font-medium text-white">
                  Estética Autoral
                </h4>
                <p className="text-xs text-[#f4ece8]/70 mt-1">
                  Cores, enquadramentos e ritmo pensados para destacar sua marca com sofisticação.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#1c040a] border border-[#e8b3a0]/15">
                <Sparkles className="w-5 h-5 text-[#e8b3a0] mb-2" />
                <h4 className="font-editorial text-base font-medium text-white">
                  Foco em Conexão
                </h4>
                <p className="text-xs text-[#f4ece8]/70 mt-1">
                  Conteúdos que constroem lembrança duradoura, sem apelos artificiais.
                </p>
              </div>
            </div>

            {/* Call to action & social link */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={getWhatsAppUrl('Olá! Gostaria de conversar com a Milla para conhecer melhor a proposta da Millari.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-[#120306] bg-gradient-to-r from-[#f5d4c8] to-[#e8b3a0] hover:brightness-105 rounded-lg shadow-md transition-all whitespace-nowrap"
              >
                <span>Conversar diretamente com a Milla</span>
              </a>

              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-medium text-[#e8b3a0] hover:text-white bg-[#24050d] hover:bg-[#350812] border border-[#e8b3a0]/25 rounded-lg transition-colors whitespace-nowrap"
              >
                <Instagram className="w-4 h-4" />
                <span>Seguir @milla.rii no Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
