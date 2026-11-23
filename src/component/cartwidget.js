
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  X,
} from "lucide-react";

function CartWidget({
  cartItems,
  cartCount,
  cartSubtotal,
  cartOpen,
  setCartOpen,
  updateCartQuantity,
  removeFromCart,
}) {
  return (
    <>
      <button
        className="floating-cart-button"
        onClick={() => setCartOpen(!cartOpen)}
        aria-label={`Shopping cart with ${cartCount} items`}
        aria-expanded={cartOpen}
      >
        <ShoppingCart size={25} />

        <span className="cart-count-badge">
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      </button>

      {cartOpen && (
  <>
    <button
      className="cart-backdrop"
      onClick={() => setCartOpen(false)}
      aria-label="Close cart"
    />

    <aside className="cart-drawer">

      <div className="cart-drawer-header">
        <h2>Your Cart ({cartCount})</h2>

        <button
          onClick={() => setCartOpen(false)}
          className="cart-close-button"
        >
          <X size={23} />
        </button>
      </div>

      <div className="cart-items-container">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>

                <p>
                  KSh {item.price.toLocaleString("en-KE")}
                </p>

                <div className="cart-quantity">
                  <button
                    onClick={() =>
                      updateCartQuantity(
                        item.id,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                  >
                    <Minus size={14} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() =>
                      updateCartQuantity(
                        item.id,
                        item.quantity + 1
                      )
                    }
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-cart-item"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))
        ) : (
          <div className="empty-cart">
            <ShoppingCart size={40} />
            <h3>Your cart is empty</h3>
            <p>Add something delicious from our menu!</p>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-drawer-footer">
          <div className="cart-subtotal">
            <span>Subtotal</span>
            <strong>
              KSh {cartSubtotal.toLocaleString("en-KE")}
            </strong>
          </div>
        </div>
      )}

    </aside>
    </>
    )}
    </>
  );
}

export default CartWidget;
