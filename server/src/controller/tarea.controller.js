const Tarea = require('../models/tarea.model');

const getAllTareas = async (req, res) => {
  try {
    const tareas = await Tarea.getAll();
    res.json(tareas);
  } catch (error) {
    console.error(' Error en getAllTareas:', error);
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
};

const getTareaById = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.getById(id);
    if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (error) {
    console.error(' Error en getTareaById:', error);
    res.status(500).json({ message: 'Error al obtener la tarea' });
  }
};

const createTarea = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;
    if (!titulo || !descripcion) {
      return res.status(400).json({ message: 'Título y descripción son requeridos' });
    }

    const nuevaTarea = await Tarea.create(titulo, descripcion);
    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error(' Error en createTarea:', error);
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
};

const updateTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;

    const tareaActualizada = await Tarea.update(id, titulo, descripcion);
    if (!tareaActualizada) return res.status(404).json({ message: 'Tarea no encontrada' });

    res.json(tareaActualizada);
  } catch (error) {
    console.error('Error en updateTarea:', error);
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
};

const deleteTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const tareaEliminada = await Tarea.delete(id);
    if (!tareaEliminada) return res.status(404).json({ message: 'Tarea no encontrada' });

    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error('Error en deleteTarea:', error);
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
};

module.exports = {
  getAllTareas,
  getTareaById,
  createTarea,
  updateTarea,
  deleteTarea
};
