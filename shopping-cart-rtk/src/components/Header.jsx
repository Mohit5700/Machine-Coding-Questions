import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterBySearch } from "../utils/filterSlice";

const Header = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.cartItems);
  const searchQuery = useSelector((store) => store.filter.searchQuery);

  return (
    <nav className="flex items-center justify-between p-4">
      <Link to="/">
        <h2 className="text-2xl font-mono">Online Store</h2>
      </Link>
      <input
        className="p-2"
        type="text"
        placeholder="Search a Product..."
        value={searchQuery} // Controlled component bound to global filterState context
        onChange={(e) =>
          // Every keystroke immediately propagates up to filterReducer
          dispatch(filterBySearch(e.target.value))
        }
      />
      <Link to="/cart">
        <button className="px-8 py-2 bg-slate-500 text-white rounded-sm cursor-pointer">
          Cart ({cartItems.length})
        </button>
      </Link>
    </nav>
  );
};

export default Header;
