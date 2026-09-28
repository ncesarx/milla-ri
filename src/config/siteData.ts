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
    title: 'Estética & Gastronomia Local',
    serviceType: 'Videomaker',
    segment: 'Gastronomia & Cafeteria',
    description: 'Captação sensorial com foco nos detalhes, texturas e preparo artesanal. Ritmo fluido e trilha envolvente.',
    objective: 'Despertar desejo imediato e atrair clientes de Piquete e cidades vizinhas para vivenciar o espaço físico.',
    aspectRatio: '9:16',
    tag: 'Reels Sensorial',
    duration: '0:32',
    accentColor: '#4e0c1b',
  },
  {
    id: 'proj-2',
    title: 'Lançamento de Coleção & Moda',
    serviceType: 'Criação de Conteúdo',
    segment: 'Moda & Varejo',
    description: 'Direção criativa focada em combinações, caimento e elegância. Luz natural e cortes refinados.',
    objective: 'Apresentar a nova linha valorizando cada detalhe e direcionando o cliente para a compra no WhatsApp.',
    aspectRatio: '9:16',
    tag: 'Lookbook Vertical',
    duration: '0:45',
    accentColor: '#350812',
  },
  {
    id: 'proj-3',
    title: 'Posicionamento para Profissional Autônomo',
    serviceType: 'Social Media',
    segment: 'Saúde & Bem-Estar',
    description: 'Reestruturação visual do perfil, alinhamento de destaques e vídeos explicativos em linguagem humana.',
    objective: 'Construir autoridade sólida, transmitindo confiança para quem busca atendimento na região.',
    aspectRatio: '9:16',
    tag: 'Branding & Presença',
    duration: '0:28',
    accentColor: '#2b060d',
  },
  {
    id: 'proj-4',
    title: 'Institucional & Bastidores de Negócio',
    serviceType: 'Videomaker',
    segment: 'Comércio & Serviços',
    description: 'Narrativa documental sobre a história, a dedicação diária e o cuidado no atendimento ao cliente.',
    objective: 'Gerar identificação genuína e conexão emocional com a comunidade local.',
    aspectRatio: '9:16',
    tag: 'História & Bastidores',
    duration: '0:50',
    accentColor: '#490b19',
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
