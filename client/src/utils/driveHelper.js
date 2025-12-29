/**
 * Converts Google Drive share links to direct embeddable URLs
 */

// Extract file ID from various Google Drive URL formats
export function extractDriveFileId(url) {
  if (!url || typeof url !== 'string') return null;
  
  // Pattern 1: https://drive.google.com/file/d/FILE_ID/view
  const pattern1 = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  // Pattern 2: https://drive.google.com/open?id=FILE_ID
  const pattern2 = /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/;
  // Pattern 3: https://drive.google.com/uc?id=FILE_ID
  const pattern3 = /drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/;
  // Pattern 4: Already just a file ID
  const pattern4 = /^[a-zA-Z0-9_-]{20,}$/;

  let match = url.match(pattern1) || url.match(pattern2) || url.match(pattern3);
  if (match) return match[1];
  
  if (pattern4.test(url)) return url;
  
  return null;
}

// Convert Drive link to direct image URL
export function getDriveImageUrl(url) {
  if (!url) return url;
  
  const fileId = extractDriveFileId(url);
  if (fileId) {
    // Use server proxy to avoid CORS issues - need full URL for dev server
    const apiBase = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    return `${apiBase}/api/media/drive/${fileId}`;
  }
  
  // Return original URL if not a Drive link
  return url;
}

// Alternative: Using drive.google.com/uc?export=view
export function getDriveImageUrlAlt(url) {
  if (!url) return url;
  
  const fileId = extractDriveFileId(url);
  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }
  
  return url;
}

// Convert Drive link to embeddable preview URL (for iframes)
export function getDrivePreviewUrl(url) {
  if (!url) return url;
  
  const fileId = extractDriveFileId(url);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  
  return url;
}

// Check if URL is a Google Drive link
export function isDriveUrl(url) {
  if (!url) return false;
  return url.includes('drive.google.com') || extractDriveFileId(url) !== null;
}

// Convert YouTube URL to thumbnail
export function getYoutubeThumbnail(url) {
  if (!url) return null;
  
  // Pattern 1: youtube.com/watch?v=VIDEO_ID
  const pattern1 = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  // Pattern 2: youtu.be/VIDEO_ID
  const pattern2 = /youtu\.be\/([a-zA-Z0-9_-]+)/;
  // Pattern 3: youtube.com/embed/VIDEO_ID
  const pattern3 = /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;
  
  const match = url.match(pattern1) || url.match(pattern2) || url.match(pattern3);
  if (match) {
    return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
  
  return null;
}

// Get embeddable YouTube URL
export function getYoutubeEmbedUrl(url) {
  if (!url) return null;
  
  const pattern1 = /youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  const pattern2 = /youtu\.be\/([a-zA-Z0-9_-]+)/;
  const pattern3 = /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/;
  
  const match = url.match(pattern1) || url.match(pattern2) || url.match(pattern3);
  if (match) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  
  return url;
}

// Smart URL converter - detects type and converts accordingly
export function getEmbeddableImageUrl(url) {
  if (!url) return url;
  
  // Check if it's a YouTube link - return thumbnail
  const ytThumb = getYoutubeThumbnail(url);
  if (ytThumb) return ytThumb;
  
  // Check if it's a Drive link - convert to direct URL
  if (isDriveUrl(url)) {
    return getDriveImageUrl(url);
  }
  
  // Return as-is for regular URLs
  return url;
}
