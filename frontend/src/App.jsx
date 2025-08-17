import axios from "axios";
import { Route, Routes } from "react-router-dom";
import UploadProduct from "./pages/UploadProduct";
import Products from "./pages/Products";
function App() {
  return (
    <Routes>
      <Route path="/upload" element={<UploadProduct />} />
      <Route path="/" element={<Products />} />
    </Routes>
  );
}

export default App;
