import success from "../images/success.svg";
import fail from "../images/fail.svg";

const InfoTooltip = ({ onClose, isOpen, isSuccess, text }) => {
  return (
    <div className={`popup popup__inform ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <img
          className="popup__inform-image"
          src={isSuccess ? success : fail}
          alt="регистрация"
        />
        <h2 className="popup__title popup__title_inform">{text}</h2>
        <button
          className="popup__button-close opacity"
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
export default InfoTooltip;
