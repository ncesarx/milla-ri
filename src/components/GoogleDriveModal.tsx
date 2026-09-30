import React, { useState, useEffect } from 'react';
import {
  X,
  HardDrive,
  RefreshCw,
  Folder,
  Image as ImageIcon,
  Video,
  FileText,
  ExternalLink,
  LogOut,
  FolderPlus,
  Trash2,
  AlertTriangle,
  Search,
  CheckCircle,
} from 'lucide-react';
import { User } from 'firebase/auth';
import {
  initAuth,
  googleSignIn,
  logoutGoogle,
  getAccessToken,
} from '../services/googleDriveAuth';
import {
  DriveFile,
  fetchDriveFiles,
  createDriveFolder,
  deleteDriveFile,
} from '../services/googleDriveApi';

interface GoogleDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage?: (imageUrl: string, fileName: string) => void;
}

export const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [files, setFiles] = useState<DriveFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMediaOnly, setFilterMediaOnly] = useState(true);

  // New folder dialog
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  // Delete confirmation dialog (MANDATORY for mutating operations)
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen && accessToken) {
      loadFiles(accessToken);
    }
  }, [isOpen, accessToken, filterMediaOnly]);

  const loadFiles = async (token: string) => {
    setIsLoadingFiles(true);
    setFileError(null);
    try {
      const result = await fetchDriveFiles(token, {
        onlyImagesAndVideos: filterMediaOnly,
        query: searchQuery,
      });
      setFiles(result);
    } catch (err: any) {
      setFileError(err.message || 'Erro ao carregar arquivos do Drive.');
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleSignIn = async () => {
    setIsAuthenticating(true);
    setAuthError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
        loadFiles(res.accessToken);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Falha ao autenticar com Google Drive.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleSignOut = async () => {
    await logoutGoogle();
    setUser(null);
    setAccessToken(null);
    setFiles([]);
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim() || !accessToken) return;

    setIsCreatingFolder(true);
    try {
      await createDriveFolder(accessToken, newFolderName.trim());
      setNewFolderName('');
      setShowNewFolderModal(false);
      loadFiles(accessToken);
    } catch (err: any) {
      alert(`Erro: ${err.message}`);
    } finally {
      setIsCreatingFolder(false);
    }
  };

  const confirmDeleteFile = async () => {
    if (!fileToDelete || !accessToken) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(accessToken, fileToDelete.id);
      setFileToDelete(null);
      loadFiles(accessToken);
    } catch (err: any) {
      alert(`Erro ao excluir: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType === 'application/vnd.google-apps.folder') {
      return <Folder className="w-5 h-5 text-amber-400" />;
    }
    if (mimeType.startsWith('image/')) {
      return <ImageIcon className="w-5 h-5 text-rose-400" />;
    }
    if (mimeType.startsWith('video/')) {
      return <Video className="w-5 h-5 text-purple-400" />;
    }
    return <FileText className="w-5 h-5 text-stone-300" />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#1c040a] border border-[#e8b3a0]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8b3a0]/20 bg-[#28060f]/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#4e0c1b] to-[#25040b] border border-[#e8b3a0]/30 text-[#e8b3a0]">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-editorial text-xl text-white font-medium flex items-center gap-2">
                Google Drive - Mídias & Arquivos
              </h3>
              <p className="text-xs text-[#e8b3a0]/80">
                Acesse fotos brutas, vídeos e pastas de produções diretamente da sua conta Google
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#e8b3a0]/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!user ? (
            /* Login required screen */
            <div className="py-12 px-4 text-center max-w-md mx-auto space-y-6">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#350712] border border-[#e8b3a0]/30 flex items-center justify-center text-[#e8b3a0]">
                <HardDrive className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-editorial text-white">Conectar com o Google Drive</h4>
                <p className="text-xs text-[#f4ece8]/75 leading-relaxed">
                  Faça login com a sua conta Google com permissão para visualizar, organizar e carregar fotos e vídeos produzidos para a MILLARI.
                </p>
              </div>

              {authError && (
                <div className="p-3 bg-red-950/60 border border-red-500/30 rounded-lg text-xs text-red-200">
                  {authError}
                </div>
              )}

              {/* Official Google Sign-in Styled Button */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleSignIn}
                  disabled={isAuthenticating}
                  className="flex items-center gap-3 bg-white hover:bg-stone-50 active:bg-stone-100 text-stone-800 font-medium text-sm px-6 py-3 rounded-xl border border-stone-300 shadow-md transition-all disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-5 h-5" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                  </svg>
                  <span>{isAuthenticating ? 'Conectando...' : 'Fazer login com Google'}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Authenticated view */
            <div className="space-y-4">
              {/* User Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-[#25040b]/80 border border-[#e8b3a0]/15">
                <div className="flex items-center gap-3">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-[#e8b3a0]/40" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#4e0c1b] text-white flex items-center justify-center text-xs font-bold">
                      {user.displayName?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-medium text-white">{user.displayName || 'Usuário Google'}</p>
                    <p className="text-[11px] text-[#e8b3a0]/70">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowNewFolderModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#e8b3a0] bg-[#3a0814] hover:bg-[#520c1d] border border-[#e8b3a0]/25 rounded-lg transition-colors"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>Nova Pasta</span>
                  </button>

                  <button
                    onClick={() => accessToken && loadFiles(accessToken)}
                    disabled={isLoadingFiles}
                    className="p-2 text-[#e8b3a0]/80 hover:text-white bg-[#3a0814] hover:bg-[#520c1d] rounded-lg border border-[#e8b3a0]/20 transition-colors"
                    title="Atualizar lista"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingFiles ? 'animate-spin' : ''}`} />
                  </button>

                  <button
                    onClick={handleSignOut}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-rose-300 hover:text-rose-100 hover:bg-rose-950/40 rounded-lg transition-colors border border-rose-500/20"
                    title="Desconectar"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sair</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (accessToken) loadFiles(accessToken);
                  }}
                  className="relative flex-1"
                >
                  <Search className="w-4 h-4 text-[#e8b3a0]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar arquivos ou pastas..."
                    className="w-full bg-[#150207] border border-[#e8b3a0]/20 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-[#e8b3a0]/40 focus:outline-none focus:border-[#e8b3a0]/60"
                  />
                </form>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-xs text-[#e8b3a0]/80 cursor-pointer select-none bg-[#25040b] px-3 py-2 rounded-xl border border-[#e8b3a0]/15">
                    <input
                      type="checkbox"
                      checked={filterMediaOnly}
                      onChange={(e) => setFilterMediaOnly(e.target.checked)}
                      className="accent-[#d69580] rounded"
                    />
                    <span>Fotos & Vídeos apenas</span>
                  </label>
                </div>
              </div>

              {/* Notification banner */}
              {copiedNotification && (
                <div className="p-2.5 bg-emerald-950/70 border border-emerald-500/30 rounded-lg text-xs text-emerald-200 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{copiedNotification}</span>
                </div>
              )}

              {/* Error state */}
              {fileError && (
                <div className="p-3 bg-red-950/60 border border-red-500/30 rounded-lg text-xs text-red-200">
                  {fileError}
                </div>
              )}

              {/* Files Grid / List */}
              {isLoadingFiles ? (
                <div className="py-16 text-center space-y-3">
                  <RefreshCw className="w-7 h-7 text-[#e8b3a0] animate-spin mx-auto" />
                  <p className="text-xs text-[#e8b3a0]/70">Carregando seus arquivos do Google Drive...</p>
                </div>
              ) : files.length === 0 ? (
                <div className="py-16 text-center space-y-2 border border-dashed border-[#e8b3a0]/20 rounded-2xl">
                  <HardDrive className="w-8 h-8 text-[#e8b3a0]/40 mx-auto" />
                  <p className="text-sm text-white font-medium">Nenhum arquivo encontrado</p>
                  <p className="text-xs text-[#f4ece8]/60 max-w-sm mx-auto">
                    Não encontramos itens compatíveis ou a pasta está vazia. Você pode criar uma nova pasta para organizar as fotos da Millari.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="group relative p-3 rounded-xl bg-[#22040a]/90 hover:bg-[#2e0610] border border-[#e8b3a0]/15 hover:border-[#e8b3a0]/40 transition-all flex flex-col justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-[#140206] border border-[#e8b3a0]/20 shrink-0">
                          {getFileIcon(file.mimeType)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-white truncate" title={file.name}>
                            {file.name}
                          </p>
                          <p className="text-[10px] text-[#e8b3a0]/60 mt-0.5">
                            {file.mimeType.split('/').pop() || 'arquivo'}
                          </p>
                        </div>
                      </div>

                      {/* Thumbnail if available */}
                      {file.thumbnailLink && (
                        <div className="mt-2 relative aspect-video rounded-lg overflow-hidden bg-black/40 border border-[#e8b3a0]/10">
                          <img
                            src={file.thumbnailLink}
                            alt={file.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-3 pt-2 border-t border-[#e8b3a0]/10 flex items-center justify-between gap-1 text-[11px]">
                        <div className="flex items-center gap-1.5">
                          {file.webViewLink && (
                            <a
                              href={file.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#e8b3a0] hover:text-white flex items-center gap-1 p-1 hover:bg-white/5 rounded"
                              title="Abrir no Google Drive"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              <span>Abrir</span>
                            </a>
                          )}

                          {onSelectImage && file.mimeType.startsWith('image/') && (
                            <button
                              type="button"
                              onClick={() => {
                                const directUrl = `https://drive.google.com/uc?export=view&id=${file.id}`;
                                onSelectImage(directUrl, file.name);
                                setCopiedNotification(`Foto "${file.name}" selecionada com sucesso!`);
                                setTimeout(() => setCopiedNotification(null), 3000);
                              }}
                              className="text-xs px-2 py-0.5 bg-[#4e0c1b] text-white hover:bg-[#721127] rounded transition-colors"
                            >
                              Usar Foto
                            </button>
                          )}
                        </div>

                        {/* Mandatory explicit confirmation trigger for destructive delete */}
                        <button
                          type="button"
                          onClick={() => setFileToDelete(file)}
                          className="text-rose-400/60 hover:text-rose-300 p-1 hover:bg-rose-950/40 rounded transition-colors"
                          title="Excluir arquivo do Drive"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#e8b3a0]/20 bg-[#160207] flex items-center justify-between text-xs text-[#e8b3a0]/70">
          <span>Integração Google Workspace Drive API v3</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#29050e] hover:bg-[#3d0815] text-[#f4ece8] transition-colors border border-[#e8b3a0]/20"
          >
            Fechar
          </button>
        </div>
      </div>

      {/* Mandatory Modal: User Confirmation for Destructive Delete */}
      {fileToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-[#22040a] border border-rose-500/40 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2.5 rounded-full bg-rose-950/80 border border-rose-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-editorial text-white">Confirmar Exclusão</h4>
            </div>

            <p className="text-xs text-[#f4ece8]/80 leading-relaxed">
              Tem certeza de que deseja excluir permanentemente o arquivo{' '}
              <strong className="text-white font-medium">"{fileToDelete.name}"</strong> do seu Google Drive?
              Essa ação não poderá ser desfeita.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-medium text-[#f4ece8] hover:bg-white/10 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmDeleteFile}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-medium text-white bg-rose-700 hover:bg-rose-600 rounded-xl shadow-lg transition-colors flex items-center gap-1.5"
              >
                {isDeleting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>{isDeleting ? 'Excluindo...' : 'Excluir do Drive'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Folder Modal */}
      {showNewFolderModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <form
            onSubmit={handleCreateFolder}
            className="w-full max-w-md bg-[#22040a] border border-[#e8b3a0]/30 rounded-2xl p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center gap-3 text-[#e8b3a0]">
              <FolderPlus className="w-6 h-6" />
              <h4 className="text-lg font-editorial text-white">Criar Nova Pasta no Drive</h4>
            </div>

            <p className="text-xs text-[#f4ece8]/75">
              Informe o nome da pasta (ex: "Produções Millari 2026"):
            </p>

            <input
              type="text"
              required
              autoFocus
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Nome da pasta"
              className="w-full bg-[#150207] border border-[#e8b3a0]/30 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-[#e8b3a0]/40 focus:outline-none focus:border-[#e8b3a0]"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowNewFolderModal(false)}
                disabled={isCreatingFolder}
                className="px-4 py-2 text-xs font-medium text-[#f4ece8] hover:bg-white/10 rounded-xl transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isCreatingFolder || !newFolderName.trim()}
                className="px-4 py-2 text-xs font-semibold text-[#120306] bg-[#d69580] hover:bg-[#e8b3a0] rounded-xl shadow-md transition-colors"
              >
                {isCreatingFolder ? 'Criando...' : 'Criar Pasta'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
