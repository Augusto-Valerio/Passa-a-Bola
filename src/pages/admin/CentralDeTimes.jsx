import { supabase } from "@/lib/supabase";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { toast } from "sonner";

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

export default function CentralDeTimes() {
  const [listaTimes, setListaTimes] = useState([]);
  const [novoTime, setNovoTime] = useState("");

  useEffect(() => {
    fetchTimes();
  }, []);

  async function fetchTimes() {
    const { data: times, error: timesError } = await supabase
      .from("teams")
      .select("*")
      .order("created_at", { ascending: false });

    if (timesError) {
      console.error("Erro ao buscar times:", timesError);
      return;
    }

    const updatedTimes = await Promise.all(
      times.map(async (time) => {
        const { data: inscricao } = await supabase
          .from("inscricoes")
          .select("team_logo")
          .eq("team", time.name)
          .limit(1)
          .single();

        if (inscricao?.team_logo && inscricao.team_logo !== time.logo) {
          await supabase
            .from("teams")
            .update({ logo: inscricao.team_logo })
            .eq("id", time.id);

          return { ...time, logo: inscricao.team_logo };
        }

        return time;
      })
    );

    setListaTimes(updatedTimes);
  }

  const adicionarTime = async (e) => {
    e.preventDefault();
    if (!novoTime.trim()) return;

    const { data, error } = await supabase
      .from("teams")
      .insert([{ name: novoTime }])
      .select();

    if (error) {
      console.error("Erro ao adicionar time:", error);
    } else {
      setListaTimes((prev) => [data[0], ...prev]);
      setNovoTime("");
    }
  };

  async function gerarConfrontos() {
    try {
      const { data: times, error } = await supabase.from("teams").select("*");

      if (error) throw error;
      if (!times || times.length < 2) {
        toast("É necessário ter pelo menos 2 times para gerar confrontos.");
        return;
      }

      await supabase.from("matches").delete().neq("id", 0);

      const shuffled = [...times].sort(() => Math.random() - 0.5);

      const matches = [];
      for (let i = 0; i < shuffled.length; i += 2) {
        if (i + 1 < shuffled.length) {
          matches.push({
            team_a: shuffled[i].id,
            team_b: shuffled[i + 1].id,
            court: Math.floor(Math.random() * 10) + 1,
            date: new Date().toISOString().split("T")[0],
            time: "11:00",
          });
        }
      }

      const { error: insertError } = await supabase
        .from("matches")
        .insert(matches);

      if (insertError) throw insertError;

      toast.success("Confrontos gerados com sucesso!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao gerar confrontos. Veja o console.");
    }
  }

  return (
    <>
      <section className="py-[2.6875rem] flex flex-col justify-center items-center">
        <div
          className="bg-white w-[80vw] items-center rounded-2xl h-fit 
        drop-shadow-[0px_0px_12.1px_rgba(0,0,0,0.26)]"
        >
          <h1 className="font-antonio text-[1.75rem] text-center pt-[1.875rem] pb-[2.3125rem]">
            Central de times
          </h1>

          {listaTimes.length === 0 ? (
            <p className="text-center text-gray-500 font-open-sans">
              Nenhum time inscrito
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {listaTimes.map((time, index) => (
                <li
                  key={time.id}
                  className={`
                  ${index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}
                  ${index === listaTimes.length - 1 ? "rounded-b-2xl" : ""}
                `}
                >
                  <Link
                    to={`/admin/time/${time.id}`}
                    className="w-full text-left py-2 px-3 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
                  >
                    {time.logo ? (
                      <img
                        src={time.logo}
                        alt={time.name}
                        className="w-8 h-8 object-cover rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">
                        {time.name[0]}
                      </div>
                    )}
                    <span className="font-antonio">{time.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <div className="grid place-self-center w-[80vw]">
        <Button
          onClick={gerarConfrontos}
          className="bg-pink hover:bg-hover-pink cursor-pointer font-antonio rounded-[0.3125rem] text-white py-[5px] transition"
        >
          Gerar Confrontos
        </Button>
      </div>
    </>
  );
}
