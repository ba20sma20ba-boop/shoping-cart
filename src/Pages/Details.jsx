
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UseCart } from "../Context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = UseCart();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  if (!product) {
    return <h3 className="text-center mt-5">Product Not Found</h3>;
  }

  return (
    <div className="container mt-5">
      <div className="row align-items-center">

        <div className="col-md-5">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="img-fluid"
          />
        </div>

        <div className="col-md-7">
          <h2>{product.title}</h2>

          <p>{product.description}</p>

          <h4 className="text-primary">
            ${product.price}
          </h4>

          <p>Rating: ⭐ {product.rating}</p>

          <button
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;
