const express = require('express');
const router = express.Router();
const upload = require('../routes/imageUpload');

const AuthController = require('../controllers/auth');

const authMiddleware = require('../middlewares/auth-middleware');

// API
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/register', AuthController.registration);
router.get('/refresh-token', AuthController.refreshToken);
router.get('/users', AuthController.getUsers);
router.delete('/user', authMiddleware, AuthController.deleteUser);
router.put('/user/image-upload', authMiddleware, upload.single('file'), AuthController.uploadImage);
router.put('/user/update-profile', authMiddleware, AuthController.updateProfile);
router.put('/user/change-password', authMiddleware, AuthController.changePassword);


module.exports = router