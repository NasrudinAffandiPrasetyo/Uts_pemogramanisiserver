const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usersController');

router.get('/', ctrl.list);
router.get('/new', ctrl.newForm);
router.post('/', ctrl.create);
router.get('/:id/edit', ctrl.editForm);
router.put('/:id', ctrl.update);       // Ganti ini
router.delete('/:id', ctrl.remove);    // Ganti ini

module.exports = router;
