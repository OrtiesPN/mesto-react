import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { api } from "../utils/api";

export default function Card( props ) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = currentUser._id === props.ownerId;
  const [isLiked, setIsLiked] = useState(false);
  const [counterLikes, setCounterLikes] = useState(props.likes.length);

  useEffect(()=> {
    setIsLiked(props.likes.some(like => like._id === currentUser._id))
  }, [props.likes, currentUser._id]);

  function handleLikeClick() {
    if (isLiked) {
      api.dislikeCard(props.cardId).then(res => {
        setIsLiked(false)
        setCounterLikes(res.likes.length)
      })
    } else {
      api.likeCard(props.cardId).then(res => {
        setIsLiked(true)
        setCounterLikes(res.likes.length)
      })
    }
  }

  function handleClick() {
    props.onCardClick({name: props.name, link: props.link})
  }
  
  return (
    <li className="card">
      {isOwner && <button
        className="button card__delete-btn"
        type="button"
        aria-label="Удалить"
        onClick={()=>{props.onTrashClick(props.cardId)}}
      />}
      
      <img src={props.link} alt={props.name} className="card__image" onClick={handleClick} />
      <div className="card__description">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__likes">
          <button
            className={`button card__like-btn ${isLiked && 'card__like-btn_active'}`}
            type="button"
            aria-label="Нравится!"
            onClick={handleLikeClick}
          />
          <span className="card__likes-counter">{counterLikes}</span>
        </div>
      </div>
    </li>
  );
}
