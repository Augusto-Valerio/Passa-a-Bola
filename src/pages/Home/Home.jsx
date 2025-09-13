import Hero from "../../components/Hero";
import Stats from "../../components/Stats";

import Img1 from "../../assets/img1.png";
import Img2 from "../../assets/img2.png";
import Img3 from "../../assets/img3.png";
import Img4 from "../../assets/img4.png";

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

      <section
        id="project"
        className="bg-off-white py-[70px] lg:py-[100px] overflow-hidden"
      >
        <div
          id="container-project"
          className="max-w-[300px] mx-auto flex flex-col gap-2 lg:flex-row lg:gap-[74px] lg:max-w-[1000px] "
        >
          <div
            id="content-wrapper"
            className="flex flex-col items-center max-w-[456px]"
          >
            {/* Label */}
            <div className="flex items-center gap-2 mr-auto lg:mr-0 lg:ml-auto">
              <span className="text-purple section-label">O PROJETO</span>
              <div className="w-[40px] h-px bg-purple"></div>
            </div>

            {/* Título e texto */}
            <h2 className="heading-section text-midnight mt-[8px] lg:ml-auto">
              A COPA PASSA A BOLA
            </h2>
            <p className="body-text text-midnight lg:text-right mt-[30px]">
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
            <button className="py-[8px] px-[34px] rounded-[20px] bg-pink text-white button-text my-[32px] mr-auto lg:mr-0 lg:ml-auto">
              Nosso time
            </button>
          </div>

          {/* imagens */}
          <div className="relative flex mt-[10px] lg:block">
            <img src={Img1} className="w-[80%] lg:w-[100%]" alt="" />
            <img
              src={Img2}
              alt=""
              className="absolute w-[80%] bottom-[-90px] right-[-20px] lg:w-[100%] lg:bottom-[-80px] lg:right-[-170px]"
            />
          </div>
        </div>
      </section>

      <section id="about" className="bg-off-white py-[100px] overflow-hidden">
        <div
          id="about-container"
          className="max-w-[300px] mx-auto flex flex-col gap-[74px] lg:flex-row lg:max-w-[1000px]"
        >
          {/* imagens */}
          <div className="relative order-2 lg:order-1">
            <a href="https://www.youtube.com/@passabola" target="_blank">
              <img src={Img3} alt="" />
            </a>
            <a href="https://www.youtube.com/@passabola" target="_blank">
              <img
                src={Img4}
                alt=""
                className="absolute bottom-[-70px] left-[30px] lg:bottom-[-34px] lg:left-auto lg:right-[-40px]"
              />
            </a>
          </div>

          {/* textos e botão*/}
          <div id="about-wrapper" className="order-1 lg:order-2">
            <div className="flex items-center gap-2">
              <span className="text-red section-label">SOBRE NOS</span>
              <div className="w-[40px] h-px bg-red"></div>
            </div>

            <h2 className="heading-section text-midnight mt-[8px]">
              NO YOUTUBE
            </h2>

            <div className="max-w-[474px] mt-[30px] flex flex-col gap-4 body-text text-midnight">
              <p>
                O canal Passa a Bola é comandado por Alê Xavier e Luana Maluf,
                duas criadoras de conteúdo que usam informação, leveza e
                representatividade para impulsionar o futebol feminino. Através
                de vídeos, entrevistas e coberturas de eventos, o canal conecta
                jogadoras, torcedoras e entusiastas da modalidade.
              </p>

              <p>
                A proposta é ampliar o espaço das mulheres no esporte com
                conteúdo acessível, atual e envolvente. O Passa a Bola se tornou
                uma referência na mídia digital esportiva, aproximando o público
                da realidade e do potencial do futebol feminino.
              </p>
            </div>

            <a
              href="https://www.youtube.com/@passabola"
              target="_blank"
              className="inline-block py-[8px] px-[34px] rounded-[20px] bg-pink text-white button-text mt-[32px]"
            >
              Veja mais
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
