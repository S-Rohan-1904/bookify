import React, { useState } from "react";
import "./Modal.css";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

function Modal(props) {
  const [favourite, setFavourite] = useState([]);
  const favouriteHandler = () => {
    const data = {
      imageUrl: props.data.imageUrl,
      title: props.data.title,
      summary: props.data.summary,
      authors: props.data.authors,
    };
    if (localStorage.getItem(props.data.title) == null) {
      setFavourite((prevState) => [...prevState, data]);
      localStorage.setItem(props.data.title, JSON.stringify(data));
    } else {
      setFavourite((prevState) =>
        prevState.filter((book) => {
          return book.title != props.data.title;
        })
      );
      localStorage.removeItem(props.data.title);
    }
  };
  const closeModalHandler = () => {
    props.onClose();
  };
  if (props.modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const isFav = localStorage.getItem(props.data.title) == null;

  return (
    <>
      {props.modal && (
        <div className="modal">
          <div className="overlay"></div>
          <div className="modal-content">
            <CloseOutlinedIcon
              onClick={closeModalHandler}
              className="close-icon"
            />
            {isFav ? (
              <StarOutlineOutlinedIcon
                className="star"
                onClick={favouriteHandler}
              />
            ) : (
              <StarOutlinedIcon
                className="star-click"
                onClick={favouriteHandler}
              />
            )}

            <h2 className="title">{props.data.title}</h2>
            <h3 className="author">by {props.data.authors.toString()}</h3>
            <p className="summary">{props.data.summary}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
