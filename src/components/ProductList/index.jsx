import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";

export const ProductList = ({
  search,
  addCart,
  productList,
  filteredProducts,
  setSearch,
  setFilteredProducts,
}) => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    if (filteredProducts.length === 0 && search) {
      onOpenModal();
    }
  }, [filteredProducts, search]);
  useEffect(()=>{
    return () => {
      if (open === false) {
        setSearch("")
      }
    }
  },[open])
  return (
    <>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} addCart={addCart} />
          ))}
        </ul>
      ) : (
        <div>
          <Modal
            open={open}
            onClose={() => {
              onCloseModal();
              setFilteredProducts(productList);
            }}
            center
          >
            <p>
              Nenhum Produto encontrado com "{search}", por favor tente
              novamente
            </p>
            <button
              onClick={() => {
                onCloseModal();
                setFilteredProducts(productList);
              }}
            >
              Clique aqui para voltar a lista completa
            </button>
          </Modal>
        </div>
      )}
    </>
  );
};
