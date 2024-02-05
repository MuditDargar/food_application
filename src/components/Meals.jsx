import React from "react";
import { useGlobalContext } from "../Context";
import { BsHandThumbsUp } from "react-icons/bs";

const Meals = () => {
  const { meals, loading, selectMeal,removeFromFavourites,addToFavourites } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>loading...</h4>
      </section>
    );
  }
  if (meals.length < 1) {
    return (
      <section className="section">
        <h4>No meals matched your search term. please try again</h4>
      </section>
    );
  }
  return (
    <section className="meals-section">
      {meals.map((singleMeal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;

        return (
          <article key={idMeal} className="meal-item">
            <img
              src={image}
              className="meal-image"
              onClick={() => {
                selectMeal(idMeal);
              }}
            />
            <div className="meal-details">
              <h5 className="meal-title">{title}</h5>
              <button className="like-btn" onClick={()=>addToFavourites(idMeal)} >
                <BsHandThumbsUp />
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Meals;
