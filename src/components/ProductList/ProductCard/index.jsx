import styles from "./style.module.scss";
export const ProductCard = ({ product, addCart }) => {
  return (
    <li className={styles.productCard}>
      <div>
        <img src={product.img} alt={product.name} />
      </div>
      <div>
        <h3 className="heading three">{product.name}</h3>
        <span className="caption">{product.category}</span>
        <span className="body bold">
          {product.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
        <button className="body bold btn medium" onClick={() => addCart(product)}>Adicionar</button>
      </div>
    </li>
  );
};
