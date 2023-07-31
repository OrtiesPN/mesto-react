export default function ImagePopup(props) {
    return(
        <div className={`popup image-card-popup ${props.isOpen && "popup_opened"}`} onClick={props.onClose}>
          <figure className="popup-card" onClick={(evt=> evt.stopPropagation())}>
            <button
              className="button popup__close-btn"
              type="button"
              aria-label="Закрыть"
              onClick={props.onClose}
            />
            <img className="popup-card__image" alt={props.card.name} src={props.card.link} />
            <figcaption className="popup-card__caption">{props.card.name}</figcaption>
          </figure>
        </div>
    )
}