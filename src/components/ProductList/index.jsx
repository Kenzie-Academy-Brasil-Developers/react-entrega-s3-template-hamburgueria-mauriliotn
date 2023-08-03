import { ProductCard } from "./ProductCard";

export const ProductList = ({ addCart, filteredProducts }) => {
  return (
    <>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} addCart={addCart} />
          ))}
        </ul>
      ) : null}
    </>
  );
};
