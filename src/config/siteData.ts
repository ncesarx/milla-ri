export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  shortDesc: string;
  benefits: string[];
  deliverablesDraft: string[];
  idealFor: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  serviceType: 'Videomaker' | 'Social Media' | 'Criação de Conteúdo' | 'Reels Comercial';
  segment: string;
  description: string;
  objective: string;
  aspectRatio: '9:16' | '16:9';
  tag: string;
  duration?: string;
  accentColor: string;
  reelUrl: string;
  instagramCode: string;
}

export const SITE_CONFIG = {
  brandName: 'MILLARI',
  creatorHandle: '@milla.rii',
  instagramUrl: 'https://www.instagram.com/milla.rii/',
  city: 'Piquete',
  state: 'SP',
  region: 'Piquete/SP e região do Vale do Paraíba',
  defaultWhatsAppMessage: 'Olá! Conheci seu trabalho pelo site e gostaria de solicitar um orçamento para minha marca.',
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'videomaker',
    title: 'Videomaker',
    category: 'Produção Audiovisual',
    shortDesc: 'Produção de vídeos para apresentar negócios, produtos e serviços com qualidade visual e uma narrativa envolvente.',
    benefits: [
      'Captação presencial com olhar estético apurado e iluminação dedicada',
      'Edição com ritmo contemporâneo, color grading e trilhas alinhadas',
      'Formatos otimizados para Reels, TikTok, stories e anúncios locais',
      'Valorização visual real dos seus produtos, ambiente e equipe',
    ],
    deliverablesDraft: [
      'Roteirização básica e alinhamento de intenção',
      'Gravação no local do negócio (Piquete e região)',
      'Edição, cortes dinâmicos e legendagem estilizada',
      'Arquivos finais entregues em alta definição',
    ],
    idealFor: 'Restaurantes, confeitarias, clínicas, lojas de moda, prestadores de serviços e empresas que desejam se destacar no digital.',
  },
  {
    id: 'social-media',
    title: 'Social Media',
    category: 'Gestão & Posicionamento',
    shortDesc: 'Planejamento e gestão de conteúdo para construir uma presença consistente, profissional e atrativa nas redes sociais.',
    benefits: [
      'Alinhamento do feed com a identidade visual e o estilo da sua marca',
      'Organização de calendário editorial sem postagens vazias ou improvisadas',
      'Planejamento focado em conectar seu negócio ao público local',
      'Orientação estratégica para transformar seguidores em clientes fiéis',
    ],
    deliverablesDraft: [
      'Diagnóstico inicial da presença digital',
      'Grade de conteúdo semanal / mensal',
      'Padronização visual e copywriting das postagens',
      'Relatório de acompanhamento de alcance e engajamento',
    ],
    idealFor: 'Marcas e profissionais que não têm tempo para postar com consistência e desejam terceirizar com tranquilidade.',
  },
  {
    id: 'criacao-conteudo',
    title: 'Criação de Conteúdo',
    category: 'Estratégia Criativa',
    shortDesc: 'Desenvolvimento de conteúdos autênticos, alinhados à identidade da marca e à linguagem de seu público.',
    benefits: [
      'Roteiros criativos que valorizam a essência e o diferencial do negócio',
      'Cobertura visual de eventos, lançamentos de coleções e datas especiais',
      'Materiais versáteis para stories interativos, carrosséis e vídeos curtos',
      'Linguagem próxima, sem clichês ou jargões artificiais',
    ],
    deliverablesDraft: [
      'Direção criativa e sugestões temáticas mensais',
      'Captação de acervo de fotos e takes secundários (B-Roll)',
      'Narrativas focadas na experiência do consumidor',
      'Orientações práticas de gravação para a própria equipe',
    ],
    idealFor: 'Empreendedores que querem humanizar sua marca e criar uma comunidade engajada na região.',
  },
];

