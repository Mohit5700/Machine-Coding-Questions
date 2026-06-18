import "./App.css";
import Carousel from "./components/Carousel";
import useFetchImages from "./hooks/useFetchImages";

function App() {
  // Destructure state from our custom hook
  const { loading, images } = useFetchImages();

  return (
    <div className="App">
      {/* Pass loading state and data as props to the Carousel */}
      <Carousel isLoading={loading} images={images} />
    </div>
  );
}

export default App;
