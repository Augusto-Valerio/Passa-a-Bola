import NavbarAdmin from "@/components/NavbarAdmin";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <NavbarAdmin />
      <div className="bg-off-white min-h-screen">
        <Outlet />
      </div>
    </>
  );
}
