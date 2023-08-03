import { useEffect, useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import { toast } from "react-toastify";

export const Header = ({
  cartList,
  isVisibe,
  setVisible,
  setSearch
}) => {
  const [value, setValue] = useState("");
  const submit = (e) => {
    e.preventDefault();
    {
      !value
        ? toast.warn("Por favor, preencha o campo de busca✍️")
        : setSearch(value);
      setValue("")
    }
    
  };
  const count = cartList.length;

  return (
    <header>
      <img src={Logo} alt="Logo Kenzie Burguer" />
      <div>
        <button onClick={() => setVisible(!isVisibe)}>
          <MdShoppingCart size={21} />

          <span>{count}</span>
        </button>
        <form onSubmit={submit}>
          <input
            aria-required
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit">
            <MdSearch size={21} />
          </button>
        </form>
      </div>
    </header>
  );
};
