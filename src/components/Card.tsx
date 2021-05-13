import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineLike, AiOutlineDelete, AiFillLike } from "react-icons/ai";

interface Props {
  el: {
    url: string;
    categories: [];
    id: string;
  };
  allcategories: any;
}

const Card: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const [size, setSize] = useState("S"); // size can be 'S' small, 'M' medium, 'L' large
  const [field, setField] = useState("");
  const el = props.el;
  let categories: any = [];
  if (Array.isArray(el.categories)) {
    // categories = el.categories;
    el.categories.forEach((item: any) => {
      if (item && item.name) {
        categories.push(item.name);
      }
    });
  }
  const [tags, setTags] = useState([...categories]);

  const _like = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
    }
  };

  const _handleInputChange = (e: any) => {
    const newTag = e.target.value;
    console.log(newTag);
    setField(newTag);
    // setTags([...tags, newTag]);
  };
  const _handleFieldSumbmit = (e: any) => {
    // SUBMIT EVENT
    e.preventDefault(); // preventing real submit
    const newTag = field.trim();
    if (typeof newTag === "string" && newTag !== "") {
      // check if tag already exist
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setField(""); // after submit clear form
        // and add that new tag into global redux state
        dispatch({ type: "ADD_NEW_TAG", payload: newTag });
      }
    }
  };

  const _handleSelectTag = (e: any) => {
    const newTag = e.target.value;
    console.log(newTag);
    setTags([...tags, newTag]);
  };

  const _deletetTag = (tag: any) => {
    const newTags: any = tags.filter((item) => {
      if (tag === item) {
        return false; // brisemo taj
      }
      return true;
    });
    setTags(newTags);
  };

  const _handleSelectSize = (e: any) => {
    const newSize = e.target.value;
    console.log(newSize);
    setSize(newSize);
  };

  const _deleteCard = () => {
    dispatch({ type: "DELETE_CARD", payload: el.id });
  };

  let jsxLiked = <AiOutlineLike className="action-btn" onClick={_like} />;
  if (liked) {
    jsxLiked = <AiFillLike className="action-btn" onClick={_like} />;
  }

  const allcategories = props.allcategories;

  return (
    <div
      className={"card size-" + size}
      style={{
        backgroundImage: `url(${el.url})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        width: "250px",
        height: "200px",
        alignSelf: "center",
        justifySelf: "center",
        border: "1px solid black",
      }}
    >
      {jsxLiked}
      <AiOutlineDelete className="action-btn" onClick={_deleteCard} />
      {tags.map((item: any) => {
        return (
          <div className="tag" key={item}>
            {item}
            <span
              onClick={(e) => {
                _deletetTag(item);
              }}
            >
              ×
            </span>
          </div>
        );
      })}
      <select onChange={_handleSelectTag}>
        <option value="">--choose tag--</option>
        {allcategories.map((item: any) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <select onChange={_handleSelectSize} value={size}>
        <option value={"S"}>small</option>
        <option value={"M"}>medium</option>
        <option value={"L"}>large</option>
      </select>
      <form onSubmit={_handleFieldSumbmit}>
        <input type="text" value={field} onChange={_handleInputChange} />
      </form>
    </div>
  );
};

export default Card;
