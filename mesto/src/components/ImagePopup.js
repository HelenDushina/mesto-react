import React from 'react';
import closePic from "../images/CloseIcon.svg";

function ImagePopup(props) {
    return (
        <div className={`popup popup_image ${props.card.link !== '' ? 'popup_opend' : ''}`}>
        <div className="popup__imagecontainer popup__content">
            <button type="button" className="popup__close popup__closeimageform">
                <img
                    src={closePic}
                    alt="закрыть"
                    className="popup__close-icon"
                    onClick={props.onClose}
                />
            </button>
            <img
                src={props.card.link}
                alt={props.card.name}
                className="popup__image"
            />
            <h2 className="popup__text">{props.card.name}</h2>
        </div>
        </div>
    );
}
export default ImagePopup;