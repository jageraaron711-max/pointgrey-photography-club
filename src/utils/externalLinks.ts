// Helper utilities for managing and safely opening external links within iframe environments

export interface UrlPreset {
  label: string;
  labelZh: string;
  url: string;
  badge: string;
}

export const GALLERY_URL_PRESETS: UrlPreset[] = [
  {
    label: 'Unsplash Film & Street (Live Curated)',
    labelZh: 'Unsplash 胶片与街头影展 (实时高分辨率精选)',
    url: 'https://unsplash.com/t/film',
    badge: 'Recommended',
  },
  {
    label: 'Google Drive Photo Archive',
    labelZh: 'Google Drive 社团共享原片盘',
    url: 'https://drive.google.com',
    badge: 'Cloud Storage',
  },
  {
    label: 'Flickr Student Showcase',
    labelZh: 'Flickr 青年摄影师群组画廊',
    url: 'https://www.flickr.com/explore',
    badge: 'Photo Salon',
  },
  {
    label: 'Point Grey Secondary (VSB Official)',
    labelZh: '温哥华学区 Point Grey 官方网站',
    url: 'https://www.vsb.bc.ca/point-grey',
    badge: 'Campus',
  },
];

export const VAULT_URL_PRESETS: UrlPreset[] = [
  {
    label: 'Google Drive High-Speed Vault',
    labelZh: 'Google Drive 高速素材资产盘 (4K Log / RAW / SFX)',
    url: 'https://drive.google.com',
    badge: 'Recommended',
  },
  {
    label: 'Microsoft OneDrive Campus Share',
    labelZh: 'OneDrive 校园素材共享云盘',
    url: 'https://onedrive.live.com',
    badge: 'Campus VSB',
  },
  {
    label: 'GitHub Asset & LUT Repository',
    labelZh: 'GitHub 调色预设与开源拟音库',
    url: 'https://github.com',
    badge: 'Open Source',
  },
  {
    label: 'Notion Digital Asset Directory',
    labelZh: 'Notion 数字化素材索引看板',
    url: 'https://notion.so',
    badge: 'Docs & Index',
  },
];

/**
 * Robust function to open an external URL.
 * In sandboxed iframes, window.open or target="_blank" might be blocked if sandbox permissions restrict popups.
 * We attempt window.open and return true if not immediately caught.
 */
export const openExternalLinkSafely = (url: string): boolean => {
  if (!url) return false;
  let formattedUrl = url.trim();
  if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
    formattedUrl = `https://${formattedUrl}`;
  }

  try {
    const newWindow = window.open(formattedUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // Browser popup blocker or iframe sandbox intercepted
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

/**
 * Copy URL to clipboard with fallback
 */
export const copyUrlToClipboard = async (url: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
      return true;
    }
    // Fallback for older browsers or restricted permissions
    const textarea = document.createElement('textarea');
    textarea.value = url;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch {
    return false;
  }
};
