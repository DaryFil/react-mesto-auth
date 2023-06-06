import PopupWithForm from "./PopupWithForm";
import { useRef } from 'react';

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
    const inputRef = useRef(null);
  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
        avatar: inputRef.current.value
    });
  };

  return (
    <PopupWithForm
      className={"save-avatar"}
      title={"Обновить аватар"}
      buttonText={"Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="url"
          placeholder="Ccылка на картинку"
          id="avatar"
          className="popup__input popup__input_avatar"
          name="avatar"
          ref={inputRef}
          
          required
        />
        <span className="popup__input-error avatar-error" />
      </label>
    </PopupWithForm>
  );
};
export default EditAvatarPopup;
