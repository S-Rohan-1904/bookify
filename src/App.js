import "./App.css";
import { Route, Routes } from "react-router-dom";
import TopSelling from "./components/TopSelling/TopSelling";
import Genre from "./components/Genre/Genre";
import Browse from "./components/Browse/Browse";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Layout from "./Layout";
import Favourite from "./components/Favourite/Favourite";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<TopSelling />} />
        <Route path="genre" element={<Genre />} />
        <Route path="browse" element={<Browse />} />
        <Route path="favourite" element={<Favourite />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
