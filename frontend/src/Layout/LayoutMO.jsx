import { Outlet } from "react-router-dom";
// import component
import NavBarComponentMO from "../components/NavBarComponentMO";

const LayoutMO = ({ children }) => {
  return (
    <div className="">
      <NavBarComponentMO />
      {children ? children : <Outlet />}
    </div>
  );
};
export default LayoutMO;
