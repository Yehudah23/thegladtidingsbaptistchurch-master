const PRODUCTION_FALLBACK_API = 'https://gladtidingschurchapi.loca.lt';
const DEVELOPMENT_FALLBACK_API = 'http://127.0.0.1:8001';

const isPlaceholderValue = (value = '') => {
  const normalized = String(value).toLowerCase();
  return (
    normalized.includes('your_backend_domain') ||
    normalized.includes('your-backend-domain') ||
    normalized.includes('your-backend') ||
    normalized.includes('localhost')
  );
};

const rawEnvApiBase = process.env.VUE_APP_API_BASE_URL;
const resolvedFallback = process.env.NODE_ENV === 'production'
  ? PRODUCTION_FALLBACK_API
  : DEVELOPMENT_FALLBACK_API;

const API_BASE_URL = rawEnvApiBase && !isPlaceholderValue(rawEnvApiBase)
  ? rawEnvApiBase
  : resolvedFallback;

// Log the API URL for debugging - shows in browser console
if (typeof window !== 'undefined') {
  console.log(`[API Configuration] Using backend: ${API_BASE_URL}`);
}

export const API_ENDPOINTS = {

  ADMIN_LOGIN: `${API_BASE_URL}/api/admin/login`,
  ADMIN_LOGOUT: `${API_BASE_URL}/api/admin/logout`,
  ADMIN_VERIFY: `${API_BASE_URL}/api/admin/verify`,
  ADMIN_CHANGE_PASSWORD: `${API_BASE_URL}/api/admin/change-password`,

  SERMONS: `${API_BASE_URL}/api/sermons`,
  SERMON_BY_ID: (id) => `${API_BASE_URL}/api/sermons/${id}`,
  SERMON_UPLOAD: `${API_BASE_URL}/api/admin/sermons`,
  SERMON_DELETE: (id) => `${API_BASE_URL}/api/admin/sermons/${id}`,
  SERMON_UPDATE: (id) => `${API_BASE_URL}/api/admin/sermons/${id}`,
  

  BLOGS: `${API_BASE_URL}/api/blogs`,
  BLOG_BY_ID: (id) => `${API_BASE_URL}/api/blogs/${id}`,
  BLOG_ADMIN: `${API_BASE_URL}/api/admin/blogs`,
  BLOG_CREATE: `${API_BASE_URL}/api/admin/blogs`,
  BLOG_UPDATE: (id) => `${API_BASE_URL}/api/admin/blogs/${id}`,
  BLOG_DELETE: (id) => `${API_BASE_URL}/api/admin/blogs/${id}`,
  

  CONTACT: `${API_BASE_URL}/api/contact`,
  
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_BASE_URL;
