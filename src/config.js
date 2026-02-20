const isProduction = process.env.NODE_ENV === 'production';

const config = {
  apiUrl: isProduction
    ? 'https://topedge-backend-site-1.onrender.com/api'
    : 'http://localhost:3001/api',
  siteUrl: 'https://topedgeai.com'
};

export default config; 
