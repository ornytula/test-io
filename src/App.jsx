import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Catalog from "./pages/Catalog.jsx"
import ProductPage from "./pages/ProductPage.jsx"
import Header from "./components/Header.jsx"
import PrivateRoute from "./components/PrivateRoute.jsx"
import "./index.css"

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog/:categoryId" element={<Catalog />} />
        <Route path="/catalog/:categoryId/:productId" element={<ProductPage />} />
        <Route path="/cart" element={<div />} />
        <Route path="/checkout" element={<PrivateRoute><div /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><div /></PrivateRoute>} />
        <Route path="/login" element={<div />} />
        <Route path="/register" element={<div />} />
      </Routes>
    </>
  )
}

export default App
