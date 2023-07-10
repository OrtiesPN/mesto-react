import { useState } from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from '../utils/api';

function App() {
  const[isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const[isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const[isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const[isWarningPopupOpen, setWarningPopupOpen] = useState(false);
  const[isImagePopupOpen, setImagePopupOpen] = useState(false);
  const[selectedCard, setSelectedCard] = useState({name: '', link: ''});

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(data) {
    setSelectedCard(data);
    setImagePopupOpen(true)
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setWarningPopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  return (
    <div className="App">
      <div className="page__container">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />

        <PopupWithForm name="edit-profile" title="Редактировать профиль" titleButton="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <fieldset className="popup__inputs">
            <label>
              <input
                className="popup__input"
                id="name"
                name="user_name"
                type="text"
                minLength={2}
                maxLength={40}
                placeholder="Имя"
                required=""
              />
              <span className="popup__error" id="name-error" />
            </label>
            <label>
              <input
                className="popup__input"
                id="job"
                name="user_info"
                type="text"
                minLength={2}
                maxLength={200}
                placeholder="О себе"
                required=""
              />
              <span className="popup__error" id="job-error" />
            </label>
          </fieldset>
          
        </PopupWithForm>

        <PopupWithForm name="edit-avatar" title="Обновить аватар"  titleButton="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <fieldset className="popup__inputs">
            <label>
              <input
                className="popup__input"
                id="avatar"
                name="user_avatar"
                type="url"
                placeholder="Ссылка на картинку"
                required=""
              />
              <span className="popup__error" id="avatar-error" />
            </label>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm name="add-card" title="Новое место"  titleButton="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <fieldset className="popup__inputs">
            <label>
              <input
                className="popup__input"
                id="place"
                name="card_place"
                type="text"
                minLength={2}
                maxLength={30}
                placeholder="Название"
                required=""
              />
              <span className="popup__error" id="place-error" />
            </label>
            <label>
              <input
                className="popup__input"
                id="link"
                name="card_link"
                type="url"
                placeholder="Ссылка на картинку"
                required=""
              />
              <span className="popup__error" id="link-error" />
            </label>
          </fieldset>
        </PopupWithForm>

        <PopupWithForm name="warning" title="Вы уверены ?"  titleButton="Да" isOpen={isWarningPopupOpen} onClose={closeAllPopups} />

        <ImagePopup card={selectedCard} isOpen={isImagePopupOpen} onClose={closeAllPopups}/>        
      
      </div>

    </div>
  );
}

export default App;
