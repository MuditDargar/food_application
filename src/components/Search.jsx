import { useState } from "react";
import { useGlobalContext } from "../Context";
const Search = () => {
  const [text, settext] = useState("");
  const { setsearchTerm, fetchRandomMeal } = useGlobalContext();
  const handlechange = (e) => {
    settext(e.target.value);
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (text) {
      setsearchTerm(text);
    }
  };
  const handleRandomMeal = () => {
    setsearchTerm("");
    settext("");
    fetchRandomMeal();
  };
  return (
    <header className="search-container">
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="Type Favourite Meal"
          className="form-input"
          value={text}
          onChange={handlechange}
        />
        <button type="submit" className="btn">
          search
        </button>
        <button
          type="button"
          className="btn btn-hipster "
          onClick={handleRandomMeal}
        >
          suprise me!
        </button>
      </form>
    </header>
  );
};
export default Search;
