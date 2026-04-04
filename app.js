const express = require('express');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Recursos estáticos que usa la página
app.use('/acerca', express.static('acerca'));
app.use('/contacto', express.static('contacto'));
app.use('/style.css', express.static('style.css'));
app.use(express.static('mainpage'));
app.use('/*splat', express.static('errorpage'));



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