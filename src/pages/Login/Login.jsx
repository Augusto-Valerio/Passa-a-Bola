// pages/login.tsx
import { LoginForm } from "@/components/Login-form";

export default function Login() {
  return (
    <>
      <section className="bg-midnight h-screen flex items-center justify-center">
        <LoginForm className="w-full max-w-sm" />
      </section>
    </>
  );
}
