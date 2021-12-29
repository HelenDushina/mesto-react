
import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }


    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser,props.isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm title='Редактировать профиль' name='edit' isOpen={props.isOpen} onClose={props.onClose} buttonText = 'Сохранить'
                       onSubmit = {handleSubmit} isLoading = {props.isLoading}>
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
                    value={name} onChange={handleChangeName}
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
                    value={description} onChange={handleChangeDescription}
                />
                <span id="activity-error" className="error"></span>

            </label>
        </PopupWithForm>
    );
}
 export default EditProfilePopup;