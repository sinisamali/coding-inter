import "./App.css";
import "./components/Card/Card.css";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "./reducers/FetchApiReducer/ApiActions";

import { useEffect } from "react";
import { RootStore } from "./Store";
import Card from "./components/Card/Card";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getData(dispatch);
  }, []);

  const cats = useSelector((state: RootStore) => state.cats);
  const allcategories = cats.tags;

  return (
    <div className="wrapper">
      <div className="grid">
        {cats.data.map((el: any) => {
          let horizontal = null;
          let vertical = null;

          if (el.width > 390) {
            horizontal =
              Math.floor(el.width / 390) > 3 ? 3 : Math.floor(el.width / 390);
          } else {
            horizontal = 1;
          }

          if (el.height > 390) {
            vertical =
              Math.floor(el.height / 390) > 3 ? 3 : Math.floor(el.height / 390);
          } else {
            vertical = 1;
          }

          if (horizontal === vertical) {
            horizontal = 1;
            vertical = 1;
          }

          return (
            <Card
              key={el.id}
              el={el}
              allcategories={allcategories}
              horizontal={horizontal}
              vertical={vertical}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
