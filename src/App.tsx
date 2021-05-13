import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "./reducers/FetchApiReducer/ApiActions";
import apiReducer from "./reducers/FetchApiReducer/apiReducer";
import { useEffect } from "react";
import { RootStore } from "./Store";
import Card from "./components/Card";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getData(dispatch);
  }, []);

  const cats = useSelector((state: RootStore) => state.cats);
  console.log(cats.data);
  console.log(cats.tags);

  const allcategories = cats.tags;

  let columns: any = {
    a: [],
    b: [],
    c: [],
  };

  let counter = 1;
  cats.data.forEach((item: any) => {
    if (counter === 1) {
      columns.a.push(item);
    }
    if (counter === 2) {
      columns.b.push(item);
    }
    if (counter === 3) {
      columns.c.push(item);
    }
    counter++;
    if (counter > 3) {
      counter = 1;
    }
  });

  return (
    <div className="App">
      {cats.data.map((el: any) => {
        let horizontal = null;
        let vertical = null;

        if (el.width > 390) {
          horizontal = Math.floor(el.width / 390) > 3 ? 3 : Math.floor(el.width / 390);

        } else {
          horizontal = 1;
        }

        if (el.height > 390) {
          vertical = Math.floor(el.height / 390) > 3 ? 3 : Math.floor(el.height / 390);
        } else {
          vertical = 1
        }

        if (horizontal === vertical) {
          horizontal = 1;
          vertical = 1;
        }

        return (
          <div className={"item" + ` h${horizontal} v${vertical}`}>
            <img src={el.url} alt="" />
          </div>
        )
      }
      )}
    </div>
  );
};

export default App;
