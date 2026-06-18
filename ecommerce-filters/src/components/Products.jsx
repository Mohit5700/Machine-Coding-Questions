import StarRating from "./StarRating";

const Products = ({ products }) => {
  return (
    <div className="products">
      {products.map((prod) => {
        return (
          <div key={prod.id} className="products__single">
            <img src={prod.thumbnail} alt={prod.title} />
            <span>{prod.title}</span>
            <hr />
            <span>$ {prod.price}</span>
            <StarRating value={prod.rating} />
          </div>
        );
      })}
    </div>
  );
};

export default Products;
