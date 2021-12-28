import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";


function App() {

     const [isLoading, setIsLoading] = React.useState(false);

    const [isEditProfilePopupOpen,setEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen,setAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen,setEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard,setSelectedCard] = React.useState({name:'',link:'',likes:[],_id:''});

    const [currentUser, setUser] = React.useState({name:'',about:'', avatar:'',_id:'',cohort:''});

    React.useEffect(() => {

            const responseUser = api.getUser()
                .then(res=> {
                    //отображаем инфо о пользователе
                    setUser(res);

                }).catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                });
        },[]
    );

    const [cards, setCards] = React.useState([]);


    React.useEffect(() => {
            const responce = api.getInitialCards()
                .then(initialCards=> {
                    setCards(initialCards);
                }).catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                });
        }, []
    );

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.likeCard(card._id, !isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(
            res=> {

                setCards(cards.filter(function(f) { return f._id !== card._id }));

            }).catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
    }


    function handleAddPlaceClick(e) {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick(e) {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick(e) {
        setEditProfilePopupOpen(true);
    }

    function closeAllPopups() {
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setSelectedCard({name:'',link:'',likes:[],_id:''});
    }

    function handleCardClick(card) {

        setSelectedCard(card);
    }

    function handleUpdateUser(data) {
        setIsLoading(true);
        api.editUser(data).then(res=> {
            //отображаем инфо о пользователе
            setUser(res);
            closeAllPopups();
        }).catch((err) => {
            console.log(err); // выведем ошибку в консоль
        }).finally(() => setIsLoading(false));
    }

    function handleUpdateAvatar(data) {
        setIsLoading(true);
        api.changeAvatar(data).then(res=> {
            //обновить аватар локально
            console.log(res);
            setUser(res);
            closeAllPopups();

        }).catch((err) => {
            console.log(err); // выведем ошибку в консоль
        }).finally(() => setIsLoading(false));
    }

    function handleAddPlaceSubmit(data) {
        setIsLoading(true);
        api.addCard(data).then(res=> {
            //обновить аватар локально
            console.log(res);
            setCards([res, ...cards]);
            closeAllPopups();

        }).catch((err) => {
            console.log(err); // выведем ошибку в консоль
        }).finally(() => setIsLoading(false));;
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}
              cards = {cards} onCardLike = {handleCardLike} onCardDelete = {handleCardDelete}/>
        <Footer />
        <EditProfilePopup isOpen = {isEditProfilePopupOpen} onClose = {closeAllPopups} onUpdateUser = {handleUpdateUser} isLoading = {isLoading} />}

        <AddPlacePopup isOpen = {isAddPlacePopupOpen} onClose = {closeAllPopups} onAddPlace = {handleAddPlaceSubmit} isLoading = {isLoading}/>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar = {handleUpdateAvatar} isLoading = {isLoading}/>

        <PopupWithForm title='Вы уверены?' name='delete'>
          <label className="popup__label">
            <button type="submit" className="popup__button popup__button_delete">Да</button>
          </label>
        </PopupWithForm>

        <ImagePopup card = {selectedCard} onClose={closeAllPopups}/>

      </div>
        </CurrentUserContext.Provider>

);
}

export default App;
