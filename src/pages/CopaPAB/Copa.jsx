import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

import HeroPage from "../../components/HeroPage";
import GameCards from "../../components/GameCards";
import Positions from "../../components/Positions";
import NextGame from "../../components/NextGame";
import Footer from "../../components/Footer";

import time1 from "../../assets/time1.png";
import time2 from "../../assets/time2.png";
import time3 from "../../assets/time3.png";
import time4 from "../../assets/time4.png";
import time5 from "../../assets/time5.png";
import time6 from "../../assets/time6.png";
import time7 from "../../assets/time7.png";
import time8 from "../../assets/time8.png";
import Navbar from "../../components/Navbar";
import logoPab from "../../assets/icon-pab.png";
import BackTop from "../../components/BackTop";

export default function Copa() {
  const games = [
    {
      icon1: time8,
      desc: "imagem blabla",
      icon2: time1,
      dia: "sex, 11 de nov.",
      onde: "quadra 1",
    },
    {
      icon1: time2,
      desc: "imagem blabla",
      icon2: time3,
      dia: "sex, 11 de nov.",
      onde: "quadra 1",
    },
    {
      icon1: time4,
      desc: "imagem blabla",
      icon2: time5,
      dia: "sex, 11 de nov.",
      onde: "quadra 1",
    },
  ];

  const jogos = [
    {
      pos: "1",
      clube: "TIME PASSABOLA",
      jogos: "40",
      vitorias: "20",
      pontos: "30",
    },
    {
      pos: "2",
      clube: "TIME PASSABOLA",
      jogos: "40",
      vitorias: "20",
      pontos: "30",
    },
    {
      pos: "3",
      clube: "TIME PASSABOLA",
      jogos: "40",
      vitorias: "20",
      pontos: "30",
    },
    {
      pos: "4",
      clube: "TIME PASSABOLA",
      jogos: "40",
      vitorias: "20",
      pontos: "30",
    },
    {
      pos: "5",
      clube: "TIME PASSABOLA",
      jogos: "40",
      vitorias: "20",
      pontos: "30",
    },
    {
      pos: "6",
      clube: "TIME PASSABOLA",
      jogos: "40",
      vitorias: "20",
      pontos: "30",
    },
  ];

  const [proximos, setProximos] = useState([]);

  async function fetchProximos() {
    const { data, error } = await supabase
      .from("matches")
      .select(
        `
        id,
        team_a (id, name, logo),
        team_b (id, name, logo),
        court,
        date,
        time
      `
      )
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    if (error) {
      console.error("Erro ao buscar próximos jogos:", error);
      return;
    }

    setProximos(data);
  }

  useEffect(() => {
    fetchProximos();
  }, []);
  return (
    <>
      <BackTop />
      <Navbar />
      <HeroPage
        title="A COPA PAB ESTÁ ACONTECENDO!"
        subtitle="Confira os jogos, horários, resultados e acompanhe tudo em tempo real. Fique por dentro e torça com a gente!"
        buttonText="Acompanhe"
        bgClass="bg-hero-copa"
      />

      <section className="flex flex-col justify-center py-9 px-3 overflow-hidden bg-off-white ">
        <h2 className="font-bold font-antonio text-[2.5rem] lg:hidden place-self-center mb-2">
          Últimos Jogos
        </h2>
        <div
          id="last-games"
          className="flex flex-row gap-5 overflow-x-auto snap-x lg:justify-center lg:overflow-visible items-center"
        >
          {games.map((item) => (
            <div className="shrink-0 ">
              <GameCards
                icon1={item.icon1}
                desc={item.desc}
                icon2={item.icon2}
                dia={item.dia}
                onde={item.onde}
              />
            </div>
          ))}
          <h2 className="font-bold font-antonio text-[2.5rem] hidden lg:block">
            Últimos <br /> Jogos
          </h2>
        </div>
      </section>

      <section className="bg-white flex flex-col justify-center py-14">
        <div className="flex justify-center ">
          <span className="text-red section-label">TABELA</span>
        </div>

        <h2 className="flex justify-center heading-section pb-10 text-midnight mt-[0.5rem]">
          TABELA
        </h2>

        <div className="flex justify-center flex-col items-center">
          <div className="bg-off-white flex flex-row items-center justify-between px-3 h-12 w-[95%] rounded-md">
            <div className="flex gap-8 ml-3">
              <h3>POS</h3>
              <h3>TIME</h3>
            </div>
            <div className="flex gap-8 mr-3">
              <h3>J</h3>
              <h3>V</h3>
              <h3>PTS</h3>
            </div>
          </div>
          <div className="flex flex-col">
            {jogos.map((item) => (
              <div className="">
                <Positions
                  pos={item.pos}
                  clube={item.clube}
                  jogos={item.jogos}
                  vitorias={item.vitorias}
                  pontos={item.pontos}
                />
              </div>
            ))}
          </div>
        </div>

        <button className="bg-pink rounded-[1.25rem] mt-10 py-[0.6875rem] px-[0.9375rem] w-fit self-center text-white">
          SAIBA MAIS
        </button>
      </section>

      <section className="bg-off-white flex justify-center flex-col items-center py-12">
        <div className="flex items-center gap-6 justify-center ">
          <div className="w-[2.5rem] h-px bg-purple"></div>
          <span className="text-purple section-label whitespace-nowrap">
            FIQUE DE OLHO
          </span>
          <div className="w-[2.5rem] h-px bg-purple"></div>
        </div>
        <h2 className="flex justify-center heading-section pb-6 text-midnight mt-4 mb-6">
          PROXIMOS JOGOS
        </h2>

        <div className="grid gap-8">
          {proximos.map((item, index) => (
            <NextGame
              key={item.id}
              num={index + 1}
              quadra={item.court || "-"}
              hora={item.time || "-"}
              img1={item.team_a?.logo || logoPab}
              nomeTime={item.team_a?.name || "Time A"}
              img2={item.team_b?.logo || logoPab}
              nomeTime2={item.team_b?.name || "Time B"}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
