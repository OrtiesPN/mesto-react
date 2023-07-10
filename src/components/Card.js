export default function Card(props) {
  function handleClick() {
    props.onCardClick({name: props.name, link: props.link})
  } 
  return (
    <li className="card">
      <button
        className="button card__delete-btn"
        type="button"
        aria-label="Удалить"
      />
      <img src={props.link} alt={props.name} className="card__image" onClick={handleClick} />
      <div className="card__description">
        <h2 className="card__title">{props.name}</h2>
        <div className="card__likes">
          <button
            className="button card__like-btn"
            type="button"
            aria-label="Нравится!"
          />
          <span className="card__likes-counter">{props.likes.length}</span>
        </div>
      </div>
    </li>
  );
}
