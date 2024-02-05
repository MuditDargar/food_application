import { useGlobalContext } from "../Context";

const Model = () => {
  const { selectedMeal, closeModal } = useGlobalContext();

  const {
    strMealThumb: image,
    strMeal: title,
    strInstructions: text,
    strSource: source,
  } = selectedMeal;
  return (
    <aside className="modal-overlay">
      <div className="modal-container">
        <img src={image} alt={title} className="img modal-img" />
        <button onClick={closeModal}> close</button>
        <h4>{title}</h4>
        <p>Cooking Instructions</p>
        <p>{text}</p>
        <a href={source} target="_blank">
          Original Source
        </a>
        <div className="modal-content"></div>
      </div>
    </aside>
  );
};
export default Model;
