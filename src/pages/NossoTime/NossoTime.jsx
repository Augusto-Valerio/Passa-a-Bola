import CardNossoTime from "@/components/CardNossoTime";
import LuanaMaluf from "@/assets/LuanaMaluf.png";
import AlexandraXavier from "@/assets/AleXavier.png";
import MarcelaDantas from "@/assets/MarcelaDantas.png";
import Logo from "@/assets/logo-admin.svg";

export default function NossoTime() {
  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      {/* Card de apresentação "Nosso Time" */}
      <div className=" col-span-1 bg-pink text-white rounded-[0.625rem] p-3 flex flex-col items-center gap-[3.125rem] pt-[3.75rem]">
        <img src={Logo} alt="logo" className="w-25 h-25 mb-4" />
        <h2 className="text-2xl font-bold mb-4 font-antonio text-[2.5rem] ">
          NOSSO TIME
        </h2>
        <p className="max-w-[11.438rem] text-center font-antonio font-light text-[0.75rem]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>

      {/* Cards de integrantes */}
      <div className="col-span-3 grid grid-cols-3 gap-6">
        <CardNossoTime
          nome="Luana Maluf"
          imagem={LuanaMaluf}
          cargo="Administradora"
          data="2018 - 2020"
        />

        <CardNossoTime
          nome="Alexandra Xavier"
          imagem={AlexandraXavier}
          cargo="Administradora"
          data="2018 - 2020"
        />

        <CardNossoTime
          nome="Marcela Dantas"
          imagem={MarcelaDantas}
          cargo="Midias sociais"
          data="2018 - 2020"
        />

        <CardNossoTime
          nome="Luana Maluf"
          imagem={LuanaMaluf}
          cargo="Administradora"
          data="2018 - 2020"
        />

        <CardNossoTime
          nome="Alexandra Xavier"
          imagem={AlexandraXavier}
          cargo="Administradora"
          data="2018 - 2020"
        />

        <CardNossoTime
          nome="Marcela Dantas"
          imagem={MarcelaDantas}
          cargo="Midias sociais"
          data="2018 - 2020"
        />
      </div>
    </div>
  );
}
