import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip.js";

import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithConfirm from "./PopupWithConfirm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import { apiAuth } from "../utils/ApiAuth.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [deletedCard, setDeletedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [isAuth, setIsAuth] = useState(false);

  const [tooltipMessage, setTooltipMessage] = useState("");
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [hasToken, setHasToken] = useState(
    Boolean(localStorage.getItem("jwt"))
  );
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleConfirmCardDelete(cardId) {
    setDeletedCard(cardId);
    setIsConfirmPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard({});
    setIsTooltipOpen(false);
  }

  function handleCardLike(card, isLiked) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .toggleLike(card._id, isLiked ? "DELETE" : "PUT")
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then(() => {
        setCards(cards.filter((card) => card._id !== cardId));
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleUpdateUser(data) {
    api
      .saveUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleUpdateAvatar(data) {
    api
      .saveUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }

  function handleRegister(data) {
    apiAuth
      .register(data)
      .then(() => {
        setIsSuccess(true);
        setIsTooltipOpen(true);
        setTooltipMessage("Вы успешно зарегистрировались!");
        navigate("/sign-in");
      })
      .catch((error) => {
        setIsTooltipOpen(true);
        setIsSuccess(false);
        setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(`Ошибка: ${error}`);
      });
  }

  function handleLogin(data) {
    apiAuth
      .login(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setHasToken(true);
        setIsAuth(true);
        setIsSuccess(true);
        navigate("/sign-up");
      })
      .catch((error) => {
        setIsTooltipOpen(true);
        setIsSuccess(false);
        setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(`Ошибка: ${error}`);
      });
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsAuth(false);
    setHasToken(false);
    setUserData({});
  }
  useEffect(() => {
    if (isAuth) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
    }
  }, [isAuth]);

  useEffect(() => {
    if (hasToken) {
      apiAuth
        .checkAuth()
        .then((res) => {
          setUserData(res.data);
          setIsAuth(true);
          navigate("/");
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  }, [hasToken]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header userData={userData} isAuth={isAuth} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isAuth={isAuth}
                element={
                  <Main
                    onCardClick={handleCardClick}
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleConfirmCardDelete}
                  />
                }
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/*"
            element={<Navigate to={isAuth ? "/" : "/sign-in"} />}
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithConfirm
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onConfirm={handleCardDelete}
          deletedCard={deletedCard}
        />

        <ImagePopup
          isOpen={Object.keys(selectedCard).length}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          text={tooltipMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
