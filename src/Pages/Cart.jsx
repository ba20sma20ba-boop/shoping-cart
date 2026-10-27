
import { UseCart } from "../Context/CartContext";

function Cart() {
  const {
    cart,
    addToCart,
    decreaseQty,
    removeFromCart,
    clearCart,
    totalPrice
  } = UseCart();

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <h4 className="text-center text-muted mt-5">
          Your Cart is Empty
        </h4>
      ) : (
        <>
          {cart.map((item) => (
            <div className="card mb-3 shadow-sm" key={item.id}>
              <div className="card-body">
                <div className="row align-items-center">

                  {/* Product Image */}
                  <div className="col-md-2">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="img-fluid"
                      style={{
                        height: "120px",
                        objectFit: "contain"
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className="col-md-3">
                    <h5>{item.title}</h5>
                    <p className="text-primary">
                      ${item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-md-3">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => decreaseQty(item.id)}
                      >
                        -
                      </button>

                      <span>{item.qty}</span>

                      <button
                        className="btn btn-outline-primary"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="col-md-2">
                    <h6>
                      ${(item.price * item.qty).toFixed(2)}
                    </h6>
                  </div>

                  {/* Remove Button */}
                  <div className="col-md-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="text-end mt-4">
            <h4>
              Total Price: ${totalPrice.toFixed(2)}
            </h4>

            <button
              className="btn btn-danger mt-3"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
