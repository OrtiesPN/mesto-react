import { useState, useEffect, useCallback } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isWarningPopupOpen, setWarningPopupOpen] = useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [cardToDelete, setCardToDelete] = useState();

  const [currentUser, setCurrentUser] = useState({});

  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // открытие попапов, установка слушателя на esc
  function setEscapeButtonListener() {
    document.addEventListener("keydown", closePopupByEscape);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEscapeButtonListener();
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEscapeButtonListener();
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEscapeButtonListener();
  }

  function handleCardClick(data) {
    setSelectedCard(data);
    setImagePopupOpen(true);
    setEscapeButtonListener();
  }
  // обработчики карточек
  function handleTrashClick(cardId) {
    setCardToDelete(cardId);
    setWarningPopupOpen(true);
    setEscapeButtonListener();
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    api.deleteCard(cardToDelete).then(() => {
      setCards(
        cards.filter((card) => {
          return card.id !== cardToDelete;
        })
      );
      closeAllPopups();
    }).catch((error) => console.error(`Fail to delete place: ${error}`));;
  }
  // сброс стейтов для попапов и функции их закрытия, сброс слушателя на esc
  const resetAllStates = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setWarningPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }, []);

  const closePopupByEscape = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        resetAllStates();
        document.removeEventListener("keydown", closePopupByEscape);
      }
    },
    [resetAllStates]
  );

  const closeAllPopups = useCallback(() => {
    resetAllStates();
    document.removeEventListener("keydown", closePopupByEscape);
  }, [resetAllStates, closePopupByEscape]);

  // обработчики попапов
  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.error(`Fail to update user info: ${error}`));
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => console.error(`Fail to update avatar: ${error}`));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((res) => {
        const newCard = {
          id: res._id,
          ownerId: res.owner._id,
          name: res.name,
          link: res.link,
          likes: res.likes,
        };
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.error(`Fail to add new place: ${error}`));
  }
  // загрузка изначального массива карточек и установка пользователя
  useEffect(() => {
    setIsLoading(true);
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        const cardList = cardsData.map((data) => ({
          id: data._id,
          ownerId: data.owner._id,
          name: data.name,
          link: data.link,
          likes: data.likes,
        }));
        setCards(cardList);
        setIsLoading(false);
      })
      .catch((error) => console.error(`Fail to load initial cards: ${error}`));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page__container">
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onTrashClick={handleTrashClick}
            cards={cards}
            isLoading={isLoading}
          />
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

          <PopupWithForm
            name="warning"
            title="Вы уверены ?"
            titleButton="Да"
            isOpen={isWarningPopupOpen}
            onSubmit={handleCardDelete}
            onClose={closeAllPopups}
          />

          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
