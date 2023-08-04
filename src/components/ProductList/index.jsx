import { ProductCard } from "./ProductCard";
import styles from "./style.module.scss"

export const ProductList = ({ addCart, filteredProducts }) => {
  return (
    <div className="container">
      <div className={styles.flexBox}>
        {filteredProducts.length > 0 ? (
          <ul className={styles.productList}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addCart={addCart}
              />
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};
