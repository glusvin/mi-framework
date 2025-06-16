import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import Empresas from "./pages/Empresas";
// importa más páginas según tengas

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="empresas" element={<Empresas />} />
          {/* más rutas aquí */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
