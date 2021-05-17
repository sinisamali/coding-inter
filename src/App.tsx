import { useSelector } from "react-redux";
import AddNewImg from "./components/AddNewImg/AddNewImg";
import Cards from "./components/Cards/Cards";
import LoadingContainer from "./components/LoadingContainer/LoadingContainer";
import { RootStore } from "./Store";


const App: React.FC = () => {
  const cats = useSelector((state: RootStore) => state.cats);
  const { loading, data } = cats;
  return (
    <div className="App">
      {loading && (
       <LoadingContainer />
      )}
      {!loading && <AddNewImg data={data} />}
      <Cards />
    </div>
  );
};

export default App;
