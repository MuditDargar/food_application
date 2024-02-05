import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const allMealsUrl = "https://themealdb.com/api/json/v1/1/search.php?s=";

const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const getFavoritesFromLocalStorage = () => {
  let favorites = localStorage.getItem("favourites");
  if (favorites) {
    favorites = JSON.parse(favorites);
  } else {
    favorites = [];
  }
  return favorites;
};

const AppProvider = ({ children }) => {
  const [loading, setloading] = useState(false);
  const [meals, setmeals] = useState([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [selectedMeal, setselectedMeal] = useState(null);
  const [favourites, setFavourites] = useState(getFavoritesFromLocalStorage());

  const fetchMeals = async (url) => {
    try {
      const { data } = await axios(url);
      if (data.meals) {
        setmeals(data.meals);
      } else {
        setmeals([]);
      }
    } catch (error) {
      console.log(error.response);
    }
    setloading(false);
  };

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  const selectMeal = (idMeal, favouriteMeal) => {
    // console.log("hello");
    // console.log(idMeal);
    let meal;
    if (favouriteMeal) {
      meal = favourites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    setselectedMeal(meal);
    setshowModal(true);
  };

  const closeModal = () => {
    setshowModal(false);
  };

  const addToFavourites = (idMeal) => {
    console.log(idMeal);

    const alreadyFavourite = favourites.find((meal) => meal.idMeal === idMeal);
    if (alreadyFavourite) return;
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updatedFavourites = [...favourites, meal];
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  const removeFromFavourites = (idMeal) => {
    const updatedFavourites = favourites.filter(
      (meal) => meal.idMeal !== idMeal,
    );
    setFavourites(updatedFavourites);
    localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
  };

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    if (!searchTerm) return;

    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        loading,
        meals,
        setsearchTerm,
        fetchRandomMeal,
        showModal,
        selectedMeal,
        selectMeal,
        closeModal,
        addToFavourites,
        removeFromFavourites,
        favourites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
