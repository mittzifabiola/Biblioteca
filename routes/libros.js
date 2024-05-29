const express = require('express');
const router = express.Router();
const Libro = require('../models/libro');

// Crear un nuevo libro
router.post('/', async (req, res) => {
  const nuevoLibro = new Libro(req.body);
  try {
    const libroGuardado = await nuevoLibro.save();
    res.status(201).json(libroGuardado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Obtener todos los libros
router.get('/', async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener un libro por ID
router.get('/:id', async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json(libro);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Actualizar un libro
router.put('/:id', async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    libro.nombre = req.body.nombre;
    libro.autor = req.body.autor;
    libro.precio = req.body.precio;
    const libroActualizado = await libro.save();
    res.json(libroActualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un libro
router.delete('/:id', async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }
    await libro.deleteOne();  // Cambiado de .remove() a .deleteOne()
    res.json({ message: 'Libro eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
