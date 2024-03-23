import "./TopSelling.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Book from "../Book/Book";
import Modal from "../Modal/Modal";
function TopSelling() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentBook, setCurrentBook] = useState({});
  const options = {
    method: "GET",
    url: process.env.REACT_APP_URL,
    params: {
      book_type: "nonfiction",
      lexile_min: "600",
      lexile_max: "800",
      results_per_page: "12",
      page: "1",
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
      "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
    },
  };

  const getApiData = async () => {
    try {
      const response = await axios.request(options);
      setData(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const topSelling = data.slice(0, 6);
  const trending = data.slice(6, 12);

  const clickHandler = (imageUrl, title, summary, authors) => {
    setCurrentBook({
      imageUrl: imageUrl,
      title: title,
      summary: summary,
      authors: authors,
    });
    setOpenModal((prevState) => !prevState);
  };

  useEffect(() => {
    getApiData();
  }, []);
  return (
    <div className="container">
      <h1 className="title">Top Selling</h1>
      <Modal
        modal={openModal}
        onClose={() => setOpenModal((prevState) => !prevState)}
        data={currentBook}
      />
      <div className="book-container">
        {topSelling.map((book, key) => {
          return (
            <Book
              onClick={clickHandler}
              key={key}
              title={book.title}
              authors={book.authors}
              summary={book.summary}
              imageUrl={
                book.published_works[book.published_works.length - 1]
                  .cover_art_url
              }
            />
          );
        })}
      </div>
      <h1 className="trending-title">Trending</h1>
      <Modal
        modal={openModal}
        onClose={() => setOpenModal((prevState) => !prevState)}
        data={currentBook}
      />
      <div className="book-container">
        {trending.map((book, key) => {
          return (
            <Book
              onClick={clickHandler}
              key={key}
              title={book.title}
              authors={book.authors}
              summary={book.summary}
              imageUrl={
                book.published_works[book.published_works.length - 1]
                  .cover_art_url
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default TopSelling;
