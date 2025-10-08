import { useState } from "react";
import { Link } from "react-router-dom";

import { TfiMenu } from "react-icons/tfi";
import { FiX } from "react-icons/fi";

import { RiAdminLine } from "react-icons/ri";

import logoHeader from "../assets/logo-header.svg";
import logoSidebar from "../assets/logo-sidebar.svg";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NossoTime from "@/pages/NossoTime/NossoTime";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="hidden lg:block absolute top-0 left-0 w-full z-30">
        <div className="max-w-[75rem] mx-auto px-5 flex justify-between items-center nav-text py-[1.875rem]">
          <Link to="/">
            <img
              src={logoHeader}
              alt="Logo do passa a bola na parte superior esquerda do site"
            />
          </Link>

          <nav>
            <ul className="flex gap-10 text-white">
              <li>
                <Link to="/" className="hover:text-pink">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/copa-pab" className="hover:text-pink">
                  Copa PAB
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-pink">
                  <Dialog>
                    <DialogTrigger className="cursor-pointer">Nosso Time</DialogTrigger>
                    <DialogContent className="sm:max-w-[73.25rem] overflow-y-auto max-h-[90vh]">
                      <DialogHeader></DialogHeader>
                      <NossoTime />
                    </DialogContent>
                  </Dialog>
                </Link>
              </li>
              <li>
                <Link to="" className="hover:text-pink">
                  Contato
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-3 text-white">
            <a
              href="#form"
              className="py-[0.30rem] px-[1.875rem] border-1 border-white rounded-[1.875rem] cursor-pointer"
            >
              Inscreva-se
            </a>
            <Link to="/login">
              <a className="py-[0.30rem] px-[3.125rem] bg-login-button rounded-[1.875rem] cursor-pointer">
                Login
              </a>
            </Link>
          </div>
        </div>
      </header>

      {/* Botão pra abrir o login */}
      <button
        className="fixed top-6 right-20 z-20 bg-white text-black p-2 rounded-full shadow-[0px_5px_15px_rgba(0,0,0,0.35)] lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Link to="/login">
          <RiAdminLine className="w-6 h-6" />
        </Link>
      </button>

      {/* Botão para abrir a Sidebar */}
      <button
        className="fixed top-6 right-5 z-20 bg-white text-black p-2 rounded-full shadow-[0px_5px_15px_rgba(0,0,0,0.35)] lg:hidden"
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
        className={`min-w-56 w-[50%] bg-white text-midnight h-dvh p-5 flex flex-col fixed top-0 right-0 z-30 lg:hidden transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-160"}`}
      >
        <div className="flex justify-between items-center">
          {/* Botão pra fechar a Sidebar */}
          <img src={logoSidebar} alt="Logo Passa a Bola" className="w-12" />
          <button onClick={() => setIsOpen(false)}>
            <FiX className="w-9 h-9" />
          </button>
        </div>

        <nav className="flex flex-col gap-3 mt-6">
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
