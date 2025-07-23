// app.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Route utama
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Route untuk menambahkan dua angka dari query parameter
// app.get('/add', (req, res) => {
//   const a = parseFloat(req.query.a);
//   const b = parseFloat(req.query.b);
  
//   if (isNaN(a) || isNaN(b)) {
//     return res.status(400).json({ error: 'Invalid numbers' });
//   }
  
//   const result = a + b;
//   res.json({ result });
// });

// Route dengan sedikit potensi error untuk analisis SonarQube
app.get('/divide', (req, res) => {
  const numerator = parseFloat(req.query.numerator);
  const denominator = parseFloat(req.query.denominator);

  if (isNaN(numerator) || isNaN(denominator)) {
    return res.status(400).json({ error: 'Invalid numbers' });
  }
  // BUG: pembagian dengan nol tidak ditangani dengan baik
  const result = numerator / denominator;

  if (!isFinite(result)) {
    // tidak pernah terjadi karena result / 0 akan Infinity
    return res.status(400).json({ error: 'Division by zero' });
  }

  res.json({ result });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
