import { useEffect, useState } from "react";
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

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    setSearch("");
  };

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
        setFilteredProducts(data);
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
    if (search !== "") {
      const productsResults = () => {
        if (productsResult.length > 0) {
          toast.success(
            <p>
              Você encontrou <strong>x{productsResult.length}</strong> na busca
              por <strong>"{search}"</strong>🔍
            </p>
          );
          setSearch("");
        }

        return productsResult.length > 0 ? productsResult : productList;
      };
      setFilteredProducts(productsResults());
    }
  }, [search]);

  useEffect(() => {
    if (productsResult.length === 0 && search) {
      onOpenModal();
    }
  }, [filteredProducts, search, open]);

  const addCart = (product) => {
    const item = cartList.some((cart) => cart.id === product.id);

    if (!item) {
      setCartList([...cartList, { ...product, count: 1 }]);
      toast.success("Produto ao adicionado Carrinho 🛒");
    } else {
      const newCartList = cartList.map((cartProduct) => {
        if (product.id === cartProduct.id) {
          toast.success("Produto acrecentado ao Carrinho 🛒");
          return {
            ...cartProduct,
            count: cartProduct.count + 1,
          };
        } else {
          return cartProduct;
        }
      });
      setCartList(newCartList);
    }
  };
  const subCard = (product) => {
    const newCartList = cartList.map((cartProduct) => {
      if (product.id === cartProduct.id && product.count > 1) {
        toast.success("Produto diminuido do Carrinho 🛒");
        return {
          ...cartProduct,
          count: cartProduct.count - 1,
        };
      } else {
        return cartProduct;
      }
    });
    setCartList(newCartList);
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
          <ProductList addCart={addCart} filteredProducts={filteredProducts} />
        )}

        {isVisibe ? (
          <CartModal
            cartList={cartList}
            removeCart={removeCart}
            setCartList={setCartList}
            setVisible={setVisible}
            addCart={addCart}
            subCard={subCard}
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
            classNames={{
              modalAnimationIn: "customEnterModalAnimation",
              modalAnimationOut: "customLeaveModalAnimation",
              modal: "customModal",
            }}
            animationDuration={800}
          >
            <>
              <div className="modalHeader">
                <h2 className="heading two">Nenhum produto encontrado</h2>
              </div>
              <div className="modalContent">
                <p className="headline">
                  Não foi possível identificar nenhum produto com <br />
                  <strong>"{search}"</strong>
                  <br /> por favor tente novamente
                </p>
                <button
                  className="btn medium headline"
                  onClick={() => {
                    onCloseModal();
                    setFilteredProducts(productList);
                  }}
                >
                  Clique aqui para voltar a lista completa
                </button>
              </div>
            </>
          </Modal>
        </div>
      </main>
    </>
  );
};
