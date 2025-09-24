import { useState } from "react";
import { Link } from "react-router-dom";

import { TfiMenu } from "react-icons/tfi";
import { FiX } from "react-icons/fi";

import { LuUserRound } from "react-icons/lu";

import logoMobile from "../assets/logo-admin.svg";
import logoHeader from "../assets/logo-header.svg";

export default function NavbarAdmin() {
  return (
    <header className="bg-headerAdmin py-[12px] px-[21px]">
      <div className="flex items-center justify-between">
        <Link to="/time">
          <img src={logoMobile} alt="Logo passa a bola" className="sm:hidden" />
          <img src={logoHeader} alt="Logo passa a bola" className="hidden sm:block" />
        </Link>

        {/* botoes */}
        <div className="flex items-center gap-2">
          <LuUserRound color="white" className="sm:h-7 sm:w-7"/>
          <TfiMenu color="white" className="sm:h-7 sm:w-7"/>
        </div>
      </div>
    </header>
  );
}
