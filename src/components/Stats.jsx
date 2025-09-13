import Check from "../assets/check.svg";

export default function Stats() {
  return (
    <div className="flex gap-8 mt-[30px] lg:ml-auto">
      <div className="text-center">
        <div className="flex items-center gap-2 text-sm text-midnight font-open-sans">
          <span>
            <img src={Check} alt="Ícone de verificado" />
          </span>
          <span>JOGADORES</span>
        </div>
        <p className="text-midnight text-[20px] font-bold font-antonio">+170</p>
      </div>

      <div className="text-center">
        <div className="flex items-center gap-2 text-sm text-midnight font-open-sans">
          <span>
            <img src={Check} alt="Ícone de verificado" />
          </span>
          <span>JOGOS</span>
        </div>
        <p className="text-midnight text-[20px] font-bold font-antonio">+15</p>
      </div>

      <div className="text-center">
        <div className="flex items-center gap-2 text-sm text-midnight font-open-sans">
          <span>
            <img src={Check} alt="Ícone de verificado" />
          </span>
          <span>QUADRAS</span>
        </div>
        <p className="text-midnight text-[20px] font-bold font-antonio">+8</p>
      </div>
    </div>
  );
}
