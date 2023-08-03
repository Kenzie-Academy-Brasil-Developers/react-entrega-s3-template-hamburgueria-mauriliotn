import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { api } from "../../services/api";
import { LoadingList } from "../../components/LoadingList";
import { toast } from "react-toastify";

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

  const productsResult = productList.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

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

  useEffect(() => {
    setFilteredProducts(search ? productsResult : productList);
  }, [search, productList]);
  

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
      </main>
    </>
  );
};
