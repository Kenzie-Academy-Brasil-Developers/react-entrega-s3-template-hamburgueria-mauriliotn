import { MdDelete, MdAdd, MdRemove } from "react-icons/md";
import styles from "./style.module.scss"

export const CartItemCard = ({ product, removeCart, addCart, subCard }) => {
  return (
    <li className={styles.cardList}>
      <div>
        <img src={product.img} alt={product.name} />
        <h3 className="heading three">{product.name}</h3>
      </div>
      <div>
        <div>
          <button
            onClick={() => subCard(product)}
            aria-label="subtrair"
            title="Subtrair item"
          >
            -
            <MdRemove size={21} />
          </button>
          <span className="body bold">{product.count}</span>
          <button
            onClick={() => addCart(product)}
            aria-label="adicionar"
            title="Adicionar item"
          >
            
            <MdAdd size={21} />
          </button>
        </div>
        <button
          onClick={() => removeCart(product.id)}
          aria-label="delete"
          title="Remover item"
        >
          <MdDelete size={21} />
        </button>
      </div>
    </li>
  );
};
