const Photo = require('../models/photoModel');

//Get all photos
const getAllPhotos = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = 6;
        const skip = (page - 1) * limit;
        const photos = await Photo.find().skip(skip).limit(limit);
        res.json(photos);
    } catch (err) {
        console.log('Error fetching photos', err);
        res.status(500).json({ err: 'Failed to fetch photos' });
    }
}

//Create photo
const createPhoto = async (req, res) => {
    try {
        const { title, description, photo } = req.body;
        const newPhoto = await Photo.create({ title, description, photo });
        res.status(201).json(newPhoto)
    } catch (err) {
        console.log('Error creating photos', err);
        res.status(500).json({ err: 'Failed to create photo' });
    }
};

//update photo
const updatePhoto = async (req, res) => {
    try {
        const { _id, title, description } = req.body;
        await Photo.findByIdAndUpdate(_id, { title, description });
        res.status(200).json({ message: 'Photo updated succressfully' })
    } catch (err) {
        console.error('Error updating photo:', err);
        res.status(500).json({ error: 'Failed to update photo' });
    }
};

//delete photo
const deletePhoto = async (req, res) => {
    try {
        const { _id } = req.body;
        await Photo.findByIdAndDelete(_id);
        res.status(200).json({ message: 'Photo deleted successfully' });
    } catch (err) {
        console.error('Error deleting photo:', err);
        res.status(500).json({ error: 'Failed to delete photo' });
    }
};

module.exports = {
    getAllPhotos,
    createPhoto,
    updatePhoto,
    deletePhoto
}