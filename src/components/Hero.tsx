import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight, Sparkles, Video, Instagram, CheckCircle2 } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { SITE_CONFIG } from '../config/siteData';

export const Hero: React.FC = () => {
  const { getWhatsAppUrl } = useConfig();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  return (
    <section id="inicio" className="relative pt-12 pb-20 md:py-24 overflow-hidden bg-wine-radial">
      {/* Decorative subtle ambient lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#621023]/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#350812]/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Quiet territorial marker - no pills */}
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#e8b3a0] font-medium">
            <span>Piquete/SP</span>
            <span aria-hidden="true" className="text-[#e8b3a0]/40">·</span>
            <span>Vale do Paraíba</span>
            <span aria-hidden="true" className="text-[#e8b3a0]/40">·</span>
            <span>Produção Autoral</span>
          </div>

          {/* Main title with refined typography */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-editorial font-medium tracking-tight text-[#f4ece8] leading-[1.08] text-balance">
            Seu negócio merece aparecer.{' '}
            <span className="italic text-gradient-rosegold font-normal">
              E ser lembrado.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#f4ece8]/85 max-w-2xl mx-auto leading-relaxed font-light">
            Vídeos, gestão de redes sociais e conteúdo criativo para marcas de Piquete/SP e região que querem se conectar com seu público.
          </p>

          {/* Primary and secondary action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={getWhatsAppUrl('Olá! Conheci seu trabalho pelo site e quero conteúdo para minha marca.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-[#120306] bg-gradient-to-r from-[#f5d4c8] via-[#e8b3a0] to-[#d69580] hover:brightness-105 active:scale-[0.99] transition-all rounded-lg shadow-[0_4px_20px_rgba(232,179,160,0.3)] whitespace-nowrap"
            >
              <span>Quero conteúdo para minha marca</span>
              <ArrowRight className="w-4 h-4 text-[#120306]" />
            </a>

            <a
              href="#portfolio"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-sm font-medium text-[#f4ece8] hover:text-white bg-[#28050e] hover:bg-[#380814] border border-[#e8b3a0]/30 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Conhecer os trabalhos</span>
            </a>
          </div>

          <div className="pt-2 text-xs text-[#e8b3a0]/70 flex items-center justify-center gap-4">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#e8b3a0]" /> Atendimento personalizado
            </span>
            <span aria-hidden="true" className="text-[#e8b3a0]/30">·</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#e8b3a0]" /> Captação presencial na região
            </span>
          </div>
        </div>

        {/* Video / Showreel Carrier Block */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-[#e8b3a0]/25 bg-[#1a0409] shadow-[0_20px_50px_rgba(34,5,11,0.8)]">
            {/* Visual Header / Player Bar */}
            <div className="px-4 py-2.5 bg-[#25050e] border-b border-[#e8b3a0]/15 flex items-center justify-between text-xs text-[#e8b3a0]/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#8e0e25] animate-pulse" />
                <span className="font-medium text-white tracking-wider uppercase text-[11px]">
                  Showreel Autoral • Videomaker
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#e8b3a0]/60">Piquete & Região</span>
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1 text-[11px]"
                >
                  <Instagram className="w-3 h-3" />
                  <span>@milla.rii</span>
                </a>
              </div>
            </div>

            {/* Cinematic Video Showcase Canvas */}
            <div className="relative aspect-video w-full bg-[#120306] flex flex-col items-center justify-center p-6 text-center overflow-hidden group">
              {/* Background gradient & fine grid line aesthetics */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2d050e] via-[#1a0409] to-[#3a0813] opacity-90" />
              <div
                className="absolute inset-0 opacity-10 bg-[radial-gradient(#e8b3a0_1px,transparent_1px)]"
                style={{ backgroundSize: '24px 24px' }}
              />

              {/* Decorative cinematic frame corners */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#e8b3a0]/40 pointer-events-none" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#e8b3a0]/40 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#e8b3a0]/40 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#e8b3a0]/40 pointer-events-none" />

              {/* Central Content Placeholder */}
              <div className="relative z-10 max-w-lg space-y-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#8e0e25] to-[#c01235] text-white flex items-center justify-center shadow-[0_0_30px_rgba(192,18,53,0.5)] hover:scale-105 active:scale-95 transition-all group/btn"
                  aria-label={isPlaying ? 'Pausar prévia' : 'Reproduzir prévia'}
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
                  ) : (
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
                  )}
                </button>

                <div className="space-y-1.5">
                  <p className="font-editorial text-xl sm:text-2xl text-white font-medium">
                    {isPlaying ? 'Amostra de dinâmica visual em reprodução' : 'Destaque de Produção Audiovisual'}
                  </p>
                  <p className="text-xs sm:text-sm text-[#e8b3a0]/80">
                    Captação de alta definição com direção criativa, enquadramentos fluídos e acabamento refinado.
                  </p>
                </div>

                {/* Explicitly identified placeholder badge required by instructions */}
                <div className="inline-block bg-[#120306]/85 border border-dashed border-[#e8b3a0]/40 px-3 py-1.5 rounded text-[11px] text-[#f5d4c8]">
                  <span>[Espaço reservado: Inserir vídeo showreel oficial de Milla / Millari]</span>
                </div>
              </div>

              {/* Bottom interactive player controls bar */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#e8b3a0]/70 z-10 pt-2 border-t border-[#e8b3a0]/10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="hover:text-white transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-[11px] tabular-nums text-[#e8b3a0]/80">
                    {isPlaying ? '00:14 / 00:45' : '00:00 / 00:45'}
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-[11px]">
                  <span>4K 60fps</span>
                  <span>·</span>
                  <span>Color Grading Autoral</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
