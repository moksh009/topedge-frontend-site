const config = {
  apiUrl: process.env.NODE_ENV === 'production'
    ? 'https://topedge-backend.netlify.app/.netlify/functions/api'
    : 'http://localhost:3000/api',
  siteUrl: 'https://topedgeai.com'
};

export default config; 