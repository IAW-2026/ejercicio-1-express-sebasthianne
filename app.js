const express = require('express');
const fs = require('fs');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Recursos estáticos que usa la página
app.use('/acerca', express.static('acerca'));
app.use('/contacto', express.static('contacto'));
app.use('/style.css', express.static('style.css'));
app.use(express.static('mainpage'));

// Ruta para manejar el formulario de contacto
app.post('/contacto', (req, res) => {
  const name = req.body.nombre;
  const message = req.body.mensaje;
  const resultsPagePath = __dirname + '/contacto/results.html';
  // Aquí podría guardar el mensaje en una base de datos o enviarlo por correo electrónico
  let html = fs.readFileSync(resultsPagePath, 'utf8');
  html = html.replace('{{name}}', name).replace('{{message}}', message);
  res.send(html);
});

// Retornar 404 para recursos inexistentes
app.get('/*splat', (req, res) => {
  res.status(404).json({ error: '¡Recurso no encontrado!' });
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