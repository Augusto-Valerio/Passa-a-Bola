import Hero from "../../components/Hero";
import Stats from "../../components/Stats";
import Benefits from "../../components/Benefits";
import Form from "../../components/Form";

import Img1 from "../../assets/img1.png";
import Img2 from "../../assets/img2.png";
import Img3 from "../../assets/img3.png";

import Calendar from "../../assets/calendar.svg";
import Match from "../../assets/match.svg";
import Reload from "../../assets/reload.svg";

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
          id="project-container"
          className="max-w-[62.5em] px-[2.375rem] mx-auto flex flex-col lg:flex-row lg:gap-[4.625rem] lg:px-[0]"
        >
          <div
            id="project-wrapper"
            className="flex flex-col items-center max-w-[456px] mx-auto"
          >
            {/* Label */}
            <div className="flex items-center gap-2 mr-auto lg:mr-0 lg:ml-auto">
              <span className="text-purple section-label">O PROJETO</span>
              <div className="w-[40px] h-px bg-purple"></div>
            </div>

            {/* Título e texto */}
            <h2 className="heading-section text-midnight mt-[8px] mr-auto lg:ml-auto lg:mr-0">
              A COPA PASSA A BOLA
            </h2>
            <p className="body-text text-midnight lg:text-right mt-[30px] ">
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

          <div className=" mt-[10px] max-w[456px] mx-auto">
            <img src={Img1} className="" alt="" />
          </div>
        </div>
      </section>

      <section id="about" className="bg-off-white py-[100px] overflow-hidden">
        <div
          id="about-container"
          className="max-w-[62.5em] px-[2.375rem] mx-auto flex flex-col justify-between lg:flex-row lg:px-0 lg:gap-[76px]"
        >
          {/* imagens */}
          <div className="relative order-2 lg:order-1 max-w[456px] mx-auto">
            <a href="https://www.youtube.com/@passabola" target="_blank">
              <img src={Img2} alt="" />
            </a>
            <a href="https://www.youtube.com/@passabola" target="_blank">
              <img
                src={Img3}
                alt=""
                className="absolute bottom-[-35%] right-[-10%] lg:bottom-[10px] lg:left-auto lg:right-[-40px]"
              />
            </a>
          </div>

          {/* textos e botão*/}
          <div
            id="about-wrapper"
            className="order-1 lg:order-2 max-w-[456px] mx-auto"
          >
            {/* label */}
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
              className="inline-block py-[8px] px-[34px] rounded-[20px] bg-pink text-white button-text my-[32px]"
            >
              Veja mais
            </a>
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-off-white">
        <div
          id="benefits-container"
          className="max-w-[800px] lg:max-w-[62.5em] mx-auto px-[2.375rem]"
        >
          <div id="benefits-wrapper" className="flex flex-col gap-[30px]">
            {/* label */}
            <div className="flex items-center gap-6 justify-center mt-[100px]">
              <div className="w-[40px] h-px bg-purple"></div>
              <span className="text-purple section-label whitespace-nowrap">
                POR QUE JOGAR COM A GENTE?
              </span>
              <div className="w-[40px] h-px bg-purple"></div>
            </div>

            {/* Benefícios */}
            <div className="bg-white flex flex-col rounded-[5px] py-[40px] px-[68px] shadow-[0px_0px_40px_rgba(0,0,0,0.25)] lg:flex-row">
              <Benefits
                imgClass={Match}
                title="Match perfeito"
                subtitle="Os confrontos são organizados por nível, garantindo partidas equilibradas e seguras para todas as jogadoras."
              />
              <div className="border-b border-gray-base my-[40px] lg:my-0 lg:mx-[40px] lg:border-l"></div>
              <Benefits
                imgClass={Reload}
                title="Fase de grupos"
                subtitle="A fase de grupos evita eliminações precoces e garante que todas joguem mais de uma vez."
              />
              <div className="border-b border-gray-base my-[40px] lg:my-0 lg:mx-[40px] lg:border-l"></div>
              <Benefits
                imgClass={Calendar}
                title="Tudo em Tempo Real"
                subtitle="Horários, quadras e atualizações são acessados direto na plataforma, com nova partida realocada em caso de W.O."
              />
            </div>
          </div>
        </div>
      </section>

      <section id="form" className="bg-off-white py-[100px]">
        <div
          id="form-container"
          className="max-w-[62.5em] px-[2.375rem] mx-auto flex flex-col gap-12 lg:flex-row lg:px-[0]"
        >
          <div
            id="content-wrapper"
            className="flex flex-col items-center max-w-[456px] mx-auto lg:mx-0"
          >
            {/* Label */}
            <div className="flex items-center gap-2 mr-auto ">
              <div className="w-[40px] h-px bg-purple"></div>
              <span className="text-purple section-label">FORMULÁRIO</span>
            </div>

            {/* Título e texto */}
            <h2 className="heading-section text-midnight mt-[8px] mr-auto">
              SE INSCREVA
            </h2>
            <p className="body-text text-midnight mt-[30px] ">
              Quer jogar a Copa Passa a Bola? Preencha o formulário para mostrar
              seu interesse, seja com um time completo, incompleto ou como
              jogadora avulsa. Nossa plataforma cuida do resto: forma equipes,
              organiza os jogos e garante uma experiência divertida, justa e
              acolhedora. Esse é o primeiro passo pra entrar no campeonato de
              forma simples e descomplicada. Depois do cadastro, a gente entra
              em contato com todos os detalhes. Bora jogar com a gente?
            </p>
          </div>

          <Form />
        </div>
      </section>
    </>
  );
}
