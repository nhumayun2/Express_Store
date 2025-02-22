import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StoreForm from "./pages/StoreForm";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<StoreForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
