import PopupWithForm from "./PopupWithForm";
import { useRef } from 'react';

const AddPlacePopup = ({isOpen, onClose, onAddPlace}) => {
    const inputPlaceRef = useRef(null);
    const inputLinkRef = useRef(null);


  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({name: inputPlaceRef.current.value, link: inputLinkRef.current.value,});
  };

  return (
    <PopupWithForm
      name={"add-card"}
      title={"Новое место"}
      buttonText={"Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          type="text"
          placeholder="Название"
          id="place"
          className="popup__input popup__input_place"
          name="name"
          ref={inputPlaceRef}
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__input-error name-error"></span>
      </label>
      <label className="popup__field">
        <input
          type="url"
          placeholder="Ссылка на картинку"
          id="link"
          className="popup__input popup__input_link"
          name="link"
          ref={inputLinkRef}
          required
        />
        <span className="popup__input-error link-error"></span>
      </label>
    </PopupWithForm>
  );
};

export default AddPlacePopup;
