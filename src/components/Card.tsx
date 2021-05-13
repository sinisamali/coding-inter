import React, { useState } from "react";
import { AiOutlineLike, AiOutlineDelete, AiFillLike } from "react-icons/ai";

interface Props {
  el: {
    url: string;
    categories: [];
  };
  allcategories: any;
}

const Card: React.FC<Props> = (props) => {
  const [liked, setLiked] = useState(false);
  const [tags, setTags] = useState([]);
  const _like = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
    }
  };

  const _handleSelectTag = (e: any) => {
    console.log(e.target.value);
  };

  let jsxLiked = <AiOutlineLike className="action-btn" onClick={_like} />;
  if (liked) {
    jsxLiked = <AiFillLike className="action-btn" onClick={_like} />;
  }
  const el = props.el;
  let categories: any = [];
  if (Array.isArray(el.categories)) {
    categories = el.categories;
  }
  const allcategories = props.allcategories;
  let _tags = [...categories, tags]
  return (
    <div
      className="card"
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
      <AiOutlineDelete className="action-btn" />
      {categories.map((item: any) => {
        return (
          <div className="tag" key={item.id}>
            {item.name}
            <span>×</span>
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
    </div>
  );
};

export default Card;
