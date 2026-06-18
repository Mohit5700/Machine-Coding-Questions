import { FILTER_BY_SEARCH } from "../context/actionTypes";
import { useProductContext } from "../context/Context";

const Header = () => {
  // Extract only the search query string and its dispatch action from context
  const {
    filterState: { searchQuery },
    filterDispatch,
  } = useProductContext();

  return (
    <nav className="flex items-center justify-between p-4">
      <h2 className="text-2xl font-mono">Online Store</h2>
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
    </nav>
  );
};

export default Header;
