const express = require('express');
const path = require('path');
const app = express();

// ✅ Allow iframe embedding
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "frame-ancestors *");
  next();
});

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Fallback route to index.html for single-page apps
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ✅ Use dynamic port from Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
