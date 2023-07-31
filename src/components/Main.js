import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Loader from "./loader/Loader";

export default function Main(props) {
  const currentUser = useContext(CurrentUserContext)
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <button
            className="button profile__avatar-btn"
            type="button"
            onClick={props.onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              alt="аватар пользователя"
              className="profile__avatar"
            />
          </button>
          <div className="profile__title">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="button profile__edit-btn"
              type="button"
              aria-label="Редактировать профиль"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="button profile__add-btn"
          type="button"
          aria-label="Добавить карточку"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        {props.isLoading? <Loader /> : 
        <ul className="elements__cards">
        {props.cards.map(({id, ...rest}) => (
          <Card key={id}
           cardId={id}
           {...rest} 
           onCardClick={props.onCardClick} 
           onTrashClick={props.onTrashClick}/>
        ))}
        </ul>}
      </section>
    </main>
  );
}