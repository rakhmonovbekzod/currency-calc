import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import { fetchCurrency } from "./store/slices/currency";
import 'antd/dist/antd.css'
import "./assets/scss/global.scss";


function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrency())
  }, [])

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
