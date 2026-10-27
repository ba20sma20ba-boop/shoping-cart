
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UseCart } from "../Context/CartContext";

function Home() {
  // Products State
  const [products, setProducts] = useState([]);

  // Loading State
  const [loading, setLoading] = useState(true);

  // Get addToCart from Context
  const { addToCart } = UseCart();

  // Fetch Products
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Loading Message
  if (loading) {
    return (
      <h3 className="text-center mt-5">
        Loading...
      </h3>
    );
  }

  return (
    <div className="container mt-5">

      <h2 className="text-center mb-4">
        Our Products
      </h2>

      <div className="row">

        {products.map((product) => (
          <div
            className="col-md-4 col-lg-3 mb-4"
            key={product.id}
          >

            <div className="card h-100 shadow-sm">

              {/* Product Image */}
              <img
                src={product.thumbnail}
                className="card-img-top"
                alt={product.title}
                style={{
                  height: "200px",
                  objectFit: "contain"
                }}
              />

              <div className="card-body">

                {/* Product Title */}
                <h5 className="card-title">
                  {product.title}
                </h5>

                {/* Product Description */}
                <p className="card-text">
                  {product.description.slice(0, 60)}...
                </p>

                {/* Product Price */}
                <h6 className="text-primary">
                  ${product.price}
                </h6>

                {/* Add To Cart Button */}
                <button
                  className="btn btn-primary w-100"
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>

                {/* View Details Button */}
                <Link
                  to={`/product/${product.id}`}
                  className="btn btn-outline-dark w-100 mt-2"
                >
                  View Details
                </Link>

              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Home;
