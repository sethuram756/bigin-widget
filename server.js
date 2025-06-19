
const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config();
const app = express();

let accessToken = process.env.ZOHO_ACCESS_TOKEN;

// Allow iframe embedding
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors *");
  next();
});

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

async function refreshAccessToken() {
  try {
    const res = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
      params: {
        refresh_token: process.env.ZOHO_REFRESH_TOKEN,
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        grant_type: 'refresh_token'
      }
    });
    accessToken = res.data.access_token;
    console.log('✅ Refreshed Zoho access token');
    return accessToken;
  } catch (err) {
    console.error('❌ Failed to refresh token:', err.response?.data || err.message);
    return null;
  }
}

app.get('/products', async (req, res) => {
  if (!accessToken) {
    await refreshAccessToken();
  }
  try {
    const response = await axios.get('https://www.zohoapis.com/bigin/v2/Products?fields=Product_Category,Product_Name', {
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`
      }
    });
    res.json(response.data);
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.log('🔄 Token expired, refreshing...');
      await refreshAccessToken();
      try {
        const retryResponse = await axios.get('https://www.zohoapis.com/bigin/v2/Products?fields=Product_Category,Product_Name', {
          headers: {
            Authorization: `Zoho-oauthtoken ${accessToken}`
          }
        });
        res.json(retryResponse.data);
      } catch (retryErr) {
        console.error('🔴 Retry failed:', retryErr.response?.data || retryErr.message);
        res.status(500).json({ error: 'Failed to fetch products after retry' });
      }
    } else {
      console.error('❌ Error fetching products:', error.response?.data || error.message);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
