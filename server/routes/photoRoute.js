const { Router } = require('express');
const { getAllPhotos, createPhoto, updatePhoto, deletePhoto } = require('../controllers/photoController');
const router = Router();

router.get('/', getAllPhotos);
router.post('/save', createPhoto);
router.put('/update', updatePhoto);
router.delete('/delete', deletePhoto)

module.exports = router;
