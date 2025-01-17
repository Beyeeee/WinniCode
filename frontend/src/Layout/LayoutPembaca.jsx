import { Outlet } from "react-router-dom";
// import component
import NavBarComponentPembaca from "../components/NavbarComponentPembaca";
import FooterComponent from "../components/FooterComponent";

const LayoutPembaca = ({ children }) => {
  return (
    <div className="">
      <NavBarComponentPembaca />
      {children ? children : <Outlet />}
      <FooterComponent />
    </div>
  );
};
export default LayoutPembaca;
