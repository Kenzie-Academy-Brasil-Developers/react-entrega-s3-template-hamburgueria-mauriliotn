import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import { toast } from "react-toastify";
import styles from "./style.module.scss"

export const CartModal = ({
  cartList,
  removeCart,
  setCartList,
  setVisible,
  addCart,
  subCard
}) => {
  
  const total = cartList.reduce((prevValue, product) => {
    return prevValue + product.price * product.count;
  }, 0);

  return (
    <div className={styles.overlayBox} role="dialog">
      
      <div className={styles.modalTitle}>
        <h2 className="heading three">Carrinho de compras</h2>
        <button
          onClick={() => setVisible(false)}
          aria-label="close"
          title="Fechar"
        >
          <MdClose size={24} />
        </button>
      </div>
      <div className={styles.modalProduct}>
        <ul>
          {cartList.map((product) => (
            <CartItemCard
              key={product.id}
              product={product}
              removeCart={removeCart}
              addCart={addCart}
              subCard={subCard}
            />
          ))}
        </ul>
      </div>
      <div className={styles.modalTotal}>
        <div>
          <span className="body bold">Total</span>
          <span className="body bold">
            {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </div>
        <button className="btn default"
          onClick={() => (
            setCartList([]), toast.success("Carrinho limpo com sucesso 🧹"),setVisible(false)
          )}
        >
          Remover todos
        </button>
      </div>
      </div>
  );
};
