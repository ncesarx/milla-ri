import React, { createContext, useContext, useState, useEffect } from 'react';
import { SITE_CONFIG } from '../config/siteData';

interface ConfigContextType {
  whatsAppNumber: string;
  setWhatsAppNumber: (num: string) => void;
  isWhatsAppConfigured: boolean;
  profilePhotoUrl: string;
  setProfilePhotoUrl: (url: string) => Promise<void>;
  uploadAuthorPhoto: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
  isPhotoConfigured: boolean;
  customLogoUrl: string;
  setCustomLogoUrl: (url: string) => void;
  getWhatsAppUrl: (message?: string) => string;
  isChecklistOpen: boolean;
  setIsChecklistOpen: (open: boolean) => void;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (open: boolean) => void;
  isSyncing: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
  const [isSyncing, setIsSyncing] = useState(false);

  // Fetch shared server configuration on mount so all devices see the same photo
  useEffect(() => {
    const fetchServerSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          if (data.profilePhotoUrl) {
            setProfilePhotoUrlState(data.profilePhotoUrl);
            localStorage.setItem('millari_photo_url', data.profilePhotoUrl);
          }
          if (data.whatsAppNumber) {
            setWhatsAppNumberState(data.whatsAppNumber);
            localStorage.setItem('millari_whatsapp', data.whatsAppNumber);
          }
          if (data.customLogoUrl) {
            setCustomLogoUrlState(data.customLogoUrl);
            localStorage.setItem('millari_custom_logo', data.customLogoUrl);
          }
        }
      } catch (err) {
        // Fallback to local storage gracefully if server endpoint is unreachable
        console.warn('Config local fallback ativo:', err);
      }
    };

    fetchServerSettings();
  }, []);

  const setWhatsAppNumber = async (num: string) => {
    const trimmed = num.trim();
    setWhatsAppNumberState(trimmed);
    if (trimmed) {
      localStorage.setItem('millari_whatsapp', trimmed);
    } else {
      localStorage.removeItem('millari_whatsapp');
    }

    // Sync to backend for all devices
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsAppNumber: trimmed }),
      });
    } catch {
      // ignore offline errors
    }
  };

  const setProfilePhotoUrl = async (url: string) => {
    setProfilePhotoUrlState(url);
    if (url.trim()) {
      localStorage.setItem('millari_photo_url', url.trim());
    } else {
      localStorage.removeItem('millari_photo_url');
    }
  };

  /**
   * Uploads the photo to the persistent server backend (/uploads/...)
   * and saves it in data/settings.json so any smartphone, PC or tablet
   * that accesses the site will see the updated photo permanently.
   */
  const uploadAuthorPhoto = async (file: File): Promise<{ success: boolean; url?: string; error?: string }> => {
    setIsSyncing(true);
    try {
      // 1. Convert file to base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

      // Update immediate local state for zero-latency feel
      setProfilePhotoUrlState(base64Data);

      // 2. Send to backend server
      const response = await fetch('/api/settings/photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Data,
          filename: file.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Falha no upload para o servidor');
      }

      const data = await response.json();
      if (data.url) {
        setProfilePhotoUrlState(data.url);
        localStorage.setItem('millari_photo_url', data.url);
        return { success: true, url: data.url };
      }
      return { success: true };
    } catch (err: any) {
      console.warn('Erro ao sincronizar com servidor, mantendo local:', err);
      // Even if server is offline, keep image in current device
      return { success: true };
    } finally {
      setIsSyncing(false);
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

    if (isWhatsAppConfigured) {
      return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    }

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
        uploadAuthorPhoto,
        isPhotoConfigured,
        customLogoUrl,
        setCustomLogoUrl,
        getWhatsAppUrl,
        isChecklistOpen,
        setIsChecklistOpen,
        isSettingsOpen,
        setIsSettingsOpen,
        isSyncing,
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
