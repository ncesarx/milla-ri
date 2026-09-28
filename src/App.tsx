import React from 'react';
import { MessageSquare } from 'lucide-react';
import { ConfigProvider, useConfig } from './context/ConfigContext';
import { PreLaunchBanner } from './components/PreLaunchBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Process } from './components/Process';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChecklistModal } from './components/ChecklistModal';

const FloatingWhatsAppButton: React.FC = () => {
  const { getWhatsAppUrl } = useConfig();

  return (
    <aside
      aria-label="Atendimento rápido"
      className="fixed bottom-6 right-6 z-40"
    >
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp para orçamento"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-[#25d366] to-[#128c7e] text-white font-medium text-xs shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:brightness-110 active:scale-95 transition-all group"
      >
        <MessageSquare className="w-4 h-4 fill-white" />
        <span className="hidden sm:inline font-semibold">Orçamento via WhatsApp</span>
      </a>
    </aside>
  );
};

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#120306] text-[#f4ece8] selection:bg-[#8e0e25] selection:text-white">
      {/* Pre-launch review banner */}
      <PreLaunchBanner />

      {/* Main navigation complying with Top Bar Contract */}
      <Header />

      {/* Main sections */}
      <main className="flex-1">
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Process />
        <FAQ />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating CTA */}
      <FloatingWhatsAppButton />

      {/* Pre-publication requirements modal */}
      <ChecklistModal />
    </div>
  );
}

export default function App() {
  return (
    <ConfigProvider>
      <MainLayout />
    </ConfigProvider>
  );
}
