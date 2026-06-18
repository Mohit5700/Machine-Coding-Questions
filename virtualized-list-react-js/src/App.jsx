import "./App.css";
import VirtualizedList from "./components/VirtualizedList";

const LIST = Array.from({ length: 100000 }, (_, index) => index + 1);

function App() {
  return (
    <VirtualizedList
      list={LIST}
      containerWidth={300}
      containerHeight={400}
      itemHeight={35}
    />
  );
}

export default App;
