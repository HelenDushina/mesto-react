import React from 'react';
import closePic from "../images/CloseIcon.svg";

function PopupWithForm({title,name,children,isOpen,onClose}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opend' : ''}`}>
        <div className="popup__container popup__content">
            <button type="button" className="popup__close">
                <img
                    src={closePic}
                    alt="закрыть"
                    className="popup__close-icon"
                    onClick={onClose}
                />
            </button>
            <h2 className="popup__title">{title}</h2>
            <form className={`popup__form popup__form_${name}`} name="form-submit" noValidate>
                {children}
            </form>
        </div>
    </div>
    );
}
export default PopupWithForm;