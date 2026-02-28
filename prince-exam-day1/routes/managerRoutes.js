const express = require('express');
const router = express.Router();
const managerController = require('../controllers/managerController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, managerController.addManager);
router.get('/', verifyToken, managerController.getManagers);
router.put('/:id', verifyToken, managerController.updateManager);
router.delete('/:id', verifyToken, managerController.deleteManager);
router.get('/search', verifyToken, managerController.searchManager);
router.get('/page', verifyToken, managerController.paginateManagers);
router.post('/delete-multiple', verifyToken, managerController.deleteMultipleManagers);

module.exports = router;