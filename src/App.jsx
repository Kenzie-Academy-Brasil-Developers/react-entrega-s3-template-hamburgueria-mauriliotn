
import { HomePage } from "./pages/HomePage"
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import 'react-responsive-modal/styles.css';
import "./styles/index.scss";

function App() {

  
  return (
    <>
      <HomePage />
      <ToastContainer autoClose={1 * 1000} />
    </>
  )
}

export default App
