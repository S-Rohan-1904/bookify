import React from "react";
import "./Browse.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Book from "../Book/Book";
import SearchIcon from "@mui/icons-material/Search";
import Modal from "../Modal/Modal";
const defaultSummary =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
function Browse() {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Title");
  const [activeFilter, setActiveFilter] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [currentBook, setCurrentBook] = useState({});
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const filterOptions = [
    "Author",
    "Reference",
    "Mystery & Suspense",
    "Real Life",
    "Science Fiction & Fantasy",
    "Hobbies, Sports & Outdoors",
    "Science & Technology",
  ];
  const options = {
    method: "GET",
    url: process.env.REACT_APP_URL,
    params: {
      categories: null,
      book_type: "nonfiction",
      results_per_page: "100",
      page: "1",
    },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
      "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
    },
  };

  const getApiData = async (options) => {
    try {
      const response = await axios.request(options);
      setData(response.data.results);
      setInitialData(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const filterBooks = (initialBooks, searchInput) => {
    if (filter == "Title") {
      setData(() => {
        let updatedState = initialBooks.filter((book) =>
          book.title.toLowerCase().includes(searchInput.toLowerCase())
        );
        return updatedState;
      });
    } else if (filter == "Author") {
      setData(() => {
        let updatedState = initialBooks.filter((book) =>
          book.authors
            .toString()
            .toLowerCase()
            .includes(searchInput.toLowerCase())
        );
        return updatedState;
      });
    }
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

  const inputChangeHandler = (e) => {
    setSearch(e.target.value);
    filterBooks(initialData, e.target.value);
  };
  const filterChangeHandler = (e) => {
    let options = {
      method: "GET",
      url: process.env.REACT_APP_URL,
      params: {
        categories: e.target.innerText,
        book_type: "nonfiction",
        results_per_page: "100",
        page: "1",
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
      },
    };

    if (e.target.innerText != "Author" && options.params.categories != null) {
      getApiData(options);
    }

    if (e.target.innerText == "Author")
      setFilter((prevState) => {
        return prevState == "Title" ? e.target.innerText : "Title";
      });
    if (e.target.innerText != "Author") {
      setActiveFilter((prevState) => {
        return prevState != e.target.innerText ? e.target.innerText : "";
      });
    }
    setSearch("");
  };
  useEffect(() => {
    getApiData(options);
  }, []);

  return (
    <div className="container">
      <div className="controls">
        <div className="search">
          <SearchIcon className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={search}
            onChange={inputChangeHandler}
          />
        </div>
        <div className="filter-options">
          {filterOptions.map((filterOption, index) => {
            let classes = "filter-option";
            classes +=
              activeFilter == filterOption || filter == filterOption
                ? " active-filter"
                : "";
            return (
              <button
                key={index}
                className={classes}
                onClick={filterChangeHandler}
              >
                {filterOption}
              </button>
            );
          })}
        </div>
      </div>
      <Modal
        modal={openModal}
        onClose={() => setOpenModal((prevState) => !prevState)}
        data={currentBook}
      />
      {data.toString() == [].toString() && search != "" ? (
        <h3>No results Found</h3>
      ) : (
        <span></span>
      )}
      <div className="book-container">
        {data.map((book, key) => {
          return (
            <Book
              key={key}
              title={book.title}
              imageUrl={
                book.published_works[book.published_works.length - 1]
                  .cover_art_url
              }
              summary={book.summary == "" ? defaultSummary : book.summary}
              authors={book.authors}
              categories={book.categories}
              onClick={clickHandler}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Browse;
