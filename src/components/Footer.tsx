import React, { useState } from 'react';
import { ArrowUp, Instagram, MessageSquare, Shield, X } from 'lucide-react';
import { MillariLogo } from './MillariLogo';
import { SITE_CONFIG } from '../config/siteData';
import { useConfig } from '../context/ConfigContext';

export const Footer: React.FC = () => {
  const { getWhatsAppUrl, setIsChecklistOpen } = useConfig();
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0b0103] border-t border-[#e8b3a0]/15 pt-16 pb-12 text-[#f4ece8]/75 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-[#e8b3a0]/10">
          {/* Brand mark & territorial identity */}
          <div className="space-y-3">
            <MillariLogo variant="full" size="md" />
            <p className="text-sm font-medium text-white tracking-wide">
              Videomaker • Social Media • Criação de Conteúdo
            </p>
            <p className="text-xs text-[#e8b3a0]/70">
              Piquete/SP e região do Vale do Paraíba
            </p>
          </div>

          {/* Quick contact and social navigation */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a0409] hover:bg-[#28050e] border border-[#e8b3a0]/20 text-[#e8b3a0] hover:text-white transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>@milla.rii</span>
            </a>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a0409] hover:bg-[#28050e] border border-[#e8b3a0]/20 text-[#e8b3a0] hover:text-white transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Solicitar Orçamento</span>
            </a>

            <button
              onClick={() => setIsChecklistOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#350812] hover:bg-[#490b19] border border-[#e8b3a0]/30 text-[#f5d4c8] transition-colors"
            >
              <span>Checklist Pré-Publicação</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#e8b3a0]/60">
          <p>
            © {new Date().getFullYear()} MILLARI. Todos os direitos reservados. Produção audiovisual e gestão de redes sociais.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setPrivacyModalOpen(true)}
              className="hover:text-white transition-colors underline underline-offset-4"
            >
              Privacidade & Tratamento de Dados
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors p-1"
              aria-label="Voltar ao topo da página"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {privacyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
        >
          <div className="relative w-full max-w-lg bg-[#1a0409] border border-[#e8b3a0]/30 rounded-2xl p-6 shadow-2xl space-y-4 text-xs text-[#f4ece8]/90 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#e8b3a0]/15">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#e8b3a0]" />
                <h3 className="font-editorial text-lg font-medium text-white">
                  Privacidade & Dados
                </h3>
              </div>
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="p-1 text-[#e8b3a0]/70 hover:text-white rounded"
                aria-label="Fechar modal de privacidade"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 leading-relaxed text-[#f4ece8]/80 font-light">
              <p>
                A <strong className="text-white">MILLARI</strong> preza pela transparência, privacidade e proteção dos dados de todos os seus visitantes e clientes em conformidade com a LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/2018).
              </p>
              <h4 className="font-semibold text-white">1. Coleta e uso de informações</h4>
              <p>
                Os dados fornecidos no formulário de contato (como nome, telefone e detalhes de projetos) são utilizados única e exclusivamente para a elaboração de propostas comerciais e comunicação direta de orçamentos solicitados pelo próprio usuário.
              </p>
              <h4 className="font-semibold text-white">2. Comunicação via WhatsApp</h4>
              <p>
                Ao iniciar uma conversa por meio dos botões de WhatsApp deste site, a interação ocorrerá diretamente através do aplicativo WhatsApp, segundo as políticas e termos de privacidade da respectiva plataforma.
              </p>
              <h4 className="font-semibold text-white">3. Direitos do titular</h4>
              <p>
                A qualquer momento você poderá solicitar a exclusão de seus dados de contato dos nossos registros enviando uma mensagem para nossos canais oficiais.
              </p>
            </div>

            <div className="pt-3 border-t border-[#e8b3a0]/15 text-right">
              <button
                onClick={() => setPrivacyModalOpen(false)}
                className="px-4 py-2 bg-[#2d050e] hover:bg-[#3d0814] text-white rounded-lg text-xs font-medium transition-colors"
              >
                Entendi e fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
