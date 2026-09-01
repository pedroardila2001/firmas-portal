import { useState, useEffect } from "react";
import Menu from "./Menu";
import Submenu from "./SubMenu";
import SocialMedia from "../SocialMedia";
import AliAvatar from "../AliAvatar";
import sidebarList from "../../json/menuJson";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useWindowSize } from "../../hook/useWindowSize";
import {
  setSelectedMenu,
  toggleSidebar
} from "../../redux/reducers/sidebarReducer";

const Sidebar = () => {
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [menuList, setmenuList] = useState([]);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const username = localStorage.getItem("username");
  const image = localStorage.getItem("profileImg") || "";
  const tenantname = localStorage.getItem("Extand_Class")
    ? JSON.parse(localStorage.getItem("Extand_Class"))?.[0]?.Company
    : "";

  useEffect(() => {
    if (localStorage.getItem("accesstoken")) {
      menuItem();
    }
  }, []);

  const closeSidebar = () => {
    dispatch(setSelectedMenu(true));
    if (width <= 1023) {
      dispatch(toggleSidebar(false));
    }
  };

  // El menu ya no depende del rol de OpenSign: `subSetting` (Preferencias y
  // Usuarios) se retiro porque ALI gobierna las cuentas del portal, asi que
  // admin y usuario ven exactamente lo mismo.
  const menuItem = async () => {
    setmenuList(sidebarList);
  };

  const toggleSubmenu = (title) => {
    dispatch(setSelectedMenu(false));
    setSubmenuOpen({ [title]: !submenuOpen[title] });
  };

  const handleMenuItem = () => {
    dispatch(setSelectedMenu(true));
    closeSidebar();
    setSubmenuOpen({});
  };
  const handleProfile = () => {
    closeSidebar();
    navigate("/profile");
  };
  return (
    <aside
      className={`absolute max-lg:min-h-screen lg:relative bg-base-100 overflow-y-auto transition-all z-[500] shadow-lg hide-scrollbar
     ${isOpen ? "w-full md:w-64" : "w-0"}`}
    >
      <div className="flex px-2 py-3 gap-2 items-center shadow-md">
        <div onClick={() => handleProfile()} className="cursor-pointer">
          <AliAvatar name={username} imageUrl={image} size={56} rounded="rounded-lg" />
        </div>
        <div>
          <p
            onClick={handleProfile}
            className="text-[14px] font-bold text-base-content cursor-pointer"
          >
            {username}
          </p>
          <p
            onClick={handleProfile}
            className={`cursor-pointer text-[12px] text-base-content ${
              tenantname ? "mt-2" : ""
            }`}
          >
            {tenantname}
          </p>
        </div>
      </div>
      <nav
        className="op-menu op-menu-sm"
        aria-label="ALI Firmas Sidebar Navigation"
      >
        <ul
          className="text-sm"
          role="menubar"
          aria-label="ALI Firmas Sidebar Navigation"
        >
          {menuList.map((item) =>
            !item.children ? (
              <Menu
                key={item.title}
                item={item}
                isOpen={isOpen}
                closeSidebar={handleMenuItem}
              />
            ) : (
              <Submenu
                key={item.title}
                item={item}
                closeSidebar={closeSidebar}
                toggleSubmenu={toggleSubmenu}
                submenuOpen={submenuOpen}
              />
            )
          )}
        </ul>
      </nav>
        <footer className="my-3 flex justify-center items-center text-[25px] text-base-content gap-3">
          <SocialMedia />
        </footer>
    </aside>
  );
};

export default Sidebar;
