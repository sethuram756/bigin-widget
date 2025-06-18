const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Backend connected successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});