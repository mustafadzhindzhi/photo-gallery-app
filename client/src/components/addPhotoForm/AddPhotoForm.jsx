import React, { useState } from "react";
import style from "./AddPhotoForm.module.scss";
import { savePhoto } from "../../services/photoService.js";

const AddPhotoForm = ({ onPhotoAdded }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photo: null,
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, description, photo } = formData;
    if (!title.trim() || !description.trim() || !photo) {
      setError("Please fill all fileds");
      return;
    }
    try {
      await savePhoto({ title, description, photo });
      onPhotoAdded();
      setFormData({ title: "", description: "", photo: null });
      setError(null);
    } catch (err) {
      console.log("Error saving photo", err);
      setError("Failed to save photo. Please try again later");
    }
  };

  return (
    <form className={style["form"]} onSubmit={handleSubmit}>
      <div className={style["inputContainer"]}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className={style["inputContainer"]}>
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className={style["inputContainer"]}>
        <label>Choose Photo:</label>
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
      </div>
      {formData.photo && (
        <div className={style["imageContainer"]}>
          <div className={style["imagePreview"]}>
            <img src={formData.photo} alt="Uploaded" />
          </div>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, photo: null })}
          >
            Remove
          </button>
        </div>
      )}
      <button type="submit">Submit</button>
      {error && <p className={style.errorMessage}>{error}</p>}
    </form>
  );
};

export default AddPhotoForm;
