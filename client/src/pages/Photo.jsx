import React, { useEffect, useState } from "react";
import style from "./SCSS/Photo.module.scss";
import AddPhotoForm from "../components/addPhotoForm/AddPhotoForm.jsx";
import { getPhotos } from "../services/photoService.js";
import PhotoList from "../components/photoList/PhotoList.jsx";

const Photo = () => {
  const [photos, setPhotos] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    fetchPhotos();
  },[]);

  const fetchPhotos = async () => {
    try {
      const photos = await getPhotos();
      setPhotos(photos);
    } catch (err) {
      console.error("Error fetching photos", err);
    }
  };

  const handlePhotoAdded = () => {
    fetchPhotos();
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  }

  return (
    <div className={`${style.photo} ${isDarkMode ? style.darkMode : style.lightMode}`}>
      <label className={style.switch}>
        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
        <span className={`${style.slider} ${style.round}`}></span>
      </label>
      <AddPhotoForm onPhotoAdded={handlePhotoAdded} />
      <PhotoList photos={photos} setPhotos={setPhotos}/>
    </div>
  );
};

export default Photo;
