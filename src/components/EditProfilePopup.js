import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about
    });
  }
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  

  return (
    <PopupWithForm
      name={`profile`}
      title={`Редактировать профиль`}
      buttonText={`Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          value={name || ""}
          onChange={(event) => setName(event.target.value)}
          type="text"
          placeholder="Имя"
          //   id="name"
          className="popup__input popup__input_name"
          //   name="name"
          required
          minLength="2"
          maxLength="40"
        />

        <span className="popup__input-error name-error" />
      </label>
      <label className="popup__field">
        <input
          value={about || ""}
          onChange={(event) => setAbout(event.target.value)}
          type="text"
          placeholder="Специальность"
          id="about"
          className="popup__input popup__input_about"
          name="about"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__input-error about-error"></span>
      </label>
    </PopupWithForm>
  );
};
export default EditProfilePopup;
