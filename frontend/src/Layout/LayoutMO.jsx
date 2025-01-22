import { Outlet } from "react-router-dom";
// import component
import NavBarComponent from "../components/NavbarComponentMO";

const LayoutMO = ({ children }) => {
  return (
    <div className="">
      <NavBarComponent />
      {children ? children : <Outlet />}
    </div>
  );
};
export default LayoutMO;
