export default function Form() {
  return (
    <form className="flex flex-col items-center gap-[14px] mx-auto lg:w-full lg:max-w-[335px] lg:mx-0 lg:ml-auto">
      <h1 className="heading-form">Inscreva-se</h1>

      <div id="input-wrapper" className="flex flex-col lg:w-full mt-4">
        {/* Nome */}
        <label htmlFor="name" className="relative mb-5">
          <input
            type="text"
            id="name"
            name="name"
            placeholder=" "
            required
            className="peer w-full border-b border-stroke-color outline-0 pt-2"
          />
          <span
            className={
              "absolute left-0 -top-3 text-sm transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-midnight peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink cursor-text"
            }
          >
            Nome completo
          </span>
        </label>

        {/* Email */}
        <label htmlFor="email" className="relative mb-5">
          <input
            type="email"
            id="email"
            name="email"
            placeholder=" "
            required
            className="peer w-full border-b border-stroke-color outline-0 pt-2 "
          />
          <span
            className={
              "absolute left-0 -top-3 text-sm transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-midnight peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink cursor-text"
            }
          >
            E-mail para contato
          </span>
        </label>

        {/* Telefone */}
        <label htmlFor="phone" className="relative mb-5">
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder=" "
            required
            className="peer w-full border-b border-stroke-color outline-0 pt-2"
          />
          <span
            className={
              "absolute left-0 -top-3 text-sm transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-midnight peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink cursor-text"
            }
          >
            Telefone
          </span>
        </label>

        {/* Time */}
        <label htmlFor="team" className="relative mb-10">
          <input
            type="text"
            id="team"
            name="team"
            placeholder=" "
            required
            className="peer w-full border-b border-stroke-color outline-0 pt-2"
          />
          <span
            className={
              "absolute left-0 -top-3 text-sm transition-all duration-200 peer-placeholder-shown:top-1 peer-placeholder-shown:text-midnight peer-focus:-top-3 peer-focus:text-sm peer-focus:text-pink cursor-text whitespace-nowrap"
            }
          >
            CPF
          </span>
        </label>

        <p className="form-caption lg:text-xs mb-11 lg:max-w-[292px]">
          Seus dados estão seguros. Use o formulário para começar seu cadastro
          com tranquilidade.
        </p>

        <button
          type="submit"
          className="py-[12px] rounded-[20px] bg-pink text-white button-text button-form cursor-pointer"
        >
          Continuar
        </button>
      </div>
    </form>
  );
}
