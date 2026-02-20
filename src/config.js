const isProduction = process.env.NODE_ENV === 'production';

const config = {
  apiUrl: isProduction
    ? 'https://topedge-backend.netlify.app/api'
    : 'http://localhost:3001/api',
  siteUrl: 'https://topedgeai.com'
};

export default config; 
