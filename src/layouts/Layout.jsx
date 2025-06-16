import React, { useState } from "react";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CNavItem,
  CNavGroup,
  CNavTitle,
  CHeader,
  CButton,
  CContainer,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilSpeedometer,
  cilPeople,
  cilSettings,
  cilBuilding,
  cilUser,
} from "@coreui/icons";
import { Outlet, NavLink } from "react-router-dom";
import logo from "../assets/react.svg"; // Puedes cambiar por el logo real

const Layout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [sidebarUnfoldable, setSidebarUnfoldable] = useState(false);

  return (
    <div className="d-flex">
      <CSidebar
        visible={sidebarVisible}
        unfoldable={sidebarUnfoldable}
        onVisibleChange={setSidebarVisible}
        className="border-end"
      >
        <CSidebarBrand className="d-flex justify-content-center" to="/">
          <img src={logo} alt="Logo" width={40} height={40} />
        </CSidebarBrand>

        <CSidebarNav>
          <CNavTitle>Menú</CNavTitle>

          <CNavItem component={NavLink} to="/" end>
            <CIcon icon={cilSpeedometer} className="me-2" size="lg" />
            Dashboard
          </CNavItem>

          <CNavItem component={NavLink} to="/usuarios">
            <CIcon icon={cilPeople} className="me-2" size="lg" />
            Usuarios
          </CNavItem>

          <CNavGroup toggler="Configuración">
            <CNavItem component={NavLink} to="/tipos-usuarios">
              <CIcon icon={cilUser} className="me-2" size="lg" />
              Tipos de Usuarios
            </CNavItem>
            <CNavItem component={NavLink} to="/estado-usuarios">
              <CIcon icon={cilSettings} className="me-2" size="lg" />
              Estado de Usuarios
            </CNavItem>
            <CNavItem component={NavLink} to="/empresas">
              <CIcon icon={cilBuilding} className="me-2" size="lg" />
              Empresas
            </CNavItem>
          </CNavGroup>
        </CSidebarNav>
      </CSidebar>

      <div className="flex-grow-1 d-flex flex-column">
        <CHeader className="d-flex justify-content-between align-items-center px-3 mb-3 border-bottom">
          <CButton
            color="light"
            onClick={() => setSidebarUnfoldable(!sidebarUnfoldable)}
          >
            {sidebarUnfoldable ? "➡️" : "⬅️"}
          </CButton>
          {/* Puedes agregar aquí avatar o botón de logout */}
        </CHeader>

        <CContainer fluid className="px-4">
          <Outlet />
        </CContainer>
      </div>
    </div>
  );
};

export default Layout;
