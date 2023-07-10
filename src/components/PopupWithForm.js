export default function PopupWithForm(props) {
  return (
    <div
      className={`popup ${props.name}-popup ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__container">
        <button
          className="button popup__close-btn"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        />
        <form className="popup__form" id={`${props.name}-form`} noValidate="">
          <h3 className={`popup__title popup__title_${props.name}`}>
            {props.title}
          </h3>
          {props.children}
          <button
            className="button popup__submit-btn"
            type="submit"
            aria-labelledby="Сохранить"
            onClick={props.onClose}
          >
            {props.titleButton}
          </button>
        </form>
      </div>
    </div>
  );
}
