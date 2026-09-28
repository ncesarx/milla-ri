import React, { useState } from 'react';
import { MessageSquare, Instagram, Send, MapPin, CheckCircle2, Sliders, ArrowUpRight } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { SITE_CONFIG } from '../config/siteData';

export const Contact: React.FC = () => {
  const { whatsAppNumber, setWhatsAppNumber, isWhatsAppConfigured, getWhatsAppUrl } = useConfig();

  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formService, setFormService] = useState('Videomaker');
  const [formDescription, setFormDescription] = useState('');
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [tempPhone, setTempPhone] = useState(whatsAppNumber);

  const handlePhoneSave = (e: React.FormEvent) => {
    e.preventDefault();
    setWhatsAppNumber(tempPhone);
    setIsEditingPhone(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build a formatted message
    const formattedMsg = `Olá! Conheci seu trabalho pelo site e gostaria de solicitar um orçamento para minha marca.
Nome: ${formName || '[Não informado]'}
Contato: ${formContact || '[Não informado]'}
Serviço de interesse: ${formService}
Detalhes do projeto: ${formDescription || 'Gostaria de uma conversa para entender as opções.'}`;

    const url = getWhatsAppUrl(formattedMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contato" className="py-20 md:py-28 bg-[#100205] relative border-t border-[#e8b3a0]/15">
      {/* Decorative radial lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-[#621023]/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct CTA & Channels (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] text-[#e8b3a0] font-medium">
              Contato & Orçamento
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-editorial font-medium text-white tracking-tight leading-[1.1]">
              Vamos dar mais presença à sua marca?
            </h2>

            <p className="text-base sm:text-lg text-[#f4ece8]/85 leading-relaxed font-light">
              Conte o que seu negócio precisa e vamos conversar sobre o próximo conteúdo.
            </p>

            {/* Direct WhatsApp Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#28050e] to-[#1a0409] border border-[#e8b3a0]/30 shadow-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8e0e25] flex items-center justify-center text-white">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-editorial text-xl font-medium text-white">
                    Orçamento Rápido via WhatsApp
                  </h3>
                  <p className="text-xs text-[#e8b3a0]/80">
                    Mensagem direta e atendimento sem burocracia.
                  </p>
                </div>
              </div>

              {/* Editable WhatsApp Status */}
              <div className="p-3 rounded-lg bg-[#140307] border border-[#e8b3a0]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="text-[#f4ece8]/80">
                  <span className="text-[#e8b3a0] font-medium">Número oficial: </span>
                  {isWhatsAppConfigured ? (
                    <span className="font-mono text-white">{whatsAppNumber}</span>
                  ) : (
                    <span className="text-amber-300 italic">
                      [Número a preencher pela profissional]
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setIsEditingPhone(!isEditingPhone)}
                  className="inline-flex items-center gap-1 text-[11px] text-[#e8b3a0] hover:text-white underline underline-offset-2 self-start sm:self-auto"
                >
                  <Sliders className="w-3 h-3" />
                  <span>{isEditingPhone ? 'Fechar' : 'Editar número'}</span>
                </button>
              </div>

              {isEditingPhone && (
                <form onSubmit={handlePhoneSave} className="p-3 rounded-lg bg-[#1b0409] border border-[#e8b3a0]/30 space-y-2 text-xs">
                  <label htmlFor="official-phone" className="block text-white font-medium">
                    Definir número oficial do WhatsApp:
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="official-phone"
                      type="text"
                      placeholder="Ex: 12981234567"
                      value={tempPhone}
                      onChange={(e) => setTempPhone(e.target.value)}
                      className="flex-1 bg-[#120306] border border-[#e8b3a0]/30 rounded px-2.5 py-1.5 text-xs text-white placeholder-[#e8b3a0]/40 focus:outline-none focus:border-[#e8b3a0]"
                    />
                    <button
                      type="submit"
                      className="bg-[#d69580] hover:bg-[#e8b3a0] text-[#120306] font-semibold px-3 py-1.5 rounded transition-colors"
                    >
                      Salvar
                    </button>
                  </div>
                  <p className="text-[10px] text-[#e8b3a0]/70">
                    O número é salvo para todos os links de WhatsApp desta página.
                  </p>
                </form>
              )}

              {/* Exact WhatsApp Button requested in instructions */}
              <a
                href={getWhatsAppUrl(SITE_CONFIG.defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl bg-gradient-to-r from-[#f5d4c8] via-[#e8b3a0] to-[#d69580] text-sm font-semibold text-[#120306] hover:brightness-105 active:scale-[0.99] transition-all shadow-[0_4px_16px_rgba(232,179,160,0.25)]"
              >
                <MessageSquare className="w-4 h-4 text-[#120306]" />
                <span>Conversar no WhatsApp agora</span>
              </a>

              <p className="text-[11px] text-center text-[#e8b3a0]/70">
                Mensagem inicial automática: &quot;{SITE_CONFIG.defaultWhatsAppMessage}&quot;
              </p>
            </div>

            {/* Social & Territorial links */}
            <div className="space-y-3 pt-2">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-[#1a0409] border border-[#e8b3a0]/20 hover:border-[#e8b3a0]/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#2e050e] text-[#e8b3a0]">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-editorial text-base font-medium text-white">
                      Instagram Oficial
                    </p>
                    <p className="text-xs text-[#e8b3a0]/80">
                      @milla.rii · Acompanhe novos projetos e bastidores
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#e8b3a0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-[#160307] border border-[#e8b3a0]/15 text-xs text-[#e8b3a0]/80">
                <MapPin className="w-4 h-4 text-[#e8b3a0] shrink-0" />
                <span>
                  Base em <strong>Piquete/SP</strong> com atendimento presencial em municípios vizinhos no Vale do Paraíba.
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Briefing / Contact Form (6 cols) */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-2xl bg-[#180409] border border-[#e8b3a0]/20 shadow-xl space-y-6">
              <div className="space-y-1">
                <h3 className="font-editorial text-2xl font-medium text-white">
                  Formulário Rápido de Proposta
                </h3>
                <p className="text-xs text-[#f4ece8]/75">
                  Preencha as informações básicas para adiantar o planejamento do seu projeto.
                </p>
              </div>

              {/* Transparent notice required by instructions */}
              <div className="p-3 rounded-lg bg-[#28050e] border border-[#e8b3a0]/20 text-[11px] text-[#f5d4c8] leading-relaxed">
                <span>
                  <strong>Nota de transparência:</strong> Ao clicar em &quot;Enviar pelo WhatsApp&quot;, os dados preenchidos serão organizados automaticamente em uma mensagem pronta para envio no WhatsApp oficial da Millari.
                </span>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="user-name" className="block text-xs font-medium text-[#e8b3a0] mb-1.5">
                    Seu nome ou nome da empresa *
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    required
                    placeholder="Ex: Mariana / Café da Serra"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-[#120306] border border-[#e8b3a0]/30 rounded-lg px-4 py-3 text-sm text-white placeholder-[#e8b3a0]/35 focus:outline-none focus:border-[#e8b3a0] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="user-contact" className="block text-xs font-medium text-[#e8b3a0] mb-1.5">
                    Seu WhatsApp ou E-mail para retorno *
                  </label>
                  <input
                    id="user-contact"
                    type="text"
                    required
                    placeholder="Ex: (12) 98765-4321 ou seuemail@empresa.com"
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    className="w-full bg-[#120306] border border-[#e8b3a0]/30 rounded-lg px-4 py-3 text-sm text-white placeholder-[#e8b3a0]/35 focus:outline-none focus:border-[#e8b3a0] transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="user-service" className="block text-xs font-medium text-[#e8b3a0] mb-1.5">
                    Serviço principal de interesse
                  </label>
                  <select
                    id="user-service"
                    value={formService}
                    onChange={(e) => setFormService(e.target.value)}
                    className="w-full bg-[#120306] border border-[#e8b3a0]/30 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#e8b3a0] transition-colors"
                  >
                    <option value="Videomaker">Videomaker (Vídeos / Reels para negócio)</option>
                    <option value="Social Media">Social Media (Gestão de Redes Sociais)</option>
                    <option value="Criação de Conteúdo">Criação de Conteúdo (Ensaios / Estratégia)</option>
                    <option value="Pacote Completo">Pacote Completo (Vídeos + Gestão do Feed)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="user-project" className="block text-xs font-medium text-[#e8b3a0] mb-1.5">
                    Breve descrição do projeto ou negócio
                  </label>
                  <textarea
                    id="user-project"
                    rows={4}
                    placeholder="Conte sobre o que você vende, seu endereço ou cidade e o que gostaria de alcançar com novos vídeos..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full bg-[#120306] border border-[#e8b3a0]/30 rounded-lg px-4 py-3 text-sm text-white placeholder-[#e8b3a0]/35 focus:outline-none focus:border-[#e8b3a0] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-[#8e0e25] to-[#c01235] hover:brightness-110 active:scale-[0.99] text-sm font-semibold text-white shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar solicitação de orçamento</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
