import HeroPage from "../../components/HeroPage";
import Stats from "../../components/Stats";
import Benefits from "../../components/Benefits";
import Form from "../../components/Form";
import Footer from "../../components/Footer";
import BackTop from "../../components/BackTop";
import Navbar from "../../components/Navbar";

import Img1 from "../../assets/img1.png";
import Img2 from "../../assets/img2.png";
import Img3 from "../../assets/img3.png";
import Appito from "../../assets/appito.png";
import Adidas from "../../assets/adidas.png";
import Playstation from "../../assets/playstation.png";
import Pepsi from "../../assets/pepsi.png";
import Cimed from "../../assets/cimed.png";

import Calendar from "../../assets/calendar.svg";
import Match from "../../assets/match.svg";
import Reload from "../../assets/reload.svg";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NossoTime from "../NossoTime/NossoTime";
import Maps from "@/components/Maps";

export default function Home() {
  return (
    <section>
      <Navbar />

      <BackTop />

      <HeroPage
        title="INSCRIÇÕES ABERTAS PARA COPA PAB"
        subtitle="Participe como jogadora avulsa, time completo ou incompleto.
        Garanta sua vaga e entre em campo com a gente!"
        buttonText="Inscreva-se"
        bgClass="bg-hero-home"
        buttonHref="#form"
      />

      <section
        id="project"
        className="bg-off-white py-[4.375rem] lg:py-[6.25rem] overflow-hidden"
      >
        <div
          id="project-container"
          className="max-w-[62.5rem] px-[2.375rem] mx-auto flex flex-col lg:flex-row lg:gap-[4.625rem] lg:px-[0]"
        >
          <div
            id="project-wrapper"
            className="flex flex-col items-center max-w-[28.5rem] mx-auto"
          >
            {/* Label */}
            <div className="flex items-center gap-2 mr-auto lg:mr-0 lg:ml-auto">
              <span className="text-purple section-label">O PROJETO</span>
              <div className="w-[2.5rem] h-px bg-purple"></div>
            </div>

            {/* Título e texto */}
            <h2 className="heading-section text-midnight mt-[0.5rem] mr-auto lg:ml-auto lg:mr-0">
              A COPA PASSA A BOLA
            </h2>
            <p className="body-text text-midnight lg:text-right mt-[1.875rem] ">
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

            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button className="py-[0.5rem] px-[2.125rem] rounded-[1.25rem] bg-pink text-white button-text my-[2rem] mr-auto lg:mr-0 lg:ml-auto cursor-pointer hover:bg-hover-pink">
                    Nosso Time
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[73.25rem] overflow-y-auto max-h-[90vh]">
                  <DialogHeader></DialogHeader>
                  <NossoTime />          
                </DialogContent>
              </form>
            </Dialog>
          </div>

          <div className=" mt-[0.625rem] max-w[28.5rem] mx-auto">
            <img
              src={Img1}
              className=""
              alt="Imagem das criadoras do Passa A Bola e imagem de um trofeu"
            />
          </div>
        </div>
      </section>

      <section id="about" className="bg-off-white py-[6.25rem] overflow-hidden">
        <div
          id="about-container"
          className="max-w-[62.5em] px-[2.375rem] mx-auto flex flex-col justify-between lg:flex-row lg:px-0 lg:gap-[4.75rem]"
        >
          {/* imagens */}
          <div className="relative order-2 lg:order-1 max-w[28.5rem] mx-auto">
            <a href="https://www.youtube.com/@passabola" target="_blank">
              <img
                src={Img2}
                alt="Imagem das criadoras do Passa A Bola com fundo rosa"
              />
            </a>
            <a href="https://www.youtube.com/@passabola" target="_blank">
              <img
                src={Img3}
                alt="Imagem do Header do canal do Passa A Bola do Youtube"
                className="absolute bottom-[-35%] right-[-10%] lg:bottom-[0.625rem] lg:left-auto lg:right-[-2.5rem]"
              />
            </a>
          </div>

          {/* textos e botão*/}
          <div
            id="about-wrapper"
            className="order-1 lg:order-2 max-w-[28.5rem] mx-auto"
          >
            {/* label */}
            <div className="flex items-center gap-2">
              <span className="text-red section-label">SOBRE NOS</span>
              <div className="w-[2.5rem] h-px bg-red"></div>
            </div>

            <h2 className="heading-section text-midnight mt-[0.5rem]">
              NO YOUTUBE
            </h2>

            <div className="max-w-[29.625rem] mt-[1.875rem] flex flex-col gap-4 body-text text-midnight">
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
              className="inline-block py-[0.5rem] px-[2.125rem] rounded-[1.25rem] bg-pink hover:bg-hover-pink cursor-pointer text-white button-text my-[2rem]"
            >
              Veja mais
            </a>
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-off-white">
        <div
          id="benefits-container"
          className="max-w-[50rem] lg:max-w-[62.5rem] mx-auto px-[2.375rem]"
        >
          <div id="benefits-wrapper" className="flex flex-col gap-[1.875rem]">
            {/* label */}
            <div className="flex items-center gap-6 justify-center mt-[6.25rem]">
              <div className="w-[2.5rem] h-px bg-purple"></div>
              <span className="text-purple section-label whitespace-nowrap">
                POR QUE JOGAR COM A GENTE?
              </span>
              <div className="w-[2.5rem] h-px bg-purple"></div>
            </div>

            {/* Benefícios */}
            <div className="bg-white flex flex-col rounded-[0.313rem] py-[2.5rem] px-[4.25rem] shadow-[0px_0px_40px_rgba(0,0,0,0.25)] lg:flex-row">
              <Benefits
                imgClass={Match}
                title="Match perfeito"
                subtitle="Os confrontos são organizados por nível, garantindo partidas equilibradas e seguras para todas as jogadoras."
              />
              <div className="border-b border-gray-base my-[2.5rem] lg:my-0 lg:mx-[2.5rem] lg:border-l"></div>
              <Benefits
                imgClass={Reload}
                title="Fase de grupos"
                subtitle="A fase de grupos evita eliminações precoces e garante que todas joguem mais de uma vez."
              />
              <div className="border-b border-gray-base my-[2.5rem] lg:my-0 lg:mx-[2.5rem] lg:border-l"></div>
              <Benefits
                imgClass={Calendar}
                title="Tudo em Tempo Real"
                subtitle="Horários, quadras e atualizações são acessados direto na plataforma, com nova partida realocada em caso de W.O."
              />
            </div>
          </div>
        </div>
      </section>

      <section id="form" className="bg-off-white py-[11.625rem]">
        <div
          id="form-container"
          className="max-w-[62.5rem] px-[2.375rem] mx-auto flex flex-col gap-12 lg:flex-row lg:px-[0]"
        >
          <div
            id="content-wrapper"
            className="flex flex-col items-center max-w-[28.5rem] mx-auto lg:mx-0"
          >
            {/* Label */}
            <div className="flex items-center gap-2 mr-auto ">
              <div className="w-[2.5rem] h-px bg-purple"></div>
              <span className="text-purple section-label">FORMULÁRIO</span>
            </div>

            {/* Título e texto */}
            <h2 className="heading-section text-midnight mt-[0.5rem] mr-auto">
              SE INSCREVA
            </h2>
            <p className="body-text text-midnight mt-[1.875rem] ">
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

      <Maps />
      
      <section id="partners" className="bg-off-white py-20 flex flex-col justify-center">
        {/* label */}
        <div className="flex items-center gap-6 justify-center">
          <div className="w-[2.5rem] h-px bg-purple"></div>
          <span className="text-purple section-label whitespace-nowrap">
            PARCEIROS COPA PAB 2025
          </span>
          <div className="w-[2.5rem] h-px bg-purple"></div>
        </div>

        {/* Patrocinadores */}
        <div className="grid grid-cols-3 place-self-center gap-3 lg:grid-cols-5 lg:max-w-[56.25rem] lg:gap-[4.375rem] items-center mt-12">
          <a href="https://appito.com/" target="_blank">
            <img src={Appito} alt="Appito" />
          </a>

          <a href="https://www.adidas.com.br/" target="_blank">
            <img src={Adidas} alt="Adidas" />
          </a>

          <a href="https://www.playstation.com/pt-br/" target="_blank">
            <img src={Playstation} alt="Playstation" />
          </a>

          <a href="https://www.pepsi.pt/" target="blank">
            <img src={Pepsi} alt="Pepsi" />
          </a>

          <a href="https://cimedremedios.com.br/" target="_blank">
            <img src={Cimed} alt="Cimed" />
          </a>
        </div>
      </section>

      <Footer />
    </section>
  );
}
