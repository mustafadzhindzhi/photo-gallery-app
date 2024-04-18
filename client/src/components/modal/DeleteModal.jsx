import style from './DeleteModal.module.scss'

const DeleteModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;
  
    return (
      <div className={style.overlay}>
        <div className={style.modal}>
          <p>Are you sure you want to delete the image?</p>
          <div className={style.buttonContainer}>
            <button onClick={onConfirm}>Confirm</button>{" "}
            <button onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteModal;
  