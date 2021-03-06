import React from 'react';
import closePic from "../images/CloseIcon.svg";

function PopupWithForm({title,name,children,isOpen,onClose,buttonText,onSubmit,isLoading}) {

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
            <form className={`popup__form popup__form_${name}`} name={`form-${name}`} onSubmit = {onSubmit}>
                {children}
                <button type="submit" className="popup__button">{isLoading ? buttonText+'...' : buttonText}</button>
            </form>
        </div>
    </div>
    );
}
export default PopupWithForm;