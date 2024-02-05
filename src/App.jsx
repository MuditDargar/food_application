import "./App.css";
import { useGlobalContext } from "./Context";
import Favourites from "./components/Favourites";
import Model from "./components/Model";
import Meals from "./components/Meals";
import Search from "./components/Search";
export default function App() {
  const { showModal, favourites } = useGlobalContext();
  return (
    <main>
      <Search />
      {favourites.length > 0 && <Favourites />}
      <Meals />
      {showModal && <Model />}
    </main>
  );
}
