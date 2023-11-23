"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname(); //  アクティブなメニューを追跡するための状態

  const Menus = [
    { title: "home", icon: <HomeIcon />, link: "/", gap: false },
    {
      title: "images",
      icon: <IntegrationInstructionsIcon />,
      link: "/images",
      gap: false,
    },
    { title: "setting", icon: <SettingsIcon />, link: "/setting", gap: true },
  ];

  return (
    <aside>
      <div className="flex">
        <div
          className={`${
            open ? "w-40" : "w-20"
          } bg-dark-purple h-screen p-5 pt-8 relative duration-300`}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <ul className="pt-6">
            {Menus.map((menu, index) => (
              <Link href={menu.link} key={index}>
                <li
                  className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4
                ${menu.gap ? "mt-9" : "mt-2"} 
                ${pathname === menu.link && "bg-light-white"}`}
                >
                  {menu.icon}
                  <span
                    className={`${!open && "hidden"} origin-left duration-200 `}
                  >
                    {menu.title}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