export const PORTFOLIO_PROJECTS: PortfolioItem[] = [
  {
    id: 'proj-1',
    title: 'Produção Audiovisual & Imersão',
    serviceType: 'Videomaker',
    segment: 'Comércio & Gastronomia',
    description: 'Captação presencial com olhar estético apurado, cortes rítmicos e valorização dos detalhes para engajamento no Instagram.',
    objective: 'Despertar conexão imediata com o público e transformar visualizações em clientes e visitas presenciais.',
    aspectRatio: '9:16',
    tag: 'Reel Autoral',
    duration: 'Reel',
    accentColor: '#4e0c1b',
    reelUrl: 'https://www.instagram.com/milla.rii/reel/DdjeBKDRvB4/',
    instagramCode: 'DdjeBKDRvB4',
  },
  {
    id: 'proj-2',
    title: 'Narrativa Criativa & Estilo',
    serviceType: 'Criação de Conteúdo',
    segment: 'Posicionamento de Marca & Moda',
    description: 'Roteirização e captação focada na identidade da marca, traduzindo estética e mensagem com elegância e dinamismo.',
    objective: 'Humanizar a presença da marca, transmitindo autoridade visual e gerando desejo no público-alvo.',
    aspectRatio: '9:16',
    tag: 'Criação Visual',
    duration: 'Reel',
    accentColor: '#350812',
    reelUrl: 'https://www.instagram.com/milla.rii/reel/DcmT3Wbv96c/',
    instagramCode: 'DcmT3Wbv96c',
  },
  {
    id: 'proj-3',
    title: 'Estratégia & Presença Digital',
    serviceType: 'Social Media',
    segment: 'Gestão de Conteúdo & Engajamento',
    description: 'Planejamento de publicação e comunicação com linguagem próxima para construir comunidade ativa no feed.',
    objective: 'Manter constância profissional no perfil, fidelizando seguidores e atraindo clientes qualificados da região.',
    aspectRatio: '9:16',
    tag: 'Estratégia de Feed',
    duration: 'Reel',
    accentColor: '#2b060d',
    reelUrl: 'https://www.instagram.com/milla.rii/reel/DcgPHJDRXPE/',
    instagramCode: 'DcgPHJDRXPE',
  },
  {
    id: 'proj-4',
    title: 'Destaque & Dinâmica de Vídeo',
    serviceType: 'Videomaker',
    segment: 'Produção Visual & Bastidores',
    description: 'Edição moderna e envolvente para destacar processos, ambientes e momentos marcantes do negócio.',
    objective: 'Reter a atenção nos primeiros segundos e fortalecer o valor percebido dos serviços da empresa.',
    aspectRatio: '9:16',
    tag: 'Produção em Vídeo',
    duration: 'Reel',
    accentColor: '#490b19',
    reelUrl: 'https://www.instagram.com/milla.rii/reel/DczJ8MpPH0b/',
    instagramCode: 'DczJ8MpPH0b',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'Como solicitar um orçamento?',
    answer: 'O processo é simples e rápido: clique no botão do WhatsApp ou preencha o formulário nesta página. Você pode contar brevemente sobre seu negócio, quais formatos precisa (como vídeos avulsos ou gestão contínua) e conversaremos sobre a melhor proposta.',
  },
  {
    question: 'Quais informações enviar no primeiro contato?',
    answer: 'Para um atendimento mais ágil, você pode informar o nome do seu negócio, seu perfil no Instagram (se já tiver), a cidade onde está localizado e qual é o seu principal objetivo no momento (ex.: atrair novos clientes, renovar a imagem da marca ou ter vídeos com acabamento profissional).',
  },
  {
    question: 'Como funciona o atendimento em Piquete e região?',
    answer: 'A base de atuação é em Piquete/SP, com disponibilidade para gravações presenciais na cidade e em municípios vizinhos no Vale do Paraíba (como Lorena, Cruzeiro, Guaratinguetá e imediações). Para outras localidades, a disponibilidade e logística são alinhadas diretamente na conversa inicial.',
  },
  {
    question: 'Como saber qual serviço é o ideal para o meu negócio?',
    answer: 'Não se preocupe se tiver dúvidas no início. Se você precisa de vídeos pontuais para divulgar produtos ou ambiente, o serviço de Videomaker é perfeito. Se precisa de alguém cuidando da consistência e do feed mês a mês, a Gestão de Social Media é a mais indicada. Na conversa inicial, analisamos juntos a sua necessidade.',
  },
  {
    question: 'Qual é o prazo de entrega dos materiais?',
    answer: 'Os prazos variam de acordo com o escopo contratado (número de vídeos, complexidade da edição e frequência das postagens). Todas as datas de captação e prazos de entrega são combinados com antecedência e transparência na proposta.',
  },
];

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Conversa inicial',
    description: 'Bate-papo para entender a essência do seu negócio, quem é seu cliente ideal e quais são as metas da sua presença digital.',
  },
  {
    step: '02',
    title: 'Proposta e planejamento',
    description: 'Definição do formato ideal de serviço, cronograma de captação, temas dos conteúdos e alinhamento visual.',
  },
  {
    step: '03',
    title: 'Produção e aprovação',
    description: 'Captação presencial em seu espaço com olhar estético atento, seguida de edição profissional e envio para sua revisão.',
  },
  {
    step: '04',
    title: 'Entrega ou publicação',
    description: 'Materiais finalizados em alta qualidade prontos para veicular no feed, Reels e stories, gerando conexão e lembrança.',
  },
];
