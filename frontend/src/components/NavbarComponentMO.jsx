import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
    Menu,
    MenuHandler,
    MenuList,
} from "@material-tailwind/react";

import winniCode from "../assets/img/TulisanWinniCode.png"

const NavbarComponentMO = () => {
    return (
        <>
            <div>
                <div className=" flex bg-base-100 h-20 shadow-md">
                    <div className="flex pl-5 pb-2 w-[20%] justify-center ">
                        <img src={winniCode} alt="logo" className="flex object-contain" />
                    </div>
                    <div className="flex w-[60%] pt-3 justify-center text-center">
                        <Nav className="flex flex-col font-bold pt-2">
                            <NavLink className="nav-link text-black" to="/mo">Home</NavLink>
                            <NavLink className="nav-link text-black" to="/mo/pegawai">Pegawai</NavLink>
                            <NavLink className="nav-link text-black" to="/mo/role">Role</NavLink>
                        </Nav>
                    </div>
                    <div className="flex w-[20%] pt-2 justify-center">
                        <div tabIndex={0} className="dropdown flex justify-center">
                            <Menu>
                                <MenuHandler>
                                    <button tabIndex={0} className="">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                        </svg>
                                    </button>
                                </MenuHandler>
                                <MenuList>
                                    <Nav className="flex flex-col font-bold pt-2">
                                        <NavLink className="nav-link text-black" to="/admin/berita">Profile</NavLink>
                                        <NavLink className="nav-link text-red-500" to="/login">Logout</NavLink>
                                    </Nav>
                                </MenuList>
                            </Menu>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );

};

export default NavbarComponentMO;