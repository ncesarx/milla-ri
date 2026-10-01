import React, { useState } from 'react';
import { Play, Instagram, ArrowUpRight, Film, X, ExternalLink, Sparkles } from 'lucide-react';
import { PORTFOLIO_PROJECTS, PortfolioItem, SITE_CONFIG } from '../config/siteData';
import { useConfig } from '../context/ConfigContext';

export const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'Videomaker' | 'Social Media' | 'Criação de Conteúdo'>('all');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const { getWhatsAppUrl } = useConfig();

  const filteredProjects = activeFilter === 'all'
    ? PORTFOLIO_PROJECTS
    : PORTFOLIO_PROJECTS.filter((p) => p.serviceType === activeFilter);

  return (
    <section id="portfolio" className="py-20 md:py-28 bg-[#100205] relative border-t border-[#e8b3a0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#e8b3a0] font-medium mb-3">
              Portfólio & Linguagem Visual
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-white tracking-tight">
              Produções que conectam e geram desejo
            </h2>
            <p className="mt-3 text-sm text-[#f4ece8]/75 max-w-xl">
              Confira os Reels autorais e produções reais da <strong className="text-white">MILLARI</strong> (@milla.rii) em Videomaker, Criação de Conteúdo e Social Media.
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#1c040a] rounded-xl border border-[#e8b3a0]/15 self-start">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-[#8e0e25] text-white shadow-sm'
                  : 'text-[#e8b3a0]/70 hover:text-white'
              }`}
            >
              Todos os Projetos
            </button>
            <button
              onClick={() => setActiveFilter('Videomaker')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'Videomaker'
                  ? 'bg-[#8e0e25] text-white shadow-sm'
                  : 'text-[#e8b3a0]/70 hover:text-white'
              }`}
            >
              Videomaker (Reels)
            </button>
            <button
              onClick={() => setActiveFilter('Criação de Conteúdo')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'Criação de Conteúdo'
                  ? 'bg-[#8e0e25] text-white shadow-sm'
                  : 'text-[#e8b3a0]/70 hover:text-white'
              }`}
            >
              Criação de Conteúdo
            </button>
            <button
              onClick={() => setActiveFilter('Social Media')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'Social Media'
                  ? 'bg-[#8e0e25] text-white shadow-sm'
                  : 'text-[#e8b3a0]/70 hover:text-white'
              }`}
            >
              Social Media
            </button>
          </div>
        </div>

        {/* Gallery Grid (Vertical 9:16 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#1c040a] border border-[#e8b3a0]/20 hover:border-[#e8b3a0]/50 transition-all duration-300 shadow-lg hover:-translate-y-1.5"
            >
              {/* Vertical Reel Mockup Window (9:16 Aspect Ratio) */}
              <div
                onClick={() => setSelectedProject(project)}
                className="relative aspect-[9/16] w-full bg-gradient-to-b from-[#2a050e] via-[#1a0409] to-[#120306] overflow-hidden cursor-pointer flex flex-col justify-between p-4"
              >
                {/* Subtle texture / reel lines */}
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#e8b3a0_1px,transparent_1px)]" style={{ backgroundSize: '16px 16px' }} />

                {/* Top reel details */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-[#e8b3a0]">
                  <span className="font-medium tracking-wider uppercase bg-[#120306]/80 px-2 py-0.5 rounded backdrop-blur-sm border border-[#e8b3a0]/20">
                    {project.serviceType}
                  </span>
                  <span className="font-mono text-[10px] bg-[#8e0e25] text-white px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                    <Instagram className="w-3 h-3" /> Reel
                  </span>
                </div>

                {/* Center Play Button Graphic */}
                <div className="relative z-10 my-auto text-center space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#8e0e25] to-[#c01235] border border-[#e8b3a0]/50 text-white flex items-center justify-center shadow-[0_4px_20px_rgba(142,14,37,0.5)] group-hover:scale-110 group-hover:brightness-110 transition-transform">
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-editorial text-lg font-medium text-white px-2 leading-tight">
                      {project.title}
                    </p>
                    <p className="text-[11px] text-[#e8b3a0]/80">
                      {project.segment}
                    </p>
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="relative z-10 pt-2 border-t border-[#e8b3a0]/15 flex items-center justify-between text-[11px] text-[#e8b3a0]/80">
                  <span className="flex items-center gap-1 font-medium text-white">
                    <Instagram className="w-3.5 h-3.5 text-[#e8b3a0]" />
                    Ver Reel oficial
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#e8b3a0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                {/* Dark gradient shadow on hover */}
                <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>

              {/* Bottom Card Context */}
              <div className="p-4 bg-[#180408] border-t border-[#e8b3a0]/10 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-editorial text-base font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#f4ece8]/75 mt-1 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#e8b3a0]/10 flex items-center justify-between gap-2 text-[11px]">
                  <span className="text-[#e8b3a0]/80 font-medium">{project.tag}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-white hover:text-[#e8b3a0] font-medium transition-colors"
                    >
                      Detalhes
                    </button>
                    <a
                      href={project.reelUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#350812] hover:bg-[#4d0c1b] text-[#e8b3a0] hover:text-white transition-colors border border-[#e8b3a0]/20 font-medium"
                      title="Assistir no Instagram"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Assistir</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Big Instagram Invitation Box */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#24050d] via-[#350812] to-[#24050d] border border-[#e8b3a0]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#e8b3a0]">
              <Instagram className="w-4 h-4 text-[#e8b3a0]" />
              <span>Conteúdo contínuo no feed e nos stories</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-editorial font-medium text-white">
              Veja todos os Reels no Instagram @milla.rii
            </h3>
            <p className="text-sm text-[#f4ece8]/80 max-w-xl">
              Acompanhe os bastidores de gravações em Piquete e região, novos Reels entregues, tendências visuais e dicas para fortalecer sua marca.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold text-[#120306] bg-gradient-to-r from-[#f5d4c8] to-[#e8b3a0] hover:brightness-105 rounded-lg shadow-md transition-all whitespace-nowrap"
            >
              <Instagram className="w-4 h-4" />
              <span>Acessar @milla.rii</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={getWhatsAppUrl('Olá! Vi os Reels no portfólio e gostaria de um orçamento para a minha marca.')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-medium text-[#f4ece8] bg-[#1a0409] hover:bg-[#28050e] border border-[#e8b3a0]/30 rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Quero um projeto similar</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modal with Project Details & Direct Instagram Reel Player Link */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg bg-[#1a0409] border border-[#e8b3a0]/30 rounded-2xl p-6 shadow-2xl space-y-5">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 text-[#e8b3a0]/70 hover:text-white rounded-lg transition-colors"
              aria-label="Fechar detalhes"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#e8b3a0] font-medium">
                {selectedProject.serviceType} · {selectedProject.segment}
              </span>
              <h3 className="text-2xl font-editorial font-medium text-white">
                {selectedProject.title}
              </h3>
            </div>

            {/* Direct Reel Action Box */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#2f0611] to-[#1c040a] border border-[#e8b3a0]/25 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-[#e8b3a0]">
                  <Instagram className="w-4 h-4 text-[#e8b3a0]" />
                  <span className="font-semibold text-white">Reel Oficial no Instagram</span>
                </div>
                <span className="text-[11px] font-mono text-[#e8b3a0]/70 bg-black/40 px-2 py-0.5 rounded border border-[#e8b3a0]/20">
                  {selectedProject.tag}
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#f4ece8]/90">
                <div>
                  <span className="font-semibold text-[#e8b3a0] block mb-0.5">
                    Proposta & Formato:
                  </span>
                  <p className="leading-relaxed">{selectedProject.description}</p>
                </div>

                <div>
                  <span className="font-semibold text-[#e8b3a0] block mb-0.5">
                    Objetivo estratégico:
                  </span>
                  <p className="leading-relaxed">{selectedProject.objective}</p>
                </div>
              </div>

              {/* Primary Action Button: Watch directly on Instagram */}
              <a
                href={selectedProject.reelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#8e0e25] via-[#a8102d] to-[#c01235] text-xs font-semibold text-white shadow-lg hover:brightness-110 active:scale-[0.99] transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Assistir a este Reel no Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <a
                href={getWhatsAppUrl(`Olá! Vi o trabalho "${selectedProject.title}" (${selectedProject.serviceType}) no site e gostaria de solicitar um orçamento similar.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#e8b3a0] hover:text-white font-medium hover:underline transition-colors"
              >
                Solicitar orçamento para este formato →
              </a>

              <button
                onClick={() => setSelectedProject(null)}
                className="py-2.5 px-4 rounded-lg bg-[#25050e] text-xs text-[#f4ece8] hover:bg-[#350812] transition-colors border border-[#e8b3a0]/20"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
