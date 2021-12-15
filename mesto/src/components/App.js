import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';



function App() {

    const [isEditProfilePopupOpen,setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen,setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen,setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard,setSelectedCard] = React.useState({name:'',link:''});

    function handleAddPlaceClick(e) {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick(e) {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick(e) {
        setEditProfilePopupOpen(true);
    }

    function closeAllPopups(e) {
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setSelectedCard({name:'',link:''});
    }

    function handleCardClick(card) {

        setSelectedCard(card);
    }

    return (
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
        <Footer />
        <PopupWithForm title='Редактировать профиль' name='edit' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <label className="popup__label">
          <input
              type="text"
              name="name"
              placeholder="Имя"
              className="popup__form-field popup__form-field_theme_name"
              required
              minLength="2"
              maxLength="40"
              id="name"
              autoComplete="off"
          />
          <span id="name-error" className="error"></span>
          <input
              type="text"
              name="activity"
              placeholder="Вид деятельности"
              className="popup__form-field popup__form-field_theme_activity"
              required
              minLength="2"
              maxLength="200"
              id="activity"
              autoComplete="off"
          />
          <span id="activity-error" className="error"></span>
          <button type="submit" className="popup__button">Сохранить</button>
        </label>
        </PopupWithForm>

        <PopupWithForm title='Новое место' name='add' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <label className="popup__label" >
            <input
                type="text"
                name="name"
                placeholder="Название"
                className="popup__form-field popup__form-field_theme_name"
                id="place-name"
                minLength="2"
                maxLength="40"
                autoComplete="off"
                required
            />
            <span id="place-name-error" className="error"></span>
            <input
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                className="popup__form-field popup__form-field_theme_way"
                id="way"
                required
            />
            <span id="way-error" className="error"></span>
            <button type="submit" className="popup__button">Создать</button>
          </label>
        </PopupWithForm>

        <PopupWithForm title='Обновить аватар' name='avatar' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <label className="popup__label">
            <input
                type="url"
                name="avatar"
                placeholder="Ссылка на картинку"
                className="popup__form-field popup__form-field_theme_avatar"
                id="way-avatar"
                required
            />
            <span id="way-avatar-error" className="error"></span>
            <button type="submit" className="popup__button">Сохранить</button>
          </label>
        </PopupWithForm>

        <PopupWithForm title='Вы уверены?' name='delete'>
          <label className="popup__label">
            <button type="submit" className="popup__button popup__button_delete">Да</button>
          </label>
        </PopupWithForm>

        <ImagePopup card = {selectedCard} onClose={closeAllPopups}/>

      </div>


);
}

export default App;
