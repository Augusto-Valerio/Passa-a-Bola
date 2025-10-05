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

  const [proximos, setProximos] = useState([]);
  const [classificacao, setClassificacao] = useState([]);

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
        time,
        score_a,
        score_b
      `
      )
      .order("date", { ascending: true })
      .order("time", { ascending: true });

    if (error) {
      console.error("Erro ao buscar próximos jogos:", error);
      return;
    }

    setProximos(data);
    calcularClassificacao(data);
  }

  function calcularClassificacao(matches) {
    const tabela = {};

    matches.forEach((match) => {
      const teamA = match.team_a?.name;
      const teamB = match.team_b?.name;

      if (!teamA || !teamB) return;

      if (!tabela[teamA]) {
        tabela[teamA] = {
          nome: teamA,
          logo: match.team_a?.logo || logoPab,
          jogos: 0,
          vitorias: 0,
          empates: 0,
          derrotas: 0,
          golsPro: 0,
          golsContra: 0,
          pontos: 0,
        };
      }
      if (!tabela[teamB]) {
        tabela[teamB] = {
          nome: teamB,
          logo: match.team_b?.logo || logoPab,
          jogos: 0,
          vitorias: 0,
          empates: 0,
          derrotas: 0,
          golsPro: 0,
          golsContra: 0,
          pontos: 0,
        };
      }

      if (match.score_a === null || match.score_b === null) return;

      const timeA = tabela[teamA];
      const timeB = tabela[teamB];

      timeA.jogos++;
      timeB.jogos++;

      timeA.golsPro += match.score_a;
      timeA.golsContra += match.score_b;

      timeB.golsPro += match.score_b;
      timeB.golsContra += match.score_a;

      if (match.score_a > match.score_b) {
        timeA.vitorias++;
        timeA.pontos += 3;
        timeB.derrotas++;
      } else if (match.score_a < match.score_b) {
        timeB.vitorias++;
        timeB.pontos += 3;
        timeA.derrotas++;
      } else {
        timeA.empates++;
        timeB.empates++;
        timeA.pontos += 1;
        timeB.pontos += 1;
      }
    });

    const ranking = Object.values(tabela).sort((a, b) => {
      if (b.pontos !== a.pontos) return b.pontos - a.pontos;
      const saldoA = a.golsPro - a.golsContra;
      const saldoB = b.golsPro - b.golsContra;
      if (saldoB !== saldoA) return saldoB - saldoA;
      return b.golsPro - a.golsPro;
    });

    setClassificacao(ranking);
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

        <div className="overflow-x-auto w-full max-w-[95%] mx-auto rounded-md bg-white ">
          <div className="min-w-[650px]">
            <div className="flex bg-off-white items-center h-12 border-b border-gray-200 sm:justify-between">
              <div className="flex items-center gap-3 sticky left-0 z-10 w-[180px] flex-shrink-0 pl-3 bg-off-white bg">
                <p className="w-6 text-center font-semibold">Pos</p>
                <p className="font-medium text-sm">Time</p>
              </div>
              <div className="flex items-center gap-6 px-4 text-sm font-semibold flex-shrink-0 ">
                <h3 className="w-6 text-center">PJ</h3>
                <h3 className="w-6 text-center">V</h3>
                <h3 className="w-6 text-center">E</h3>
                <h3 className="w-6 text-center">D</h3>
                <h3 className="w-6 text-center">GP</h3>
                <h3 className="w-6 text-center">GC</h3>
                <h3 className="w-6 text-center">SG</h3>
                <h3 className="w-6 text-center">Pts</h3>
              </div>
            </div>

            {classificacao.map((item, index) => (
              <Positions
                key={item.nome}
                pos={index + 1}
                clube={item.nome}
                logo={item.logo}
                jogos={item.jogos}
                vitorias={item.vitorias}
                empates={item.empates}
                derrotas={item.derrotas}
                golsPro={item.golsPro}
                golsContra={item.golsContra}
                pontos={item.pontos}
              />
            ))}
          </div>
        </div>

        <button className="font-open-sans font-light text-[0.875rem] bg-pink hover:bg-hover-pink rounded-[1.25rem] mt-10 py-[0.6875rem] px-[0.9375rem] w-fit self-center text-white cursor-pointer">
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
