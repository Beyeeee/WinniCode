import { Outlet } from "react-router-dom";
// import component
import NavBarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";

const Layout = ({ children }) => {
  return (
    <div className="">
      <NavBarComponent />
      {children ? children : <Outlet />}
      <FooterComponent />
    </div>
  );
};
export default Layout;
