const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Dar acceso a ruta public con static
app.use('/public', express.static('public'));

//Ruta public
app.get('/public', (req, res) => {
  res.redirect('/public/page.html');
});

// Ruta raíz
app.get('/', (req, res) => {
  res.redirect('/public');
});

  // Middleware básico para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '¡Algo salió mal!' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
}); 