import PopupWithForm from "./PopupWithForm";
import React from "react";

function EditAvatarPopup(props) {

    const avatarRef = React.useRef(); // записываем объект, возвращаемый хуком, в переменную

    function handleSubmit(e) {
        e.preventDefault();
        console.log(avatarRef.current.value)

        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
    <PopupWithForm title='Обновить аватар' name='avatar' isOpen={props.isOpen} onClose={props.onClose} onSubmit = {handleSubmit}
                   buttonText='Сохранить' isLoading = {props.isLoading}>
        <label className="popup__label">
            <input
                ref={avatarRef}
                type="url"
                name="avatar"
                placeholder="Ссылка на картинку"
                className="popup__form-field popup__form-field_theme_avatar"
                id="way-avatar"
                required
            />
            <span id="way-avatar-error" className="error"></span>

        </label>
    </PopupWithForm>)
}

export default EditAvatarPopup;