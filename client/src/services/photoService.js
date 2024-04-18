import { get, post, put, del } from '../utils/apiUtils';

const handleRequest = async (promise, errorMessage) => {
    try {
        return await promise;
    } catch (err) {
        console.log(errorMessage, err);
        throw err;
    }
};

const getPhotos = () => handleRequest(get('/'), 'Error fetching photos');
const savePhoto = (photoData) => handleRequest(post('/save', photoData), 'Error saving photo');
const updatePhoto = (photoData) => handleRequest(put('/update', photoData), 'Error updating photo');
const deletePhoto = (photoId) => handleRequest(del('/delete', { _id: photoId }), 'Error deleting photo');

export { getPhotos, savePhoto, updatePhoto, deletePhoto };