import React from 'react';
import plusPic from "../images/Plus.svg";
import editPic from "../images/Vector.svg";
import api from "../utils/Api";
import Card from "../components/Card";



function Main(props) {

    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {

        const responseUser = api.getUser()
            .then(res=> {
                //отображаем инфо о пользователе
                setUserName(res.name);
                setUserDescription(res.about);
                setUserAvatar(res.avatar);
            }).catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
        },[]
    );

    React.useEffect(() => {
        const responce = api.getInitialCards()
            .then(initialCards=> {
               setCards(initialCards);
            }).catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
        }, []
    );


    return (
        <main className="content page__content">
            <section className="profile page__content">
                <div className="profile__groupedit">
                    <img  src={userAvatar} alt="Аватар" className="profile__avatar"/>

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
                        <h1 className="profile__name">{userName}</h1>
                        <button aria-label="edit" type="button" className="profile__edit" onClick={props.onEditProfile}>
                            <img
                                src={editPic}
                                alt="редактировать"
                                className="profile__editpic"
                            />
                        </button>
                    </div>
                    <p className="profile__activity">{userDescription}</p>
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
                { cards.map(item =>
                <Card
                    key = {item._id}
                    name = {item.name}
                    link = {item.link}
                    likes = {item.likes}
                    card = {{name:item.name, link:item.link}}
                    onCardClick = {props.onCardClick}
                />)}
            </section>
        </main>
    );
}

export default Main;