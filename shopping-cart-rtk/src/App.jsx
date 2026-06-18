import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./components/Home";
import { Provider } from "react-redux";
import Cart from "./components/Cart";
import store from "./utils/store";

// Configure browser paths using declarative nesting properties
const router = createBrowserRouter([
  {
    element: <AppLayout />, // Standard layout outer shell (persistent across pages)
    children: [
      {
        path: "/",
        element: <Home />, // Injected inside AppLayout's <Outlet /> at root URL
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
