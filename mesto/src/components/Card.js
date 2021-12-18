
const Card = (props) => {



    function handleClick() {
        props.onCardClick(props.card);
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
            <button type="button" className="elements__button-remove"></button>
        </div>
        <div className="elements__rectangle">
            <h2 className="elements__title">{props.name}</h2>
            <div className="elements__like-group">
                <button type="button" className="elements__like"></button>
                <p className="elements__like-count">{props.likes.length}</p>
            </div>

        </div>
    </article>
    )
}

export default Card;