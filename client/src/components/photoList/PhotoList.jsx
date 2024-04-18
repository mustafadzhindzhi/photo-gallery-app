import React, { useEffect, useState } from "react";
import style from "./PhotoList.module.scss";
import DeleteModal from "../modal/DeleteModal.jsx";
import { FaTrash, FaEdit } from "react-icons/fa";
import { deletePhoto, updatePhoto } from "../../services/photoService.js";

const PhotoList = ({ photos, setPhotos }) => {
  const [editPhoto, setEditPhoto] = useState({
    id: null,
    title: "",
    description: "",
    photo: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [photoToDelete, setPhotoToDelete] = useState(null);

  const handlePhotoDelete = (photoId) => {
    setShowModal(true);
    setPhotoToDelete(photoId);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePhoto(photoToDelete);
      setPhotos(photos.filter((photo) => photo._id !== photoToDelete));
      setPhotoToDelete(null);
      setShowModal(false);
    } catch (err) {
      console.log("Error deleting notes:", err);
    }
  };

  const handleCancelDelete = () => {
    setPhotoToDelete(null);
    setShowModal(false);
  };

  const handleEditPhoto = (photoId, title, description, photo) => {
    setEditPhoto({ id: photoId, title, description, photo });
  };

  const handlePhoToUpdate = async () => {
    try {
      if (
        !editPhoto.title.trim() ||
        !editPhoto.description.trim()
        ||editPhoto.photo
      )
        return;
      const updatedPhotos = photos.map((photoItem) =>
        photoItem._id === editPhoto.id
          ? {
              ...photoItem,
              title: editPhoto.title,
              description: editPhoto.description,
              photo: editPhoto.photo
            }
          : photoItem
      );

      setPhotos(updatedPhotos);
      await updatePhoto({
        _id: editPhoto.id,
        title: editPhoto.title,
        description: editPhoto.description,
        photo: editPhoto.photo
      });
      setEditPhoto({ id: null, title: "", description: "", photo:null });
    } catch (err) {
      console.log("error updating photo", err);
    }
  };

  const handleCancelEdit = () => {
    setEditPhoto({ id: null, title: "", description: "", photo: null });
  };

   const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      setFormData({ ...formData, photo: base64String });
    };
    reader.readAsDataURL(file);
  };

  const handleremoveImage =() => {
    setEditPhoto({...editPhoto, photo:null})
  }

  useEffect(() => {
    if (!showModal) setPhotoToDelete(null);
  }, [showModal]);

  return (
    <div className={style["photoList"]}>
      {photos.map((photo) => (
        <div key={photo._id} className={style.photoItem}>
          {editPhoto.id === photo._id ? (
            <div className={style.editForm}>
            <input
              type="text"
              value={editPhoto.title}
              onChange={(e) => setEditPhoto({ ...editPhoto, title: e.target.value })}
              placeholder="Title"
            />
            <textarea
              value={editPhoto.description}
              onChange={(e) => setEditPhoto({ ...editPhoto, description: e.target.value })}
              placeholder="Description"
            />
            
            <button className={style.updateButton} onClick={handlePhoToUpdate}>Update</button>
            <button className={style.cancelButton} onClick={handleCancelEdit}>Cancel</button>
          </div>
          ): (
            <>
              <div className={style.title}>{photo.title}</div>
              <div className={style.image}>
                <img src={photo.photo} alt={photo.title} />
              </div>
              <div className={style.description}>{photo.description}</div>
              <div className={style.editButtonContainer}>
                <FaEdit
                  className={style.editIcon}
                  onClick={() => handleEditPhoto(photo._id, photo.title, photo.description)}
                />
                <FaTrash
                  className={style.deleteIcon}
                  onClick={() => handlePhotoDelete(photo._id)}
                />
              </div>
            </>
          )}
        </div>
      ))}
      <DeleteModal
        isOpen={showModal}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default PhotoList;
