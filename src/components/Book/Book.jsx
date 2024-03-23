import "./Book.css";

function Book(props) {
  const clickHandler = () => {
    props.onClick(props.imageUrl, props.title, props.summary, props.authors);
  };
  let classes = props.className != undefined ? " " + props.className : "";
  return (
    <>
      <div className={"book" + classes} onClick={clickHandler}>
        <img src={props.imageUrl} alt="Image" className="book-img" />
        <h3 className="book-title">
          {props.title.length > 35
            ? props.title.slice(0, 35) + "..."
            : props.title}
        </h3>
        <h4 className="book-authors">{props.authors.toString()}</h4>
      </div>
    </>
  );
}

export default Book;
