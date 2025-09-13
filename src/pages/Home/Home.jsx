import Hero from "../../components/Hero";
import Img1 from "../../assets/img1.png";
import Img2 from "../../assets/img2.png";
import Stats from "../../components/Stats";

export default function Home() {
  return (
    <>
      <Hero
        title="INSCRIÇÕES ABERTAS PARA COPA PAB"
        subtitle="Participe como jogadora avulsa, time completo ou incompleto.
        Garanta sua vaga e entre em campo com a gente!"
        buttonText="Inscreva-se"
        bgClass="bg-hero-home"
      />

      <section id="project" className="bg-off-white">
        <div
          id="container"
          className="max-w-[300px] mx-auto flex flex-col gap-2 py-[60px] lg:flex lg:flex-row lg:gap-[74px] lg:max-w-[1000px] overflow-hidden"
        >
          <div
            id="content-wrapper"
            className="flex flex-col items-center  max-w-[456px]"
          >
            {/* Label */}
            <div className="flex items-center gap-2 lg:ml-auto">
              <div className="w-[40px] h-px bg-purple lg:hidden"></div>
              <span className="text-purple section-label">O PROJETO</span>
              <div className="w-[40px] h-px bg-purple"></div>
            </div>

            {/* Título e texto */}
            <h2 className="heading-section text-midnight mt-[8px] lg:ml-auto">
              A COPA PASSA A BOLA
            </h2>
            <p className="body-text text-midnight text-center mt-[30px] lg:text-right">
              A Copa Passa a Bola é um campeonato voltado para mulheres, com
              foco em inclusão, equilíbrio e organização. A plataforma
              automatiza inscrições, forma times com jogadoras avulsas e separa
              atletas profissionais para partidas mais justas. Também permite
              reaproveitar jogadoras eliminadas e preencher vagas em times
              incompletos. Tudo para tornar o futebol feminino mais acessível e
              acolhedor.
            </p>

            <Stats />

            {/* Botão */}
            <button className="py-[8px] px-[34px] rounded-[20px] bg-pink text-white button-text w-fit mt-[32px] lg:ml-auto">
              Nosso time
            </button>
          </div>

          {/* imagens */}
          <div className="relative flex justify-center lg:block">
            <img src={Img1} className="w-[200px] lg:w-[100%]" alt="" />
            <img
              src={Img2}
              className="absolute w-[220px]  bottom-[-40px] right-[-10px] lg:w-[100%] lg:bottom-[-80px] lg:right-[-170px]"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}
