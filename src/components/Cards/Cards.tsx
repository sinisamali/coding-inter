import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../reducers/FetchApiReducer/ApiActions";
import { RootStore } from "../../Store";
import AddNewImg from "../AddNewImg/AddNewImg";
import ElInsideCard from "../ElInsideCard/ElInsideCard";
import "./Card.css";

const Cards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      getData(dispatch);
    }, 2000);
  }, [dispatch]);

  const cats = useSelector((state: RootStore) => state.cats);

  const { data, tags, loading } = cats;

  console.log(loading);

  return (
    <div className="wrapper">
      <div className="grid">
        {data.map((el: any) => {
          let vertical = null;

          if (el.height > 390) {
            vertical =
              Math.round(el.height / 390) > 3 ? 3 : Math.round(el.height / 390);
          } else {
            vertical = 1;
          }

          return (
            <ElInsideCard
              key={el.id}
              el={el}
              allcategories={tags}
              vertical={vertical}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
