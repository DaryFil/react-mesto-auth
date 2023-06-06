import PopupWithForm from "./PopupWithForm";

const PopupWithConfirm = ({ isOpen, onClose, onConfirm, deletedCard }) => {
    const handleConfirm = (event) => {
        event.preventDefault();
        onConfirm(deletedCard);
    };
return (
    <PopupWithForm
    name="delete-card"
    title="Вы уверены?"
    buttonText="Да"
    isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleConfirm}/>
);
}; 
  export default PopupWithConfirm;