
import { Link } from "react-router-dom";
import { UseCart } from "../Context/CartContext";

function Navbar() {
  // Get totalItems from Cart Context
  const { totalItems } = UseCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          My Store
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/cart">
            Cart
            <span className="badge bg-primary ms-2">
              {totalItems}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
