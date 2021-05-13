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
      <div className="columns">
        <div className="picsline">
          {columns.a?.map((el: any) => (
            <Card key={el.id} el={el} allcategories={allcategories} />
          ))}
        </div>
        <div className="picsline">
          {columns.b?.map((el: any) => (
            <Card key={el.id} el={el} allcategories={allcategories} />
          ))}
        </div>
        <div className="picsline">
          {columns.c?.map((el: any) => (
            <Card key={el.id} el={el} allcategories={allcategories} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
