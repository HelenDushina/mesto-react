import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = (props) => {

    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `elements__button-remove ${isOwn ? '' : 'elements__button-remove_disactivate'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `elements__like ${isLiked ? 'elements__like_active' : ''}`

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
    <article className="elements__group">
        <div className="elements__image-group">
            <img
                src={props.link}
                alt={props.name}
                className="elements__image"
                onClick={handleClick}

            />
            <button type="button" className={cardDeleteButtonClassName} onClick = {handleDeleteClick}></button>
        </div>
        <div className="elements__rectangle">
            <h2 className="elements__title">{props.name}</h2>
            <div className="elements__like-group">
                <button type="button" className={cardLikeButtonClassName} onClick = {handleLikeClick}></button>
                <p className="elements__like-count">{props.likes.length}</p>
            </div>

        </div>
    </article>
    )
}

export default Card;