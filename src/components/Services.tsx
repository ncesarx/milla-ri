import React from 'react';
import { Video, Share2, Sparkles, Check, ArrowUpRight } from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '../config/siteData';
import { useConfig } from '../context/ConfigContext';

export const Services: React.FC = () => {
  const { getWhatsAppUrl } = useConfig();

  const iconMap: Record<string, React.ReactNode> = {
    videomaker: <Video className="w-6 h-6 text-[#e8b3a0]" />,
    'social-media': <Share2 className="w-6 h-6 text-[#e8b3a0]" />,
    'criacao-conteudo': <Sparkles className="w-6 h-6 text-[#e8b3a0]" />,
  };

  return (
    <section id="servicos" className="py-20 md:py-28 bg-[#140307] relative border-t border-[#e8b3a0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-[0.25em] text-[#e8b3a0] font-medium mb-3">
            O que fazemos
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-editorial font-medium text-white tracking-tight leading-tight">
            Soluções completas para posicionar sua marca com elegância
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#f4ece8]/75 leading-relaxed">
            Formatos pensados para valorizar a essência do comércio e dos profissionais locais, aproximando seu negócio de clientes reais de Piquete e região.
          </p>
          <p className="mt-2 text-xs text-[#e8b3a0]/70 italic">
            * Os detalhes de cada serviço constituem uma proposta editorial a confirmar e personalizar com a profissional.
          </p>
        </div>

        {/* 3 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES_DATA.map((service, index) => {
            const stepNum = `0${index + 1}`;
            return (
              <div
                key={service.id}
                className="group relative flex flex-col justify-between p-8 rounded-2xl bg-[#1c040a] border border-[#e8b3a0]/20 hover:border-[#e8b3a0]/50 transition-all duration-300 shadow-[0_4px_25px_rgba(20,3,7,0.5)] hover:-translate-y-1"
              >
                <div>
                  {/* Top editorial numbering & category */}
                  <div className="flex items-center justify-between pb-6 border-b border-[#e8b3a0]/15 mb-6">
                    <span className="font-editorial text-2xl text-[#e8b3a0]/60 font-light">
                      {stepNum}.
                    </span>
                    <span className="text-xs tracking-wider uppercase text-[#e8b3a0]/80">
                      {service.category}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="mb-4 inline-flex p-3 rounded-xl bg-[#2d050e] border border-[#e8b3a0]/20">
                    {iconMap[service.id]}
                  </div>

                  <h3 className="text-2xl font-editorial font-medium text-white mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#f4ece8]/85 leading-relaxed mb-6 font-light">
                    {service.shortDesc}
                  </p>

                  {/* Benefits */}
                  <div className="space-y-2.5 mb-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#e8b3a0]">
                      Benefícios para o seu negócio:
                    </p>
                    <ul className="space-y-2 text-xs text-[#f4ece8]/80">
                      {service.benefits.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#e8b3a0] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal For note */}
                  <div className="pt-4 border-t border-[#e8b3a0]/10 text-xs text-[#e8b3a0]/80 mb-6">
                    <span className="font-medium text-white">Ideal para: </span>
                    <span>{service.idealFor}</span>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-4">
                  <a
                    href={getWhatsAppUrl(
                      `Olá! Gostaria de entender mais e solicitar um orçamento para o serviço de ${service.title}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#2a050e] group-hover:bg-[#8e0e25] text-xs font-semibold text-[#f4ece8] group-hover:text-white border border-[#e8b3a0]/25 transition-all"
                  >
                    <span>Consultar {service.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#e8b3a0] group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiet assurance strip */}
        <div className="mt-12 p-6 rounded-xl bg-[#1f050b] border border-[#e8b3a0]/15 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h4 className="font-editorial text-lg text-white font-medium">
              Precisa de um pacote sob medida para seu momento atual?
            </h4>
            <p className="text-xs text-[#e8b3a0]/80">
              Podemos combinar gravações mensais de Videomaker com a gestão de Social Media para uma presença completa.
            </p>
          </div>
          <a
            href={getWhatsAppUrl('Olá! Gostaria de conversar sobre um pacote sob medida para a minha marca.')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 text-xs font-semibold text-[#120306] bg-[#e8b3a0] hover:bg-[#f5d4c8] rounded-lg transition-colors whitespace-nowrap"
          >
            Falar sobre pacote personalizado
          </a>
        </div>
      </div>
    </section>
  );
};
