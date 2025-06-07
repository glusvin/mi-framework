import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/Dashboard";
import TiposUsuarios from "./pages/TiposUsuarios";

const Usuarios = () => <p>Listado de usuarios</p>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="usuarios" element={<Usuarios />} />
           <Route path="/tipos-usuarios" element={<TiposUsuarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
