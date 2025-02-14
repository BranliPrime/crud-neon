const express = require('express');
const router = express.Router();
const tareaController = require('../controller/tarea.controller');

router.get('/', tareaController.getAllTareas);
router.get('/:id', tareaController.getTareaById);
router.post('/', tareaController.createTarea);
router.put('/:id', tareaController.updateTarea);
router.delete('/:id', tareaController.deleteTarea);

module.exports = router;
