import { useCallback, useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { api } from "../../services/api";
import { LoadingList } from "../../components/LoadingList";
import { toast } from "react-toastify";
import Modal from "react-responsive-modal";


export const HomePage = () => {
  const localCardList = localStorage.getItem("@CARTLIST");
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState(
    localCardList ? JSON.parse(localCardList) : []
  );
  const [isVisibe, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productList);
  const [open, setOpen] = useState(false);

  
  const productsResults = useCallback (() =>{
    const productsResult = productList.filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
    );
    console.log(productsResult);
    if (productsResult.length > 0) {
      toast.success("encontrou")
      setSearch("")
    }
    setFilteredProducts (productsResult.length > 0 ? productsResult : productList)
  },[search])
  
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () =>{
    setOpen(false);
    setSearch("")
  } 
    
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/products");
        setProductList(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("@CARTLIST", JSON.stringify(cartList));
  }, [cartList]);

  // useEffect(() => {
  //   setFilteredProducts( productsResults());
  // }, []);

  useEffect(() => {
    if (filteredProducts.length === 0 && search) {
      onOpenModal();
    }
  }, [filteredProducts, search, open]);
  

  const addCart = (addCart) => {
    if (!cartList.some((cart) => cart.id === addCart.id)) {
      setCartList([...cartList, addCart]);
      toast.success("Produto ao Carrinho 🛒");
    } else {
      toast.error("produto ja adicionado ");
    }
  };

  const removeCart = (cartId) => {
    const newCartList = cartList.filter((cart) => cart.id !== cartId);
    setCartList(newCartList);
    toast.success("item removido com sucesso");
  };

  return (
    <>
      <Header
        cartList={cartList}
        isVisibe={isVisibe}
        setVisible={setVisible}
        setSearch={setSearch}
      />
      <main>
        {loading ? (
          <LoadingList />
        ) : (
          <ProductList
            search={search}
            addCart={addCart}
            productList={productList}
            filteredProducts={filteredProducts}
            setSearch={setSearch}
            setFilteredProducts={setFilteredProducts}
            setOpen={setOpen}
            open={open}
          />
        )}

        {isVisibe ? (
          <CartModal
            cartList={cartList}
            removeCart={removeCart}
            setCartList={setCartList}
            setVisible={setVisible}
          />
        ) : null}
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
      </main>
    </>
  );
};
