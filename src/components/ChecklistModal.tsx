import React from 'react';
import { X, CheckCircle2, AlertTriangle, FileText, Image, Phone, Video, HelpCircle } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

export const ChecklistModal: React.FC = () => {
  const { isChecklistOpen, setIsChecklistOpen, whatsAppNumber, isWhatsAppConfigured, isPhotoConfigured } = useConfig();

  if (!isChecklistOpen) return null;

  const checklistItems = [
    {
      id: 1,
      title: 'Número oficial de WhatsApp com DDD',
      status: isWhatsAppConfigured ? 'configured' : 'pending',
      icon: <Phone className="w-4 h-4 text-[#e8b3a0]" />,
      description: isWhatsAppConfigured
        ? `Número configurado atualmente: ${whatsAppNumber}`
        : 'Necessário preencher o número com DDD para que os botões direcionem para o WhatsApp oficial.',
      actionNeeded: 'Insira o número no banner superior ou no rodapé.',
    },
    {
      id: 2,
      title: 'Fotografia oficial da Equipe Millari',
      status: 'configured',
      icon: <Image className="w-4 h-4 text-[#e8b3a0]" />,
      description: 'Fotografia da Equipe Millari integrada de forma permanente e fixa no código da seção Sobre.',
      actionNeeded: 'Pronto! A fotografia está incorporada e visível em todos os dispositivos.',
    },
    {
      id: 3,
      title: 'Vídeo Showreel ou amostra autoral principal',
      status: 'pending',
      icon: <Video className="w-4 h-4 text-[#e8b3a0]" />,
      description: 'Vídeo de 30 a 60 segundos compilando as melhores tomadas e gravações de negócios da região.',
      actionNeeded: 'Substituir o canvas de vídeo do Hero pelo link ou arquivo de vídeo final.',
    },
    {
      id: 4,
      title: 'Reels oficiais para o Portfólio',
      status: 'pending',
      icon: <Video className="w-4 h-4 text-[#e8b3a0]" />,
      description: '4 a 6 links de Reels selecionados do perfil @milla.rii com os nomes reais dos clientes/parceiros.',
      actionNeeded: 'Atualizar a lista PORTFOLIO_PROJECTS no arquivo de dados.',
    },
    {
      id: 5,
      title: 'Validação da proposta editorial e serviços',
      status: 'pending',
      icon: <FileText className="w-4 h-4 text-[#e8b3a0]" />,
      description: 'Confirmar os limites de entrega, frequências de postagem e pacotes oferecidos.',
      actionNeeded: 'Revisar os tópicos dos 3 serviços (Videomaker, Social Media e Criação de Conteúdo).',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl bg-[#1b0409] border border-[#e8b3a0]/30 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsChecklistOpen(false)}
          className="absolute top-5 right-5 p-2 text-[#e8b3a0]/70 hover:text-white rounded-lg transition-colors"
          aria-label="Fechar lista de verificação"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#e8b3a0]">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Guia de Lançamento</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-editorial font-medium text-white">
            Materiais para Fornecer Antes de Publicar
          </h2>
          <p className="text-xs text-[#f4ece8]/75 leading-relaxed">
            Para garantir 100% de autenticidade (sem dados fictícios), revise os itens abaixo com a profissional:
          </p>
        </div>

        <div className="space-y-3">
          {checklistItems.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#24050d] border border-[#e8b3a0]/15 flex items-start gap-3.5"
            >
              <div className="p-2 rounded-lg bg-[#350812] shrink-0 mt-0.5">
                {item.icon}
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-editorial text-base font-medium text-white">
                    {item.title}
                  </h3>
                  {item.status === 'configured' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Preenchido
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 font-medium">
                      <AlertTriangle className="w-3.5 h-3.5" /> A fornecer
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#f4ece8]/75 leading-relaxed">
                  {item.description}
                </p>

                <p className="text-[11px] text-[#e8b3a0] font-medium pt-1">
                  Ação: {item.actionNeeded}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-[#e8b3a0]/15 flex items-center justify-between">
          <p className="text-[11px] text-[#e8b3a0]/70">
            A estrutura do código está pronta para receber essas atualizações.
          </p>
          <button
            onClick={() => setIsChecklistOpen(false)}
            className="px-5 py-2.5 rounded-lg bg-[#8e0e25] hover:bg-[#a5122e] text-white text-xs font-semibold transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
