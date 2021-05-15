import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineLike, AiOutlineDelete, AiFillLike } from "react-icons/ai";
import { delateCard } from "../../reducers/FetchApiReducer/ApiActions";

interface Props {
  el: {
    url: string;
    categories: [];
    id: string;
  };
  allcategories: any;
  horizontal: any;
  vertical: any;
}

const Card: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [field, setField] = useState("");
  const el = props.el;
  const id = el.id;
  const allcategories = props.allcategories;
  const horizontal = props.horizontal;
  const vertical = props.vertical;
  const [size, setSize] = useState(vertical);
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

  const _handleLike = () => {
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

  const _handleDeletetTag = (tag: any) => {
    const newTags: any = tags.filter((item) => {
      if (tag === item) {
        return false; // brisemo taj
      }
      return true;
    });
    setTags(newTags);
  };

  const _handleSelectSize = (e: any) => {
    const newSize = parseInt(e.target.value); // converted to integer
    console.log(newSize);
    setSize(newSize);
  };

  return (
    <div className={"item" + ` h${horizontal} v${size}`}>
      <img src={el.url} alt="" />
      <div className="overlay">
        <div className="btn-group">
          {liked && (
            <AiOutlineLike
              style={{ fontSize: "1em" }}
              className="btn-like"
              onClick={_handleLike}
            />
          )}
          {!liked && (
            <AiFillLike
              style={{ fontSize: "1em" }}
              className="btn-like"
              onClick={_handleLike}
            />
          )}
          <AiOutlineDelete
            style={{ fontSize: "1em" }}
            className="btn-delete"
            onClick={(e) => dispatch(delateCard(id))}
          />
        </div>
        <div className="group">
          <select onChange={_handleSelectSize} value={size}>
            <option value={"1"}>small</option>
            <option value={"2"}>medium</option>
            <option value={"3"}>large</option>
          </select>
        </div>
        <div className="group">
          {tags.map((item: any) => {
            return (
              <div className="tag" key={item}>
                {item}
                <span
                  onClick={(e) => {
                    _handleDeletetTag(item);
                  }}
                >
                  ×
                </span>
              </div>
            );
          })}
        </div>
        <div className="group">
          <select onChange={_handleSelectTag}>
            <option value="">--choose existing tag--</option>
            {allcategories.map((item: any) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div className="group">
          <form onSubmit={_handleFieldSumbmit}>
            <input
              type="text"
              placeholder="Enter new tag"
              value={field}
              onChange={_handleInputChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Card;
