export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  iconLink?: string;
  size?: string;
  modifiedTime?: string;
}

export const fetchDriveFiles = async (
  accessToken: string,
  options: {
    pageSize?: number;
    query?: string;
    onlyImagesAndVideos?: boolean;
  } = {}
): Promise<DriveFile[]> => {
  const { pageSize = 20, query = '', onlyImagesAndVideos = false } = options;

  let q = "trashed = false";
  if (onlyImagesAndVideos) {
    q += " and (mimeType contains 'image/' or mimeType contains 'video/' or mimeType = 'application/vnd.google-apps.folder')";
  }
  if (query) {
    q += ` and name contains '${query.replace(/'/g, "\\'")}'`;
  }

  const params = new URLSearchParams({
    pageSize: String(pageSize),
    fields: 'files(id, name, mimeType, webViewLink, webContentLink, thumbnailLink, iconLink, size, modifiedTime)',
    orderBy: 'modifiedTime desc',
    q,
  });

  const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Erro ao carregar arquivos do Drive (${response.status})`);
  }

  const data = await response.json();
  return data.files || [];
};

export const createDriveFolder = async (
  accessToken: string,
  folderName: string
): Promise<DriveFile> => {
  const response = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Falha ao criar pasta no Drive');
  }

  return response.json();
};

export const deleteDriveFile = async (accessToken: string, fileId: string): Promise<void> => {
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Falha ao remover arquivo do Drive');
  }
};
