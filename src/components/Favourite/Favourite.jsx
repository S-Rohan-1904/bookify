import { useEffect, useState } from "react";
import Book from "../Book/Book";
import Modal from "../Modal/Modal";
import "./Favourite.css";
function Favourite() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentBook, setCurrentBook] = useState({});
  const getData = () => {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    console.log(values);
    setData(values);
  };
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
    getData();
  }, []);
  return (
    <div className="container">
      <h1 className="fav-title">Favourite Books</h1>
      <Modal
        modal={openModal}
        onClose={() => {
          setOpenModal((prevState) => !prevState);
          getData();
        }}
        data={currentBook}
      />
      <div className="book-container">
        {data.toString() == [].toString() ? (
          <h3 className="no-fav">You don't have a Favourite Book</h3>
        ) : (
          <span></span>
        )}
        {data.map((book, key) => {
          console.log(book);
          return (
            <Book
              onClick={clickHandler}
              key={key}
              title={book.title}
              authors={book.authors}
              summary={book.summary}
              imageUrl={book.imageUrl}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Favourite;
