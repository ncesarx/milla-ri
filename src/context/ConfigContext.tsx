import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteData';

interface ConfigContextType {
  whatsAppNumber: string;
  setWhatsAppNumber: (num: string) => void;
  isWhatsAppConfigured: boolean;
  profilePhotoUrl: string;
  setProfilePhotoUrl: (url: string) => void;
  isPhotoConfigured: boolean;
  customLogoUrl: string;
  setCustomLogoUrl: (url: string) => void;
  getWhatsAppUrl: (message?: string) => string;
  isChecklistOpen: boolean;
  setIsChecklistOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if saved in localStorage or use placeholder
  const [whatsAppNumber, setWhatsAppNumberState] = useState<string>(() => {
    return localStorage.getItem('millari_whatsapp') || '';
  });

  const [profilePhotoUrl, setProfilePhotoUrlState] = useState<string>(() => {
    return localStorage.getItem('millari_photo_url') || '/La_La.jpg';
  });

  const [customLogoUrl, setCustomLogoUrlState] = useState<string>(() => {
    return localStorage.getItem('millari_custom_logo') || '';
  });

  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const setWhatsAppNumber = (num: string) => {
    setWhatsAppNumberState(num);
    if (num.trim()) {
      localStorage.setItem('millari_whatsapp', num.trim());
    } else {
      localStorage.removeItem('millari_whatsapp');
    }
  };

  const setProfilePhotoUrl = (url: string) => {
    setProfilePhotoUrlState(url);
    if (url.trim()) {
      localStorage.setItem('millari_photo_url', url.trim());
    } else {
      localStorage.removeItem('millari_photo_url');
    }
  };

  const setCustomLogoUrl = (url: string) => {
    setCustomLogoUrlState(url);
    if (url.trim()) {
      localStorage.setItem('millari_custom_logo', url.trim());
    } else {
      localStorage.removeItem('millari_custom_logo');
    }
  };

  const isWhatsAppConfigured = Boolean(whatsAppNumber.trim().replace(/\D/g, '').length >= 10);
  const isPhotoConfigured = Boolean(profilePhotoUrl);

  const getWhatsAppUrl = (customMessage?: string): string => {
    const message = customMessage || SITE_CONFIG.defaultWhatsAppMessage;
    const cleanNumber = whatsAppNumber.replace(/\D/g, '');

    // If configured with valid number, open direct wa.me link
    if (isWhatsAppConfigured) {
      return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    }

    // If not configured, fall back to opening WhatsApp web/app with pre-filled message
    // or trigger settings prompt
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
  };

  return (
    <ConfigContext.Provider
      value={{
        whatsAppNumber,
        setWhatsAppNumber,
        isWhatsAppConfigured,
        profilePhotoUrl,
        setProfilePhotoUrl,
        isPhotoConfigured,
        customLogoUrl,
        setCustomLogoUrl,
        getWhatsAppUrl,
        isChecklistOpen,
        setIsChecklistOpen,
        isSettingsOpen,
        setIsSettingsOpen,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};
