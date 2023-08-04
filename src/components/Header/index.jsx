import { useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";
import styles from "./style.module.scss";

export const Header = ({ cartList, isVisibe, setVisible, setSearch }) => {
  const [value, setValue] = useState("");
  const submit = (e) => {
    e.preventDefault();
    {
      !value
        ? toast.warn("Por favor, preencha o campo de busca✍️")
        : setSearch(value);
      setValue("");
    }
  };
  const count = cartList.length;

  return (
    <header className={styles.header}>
      <div className="container">
        <img src={Logo} alt="Logo Kenzie Burguer" />
        <div className={styles.inpBox}>
          <button onClick={() => setVisible(!isVisibe)}>
            <MdShoppingCart className={styles.iconCart} size={38} />
            <div>
              <span>{count}</span>
            </div>
          </button>
          <form className={`inp ${styles.form}`} onSubmit={submit}>
            <input
              className={`headline ${styles.inp}`}
              aria-required
              type="text"
              value={value}
              placeholder="Digitar Pesquisa"
              onChange={(e) => setValue(e.target.value)}
            />
            <button className={`btn medium ${styles.btn}`} type="submit">
              <MdSearch size={21} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
