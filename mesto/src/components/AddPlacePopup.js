import React from 'react';
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
            name: name,
            link: link,
        });
    }

    return (
        <PopupWithForm title='Новое место' name='add' isOpen={props.isOpen} onClose={props.onClose} buttonText = 'Создать'
                       onSubmit = {handleSubmit} isLoading = {props.isLoading} >
            <label className="popup__label" >
                <input
                    value={name} onChange={handleChangeName}
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
                    value={link} onChange={handleChangeLink}
                    type="url"
                    name="link"
                    placeholder="Ссылка на картинку"
                    className="popup__form-field popup__form-field_theme_way"
                    id="way"
                    required
                />
                <span id="way-error" className="error"></span>

            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;