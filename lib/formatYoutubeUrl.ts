export function formatYoutubeUrl(url: string): string {
  if (!url) return '';
  if (url.includes('youtube.com/embed/')) return url;

  try {
    const urlObj = new URL(url);
    let videoId = '';

    if (urlObj.hostname.includes('youtube.com')) {
      if (urlObj.pathname.includes('/watch')) {
        videoId = urlObj.searchParams.get('v') || '';
      } else if (urlObj.pathname.startsWith('/shorts/')) {
        videoId = urlObj.pathname.split('/shorts/')[1];
      }
    } else if (urlObj.hostname === 'youtu.be' || urlObj.hostname === 'www.youtu.be') {
      videoId = urlObj.pathname.substring(1); 
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  } catch (e) {
    // If URL parsing fails, return original
  }

  return url;
}
