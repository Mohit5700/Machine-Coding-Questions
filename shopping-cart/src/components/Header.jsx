import { FILTER_BY_SEARCH } from "../context/actionTypes";
import { useProductContext } from "../context/Context";
import { Link } from "react-router-dom";

const Header = () => {
  // Extract only the search query string and its dispatch action from context
  const {
    state: { cart },
    filterState: { searchQuery },
    filterDispatch,
  } = useProductContext();

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
          filterDispatch({ type: FILTER_BY_SEARCH, payload: e.target.value })
        }
      />
      <Link to="/cart">
        <button className="px-8 py-2 bg-slate-500 text-white rounded-sm cursor-pointer">
          Cart ({cart.length})
        </button>
      </Link>
    </nav>
  );
};

export default Header;
