import React from 'react';
import plusPic from "../images/Plus.svg";
import editPic from "../images/Vector.svg";
import api from "../utils/Api";
import Card from "../components/Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);



    return (
        <main className="content page__content">
            <section className="profile page__content">
                <div className="profile__groupedit">
                    <img  src={currentUser.avatar} alt="Аватар" className="profile__avatar"/>

                    <button aria-label="edit" type="button" className="profile__avatar-edit" onClick={props.onEditAvatar}>
                        <img
                            src={editPic}
                            alt="редактировать"
                            className="profile__editpichover"
                        />
                    </button>
                </div>
                <div className="profile__info">
                    <div className="profile__group">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button aria-label="edit" type="button" className="profile__edit" onClick={props.onEditProfile}>
                            <img
                                src={editPic}
                                alt="редактировать"
                                className="profile__editpic"
                            />
                        </button>
                    </div>
                    <p className="profile__activity">{currentUser.about}</p>
                </div>
                <button type="button" className="profile__add-button"  onClick={props.onAddPlace}>
                    <img
                        src={plusPic}
                        alt="плюс"
                        className="profile__add-button-pic"
                    />
                </button>
            </section>
            <section className="elements page__content">
                { props.cards.map(item =>
                <Card
                    key = {item._id}
                    name = {item.name}
                    link = {item.link}
                    likes = {item.likes}
                    owner = {item.owner}
                    card = {{name:item.name, link:item.link, likes:item.likes,_id:item._id}}
                    onCardClick = {props.onCardClick}
                    onCardLike = {props.onCardLike}
                    onCardDelete = {props.onCardDelete}
                />)}
            </section>
        </main>
    );
}

export default Main;