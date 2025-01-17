import { Outlet } from "react-router-dom";
// import component
import NavBarComponentGuest from "../components/NavbarComponentGuest";
import FooterComponent from "../components/FooterComponent";
const LayoutGuest = ({ children }) => {
  return (
    <div className="">
      <NavBarComponentGuest />
      {children ? children : <Outlet />}
      <FooterComponent />
    </div>
  );
};
export default LayoutGuest;
