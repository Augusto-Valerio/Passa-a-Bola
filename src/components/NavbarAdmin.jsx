import { useState } from "react";
import { Link } from "react-router-dom";

import { TfiMenu } from "react-icons/tfi";
import { FiX } from "react-icons/fi";

import { LuUserRound } from "react-icons/lu";

import logoMobile from "../assets/logo-admin.svg";
import logoHeader from "../assets/logo-header.svg";

export default function NavbarAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-headerAdmin py-[12px] px-[21px]">
        <div className="flex items-center justify-between">
          <Link to="time">
            <img
              src={logoMobile}
              alt="Logo passa a bola"
              className="sm:hidden h-7"
            />
            <img
              src={logoHeader}
              alt="Logo passa a bola"
              className="hidden sm:block"
            />
          </Link>

          {/* botoes */}
          <div className="flex items-center gap-2">
            <button>
              <LuUserRound color="white" className="h-7 w-7" />
            </button>
            <button onClick={() => setIsOpen(true)}>
              <TfiMenu color="white" className="h-7 w-7 cursor-pointer" />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`
        fixed inset-0 bg-black/50 backdrop-blur-sm z-20 transition-opacity duration-300
        cursor-pointer
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`min-w-56 w-[50%] bg-white text-midnight h-screen p-5 flex flex-col fixed top-0 right-0 z-30 transform transition-transform duration-300 lg:w-0 lg:text-white lg:bg-midnight
              ${
                isOpen ? "translate-x-0" : "translate-x-160 lg:translate-x-300"
              }`}
      >
        <div className="flex justify-end">
          {/* Botão pra fechar a Sidebar */}
          <button onClick={() => setIsOpen(false)}>
            <FiX className="w-9 h-9 cursor-pointer" />
          </button>
        </div>

        <nav className="flex flex-col gap-3 mt-6">
          <Link
            to="/"
            className="p-2 border-b border-stroke-color"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/admin"
            className="p-2 border-b border-stroke-color"
            onClick={() => setIsOpen(false)}
          >
            Central de Times
          </Link>
          <Link
            to="/admin/dashboard"
            className="p-2 border-b border-stroke-color"
            onClick={() => setIsOpen(false)}
          >
            Estatísticas
          </Link>
        </nav>
      </aside>
    </>
  );
}
