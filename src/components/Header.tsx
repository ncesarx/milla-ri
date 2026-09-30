import React, { useState } from 'react';
import { Menu, X, MessageSquare, Instagram } from 'lucide-react';
import { MillariLogo } from './MillariLogo';
import { useConfig } from '../context/ConfigContext';
import { SITE_CONFIG } from '../config/siteData';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getWhatsAppUrl } = useConfig();

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Como Funciona', href: '#como-funciona' },
    { label: 'Dúvidas', href: '#duvidas' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#140307]/90 backdrop-blur-md border-b border-[#e8b3a0]/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark & Seal */}
        <a
          href="#inicio"
          className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b3a0] rounded-lg transition-transform"
          aria-label="Millari - Início"
        >
          <MillariLogo variant="full" size="md" />
        </a>

        {/* Zone 2: 4-6 Clean Text Nav Links */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#f4ece8]/80"
          aria-label="Navegação principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#e8b3a0] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#e8b3a0]/60 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram da Millari @milla.rii"
            className="p-2 text-[#e8b3a0]/70 hover:text-[#e8b3a0] transition-colors rounded-full hover:bg-[#350812]"
            title="Acessar Instagram @milla.rii"
          >
            <Instagram className="w-5 h-5" />
          </a>

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-[#120306] bg-gradient-to-r from-[#f5d4c8] via-[#e8b3a0] to-[#d69580] hover:brightness-105 active:scale-[0.98] transition-all rounded-lg shadow-[0_2px_12px_rgba(232,179,160,0.25)] whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Solicitar orçamento</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#120306] bg-[#e8b3a0] rounded-md"
          >
            <MessageSquare className="w-3 h-3" />
            <span>Orçamento</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#e8b3a0] hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8b3a0]"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#180409] border-b border-[#e8b3a0]/20 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#f4ece8] hover:text-[#e8b3a0] py-2 border-b border-[#350812] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-[#e8b3a0] bg-[#32050e] hover:bg-[#490b19] border border-[#e8b3a0]/30 rounded-lg transition-colors"
            >
              <Instagram className="w-4 h-4" />
              <span>Ver perfil @milla.rii no Instagram</span>
            </a>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#120306] bg-gradient-to-r from-[#f5d4c8] to-[#e8b3a0] rounded-lg shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Solicitar orçamento pelo WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
