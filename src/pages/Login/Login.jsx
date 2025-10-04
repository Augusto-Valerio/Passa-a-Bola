import { LoginForm } from "@/components/Login-form";
import { FiArrowLeft } from "react-icons/fi"; 

export default function Login() {
  return (
    <section className="bg-midnight h-screen flex items-center justify-center">
      <div className="w-full max-w-sm flex flex-col gap-4">
        {/* Botão Voltar */}
        <button
          className="flex items-center gap-2 text-white hover:underline self-start cursor-pointer"
          onClick={() => history.back()}
        >
          <FiArrowLeft size={20} />
          Voltar
        </button>

        {/* Login */}
        <LoginForm className="w-full" />
      </div>
    </section>
  );
}
