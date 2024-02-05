import { useGlobalContext } from "../Context";

const Favourites = () => {
  const { favourites, removeFromFavourites, selectMeal } = useGlobalContext();
  return (
    <section className="favorites">
      <div className="favorites-content">
        <h5>Favorites</h5>
        <div className="favorites-container">
          {favourites.map((item) => {
            const { idMeal, strMeal: title, strMealThumb: image } = item;
            return (
              <div key={idMeal} className="favorite-item">
                <img
                  src={image}
                  alt={title}
                  className="favorites-img img"
                  onClick={() => selectMeal(idMeal, true)}
                />
                <button
                  className="remove-btn"
                  onClick={() => removeFromFavourites(idMeal)}
                >
                  remove
                </button>
                <h4>{title}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Favourites;
