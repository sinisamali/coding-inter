import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineLike, AiOutlineDelete, AiFillLike } from "react-icons/ai";
import { delateCard } from "../../reducers/FetchApiReducer/ApiActions";
import "./ElInsideCard.css";

interface Props {
  el: {
    url: string;
    categories: [];
    id: string;
  };
  allcategories: any;
  vertical: any;
}

const ElInsideCard: React.FC<Props> = ({ vertical, el, allcategories }) => {
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const [field, setField] = useState("");
  const [size, setSize] = useState(0);
  const [isShown, setIsShown] = useState(false);

  let categories: any = [];

  if (Array.isArray(el.categories)) {
    el.categories.forEach((item: any) => {
      if (item && item.name) {
        categories.push(item.name);
      }
    });
  }
  const [tags, setTags] = useState([...categories]);

  const _handleInputChange = (e: any) => {
    const newTag = e.target.value;
    setField(newTag);
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
    setTags([...tags, newTag]);
  };

  const _handleDeletetTag = (tag: any) => {
    const newTags: any = tags.filter((item) => tag !== item);
    setTags(newTags);
  };

  return (
    <div className={`item v${vertical} h${size}`}>
      <img src={el.url} alt="" />
      <div className="overlay">
        <div className="btn-group">
          {!liked ? (
            <AiOutlineLike
              style={{ fontSize: "1em" }}
              className="btn-like"
              onClick={() => setLiked(true)}
            />
          ) : (
            <AiFillLike
              style={{ fontSize: "1em" }}
              className="btn-like"
              onClick={() => setLiked(false)}
            />
          )}
          {window.innerWidth > 400 && (
            <div className="select-size">
              <select onChange={(e) => setSize(parseInt(e.target.value))}>
                <option value={"1"}>small</option>
                <option value={"2"}>medium</option>
                <option value={"3"}>large</option>
              </select>
            </div>
          )}

          <AiOutlineDelete
            style={{ fontSize: "1em" }}
            className="btn-delete"
            onClick={(e) => dispatch(delateCard(el.id))}
          />
        </div>

        <div className="group1">
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

export default ElInsideCard;
