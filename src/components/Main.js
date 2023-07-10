import { useEffect, useState } from "react";
import { api } from "../utils/api";
import Card from "./Card";

export default function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name) 
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
        const cardList = cardsData.map( data => ({
          id: data._id,
          name: data.name,
          link: data.link,
          likes: data.likes
        }))
        setCards(cardList)
        // userInfo.setUserInfo({
        //   user_name: userData.name,
        //   user_info: userData.about,
        //   user_avatar: userData.avatar,
        //   user_id: userData._id,
        // });
        // userId = userInfo.getUserId();
        // cardSection.addInitialItems(cardsData);
      })
      .catch(console.error);
  }, []);
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
              src={userAvatar}
              alt="аватар пользователя"
              className="profile__avatar"
            />
          </button>
          <div className="profile__title">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="button profile__edit-btn"
              type="button"
              aria-label="Редактировать профиль"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          className="button profile__add-btn"
          type="button"
          aria-label="Добавить карточку"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="elements">
        <ul className="elements__cards">
        {cards.map(({id, ...rest}) => (
          <Card key={id} {...rest} onCardClick={props.onCardClick} />
        ))}
        </ul>
      </section>
    </main>
  );
}
// link={card.link}
          // name={card.name}
          // likes={card.likes}