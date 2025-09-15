import { useState } from "react";
import { Link } from "react-router-dom";

import { TfiMenu } from "react-icons/tfi";
import { FiX } from "react-icons/fi";

import LogoSidebar from "../assets/logo-sidebar.svg";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* botão pra abrir a sidebar  */}
      <button
        className="fixed top-6 left-5 z-20 bg-white text-black p-2 rounded-full shadow-[0px_5px_15px_rgba(0,0,0,0.35)]  lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <TfiMenu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-20 transition-opacity duration-300 lg:hidden 
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`min-w-56 w-[50%] bg-white text-midnight h-screen p-5 flex flex-col fixed top-0 left-0 z-30 lg:hidden transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-160"}`}
      >
        <div className="flex justify-between">
          {/* botão pra fechar a SideBard */}
          <button onClick={() => setIsOpen(false)}>
            <FiX className="w-9 h-9" />
          </button>

          <img src={LogoSidebar} alt="" className="w-12" />
        </div>

        <nav className="flex flex-col gap-3">
          <Link to="/" className="p-2 border-b border-stroke-color">
            Home
          </Link>
          <Link to="/copa-pab" className="p-2 border-b border-stroke-color">
            Copa PAB
          </Link>
          <Link to="" className="p-2 border-b border-stroke-color">
            Nosso time
          </Link>
          <Link to="" className="p-2 border-b border-stroke-color">
            Contato
          </Link>
        </nav>
      </aside>
    </>
  );
}
