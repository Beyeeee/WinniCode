import { Outlet } from "react-router-dom";
// import component
import NavBarComponent from "../components/NavbarComponentAdmin";

const LayoutAdmin = ({ children }) => {
  return (
    <div className="">
      <NavBarComponent />
      {children ? children : <Outlet />}
    </div>
  );
};
export default LayoutAdmin;
