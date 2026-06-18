import { ADD_TO_CART, REMOVE_FROM_CART } from "../context/actionTypes";
import { useProductContext } from "../context/Context";
import StarRating from "./StarRating";

const Products = ({ products }) => {
  // Pull the current cart array and global dispatch pipeline out of your context hook
  const {
    state: { cart },
    dispatch,
  } = useProductContext();

  return (
    <div className="products">
      {products.map((prod) => {
        /**
         * PERFORMANCE LOOKUP CHECKS:
         * 1. .some() tests whether at least one element in the cart array passes
         *    our structural ID comparison test. Returns a quick true/false boolean.
         * 2. Determines stock availability from your payload strings.
         */
        const isInCart = cart.some((p) => p.id === prod.id);
        const isOutOfStock = prod.availabilityStatus === "Low Stock";

        // DYNAMIC CONTENT GENERATION: Adjust button labeling states
        let buttonText = "Add to Cart";
        if (isInCart) buttonText = "Remove from Cart";
        else if (isOutOfStock) buttonText = "Out of Stock";

        return (
          <div key={prod.id} className="products__single">
            <img src={prod.thumbnail} alt={prod.title} />
            <span>{prod.title}</span>
            <hr />
            <span>$ {prod.price.toFixed(2)}</span>

            <StarRating value={prod.rating} />

            <button
              /* 
                DYNAMIC LOOKS: 
                Swaps button visual highlights dynamically (Orange if available, Blue if inside cart)
              */
              className={`px-2 py-1 mt-2 border-none cursor-pointer 
                         ${!isInCart ? "bg-orange-400" : "bg-blue-400"} 
                         rounded-sm disabled:opacity-50`}
              disabled={isOutOfStock} // Prevent users from ordering unavailable products
              onClick={() =>
                /*
                  TOGGLE ROUTER DISPATCH:
                  If it's already in the cart, click fires REMOVE_FROM_CART.
                  If it's a new selection, click fires ADD_TO_CART.
                */
                dispatch({
                  type: isInCart ? REMOVE_FROM_CART : ADD_TO_CART,
                  payload: prod,
                })
              }
            >
              {buttonText}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
