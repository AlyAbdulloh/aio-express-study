const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const authorizationMiddleware = require('../middlewares/authMiddleware');

router.get('/', authorizationMiddleware(['admin']) ,controller.getUsers);
router.get('/:id', authorizationMiddleware(['admin']), controller.getUserById);
router.get('/search/:username', controller.search);
router.post('/', authorizationMiddleware(['admin']), controller.store);
router.put('/:id', authorizationMiddleware(['admin']), controller.update);
router.delete('/:id', authorizationMiddleware(['admin']), controller.destroy);

module.exports = router;