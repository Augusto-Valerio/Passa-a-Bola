import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import StatusFilter from "@/components/StatusFilter";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { FiUser } from "react-icons/fi";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogClose } from "@radix-ui/react-dialog";

export default function Inbox() {
  const [inscricoes, setInscricoes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [availableTeams, setAvailableTeams] = useState([]);

  useEffect(() => {
    fetchInscricoes();
    fetchAvailableTeams();
  }, []);

  async function fetchInscricoes() {
    setLoading(true);
    const { data, error } = await supabase
      .from("inscricoes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error(error);
    else setInscricoes(data || []);
    setLoading(false);
  }

  async function fetchAvailableTeams() {
    const { data: teamsData, error } = await supabase
      .from("inscricoes")
      .select("id, team, players")
      .eq("mode", "team")
      .eq("status", "Aceitos");

    if (error) return console.error(error);

    const teamsWithVacancy = (teamsData || [])
      .map((t) => {
        const playersCount = (t.players?.length || 0) + 1;
        return {
          id: t.id,
          name: t.team,
          playersCount,
        };
      })
      .filter((t) => t.playersCount < 12);

    setAvailableTeams(teamsWithVacancy);
  }

  const handleAcceptIndividual = async () => {
    if (!selected.teamId)
      return toast("Selecione um time antes de aceitar a jogadora.");

    const { data: teamData, error: teamError } = await supabase
      .from("inscricoes")
      .select("players")
      .eq("id", selected.teamId)
      .single();

    if (teamError) return console.error(teamError);

    const updatedPlayers = [
      ...(teamData.players || []),
      {
        name: selected.name,
        email: selected.email,
        phone: selected.phone,
        cpf: selected.cpf,
        shirt: selected.shirt,
        position: selected.position,
        leg: selected.leg,
        avatar: selected.avatar,
      },
    ];

    const { error: updateError } = await supabase
      .from("inscricoes")
      .update({ players: updatedPlayers })
      .eq("id", selected.teamId);

    if (updateError) return console.error(updateError);
  };

  const handleAccept = async () => {
    if (!selected) return;

    try {
      if (selected.mode === "individual") {
        await handleAcceptIndividual();
      } else if (selected.mode === "team") {
        const { error: teamError } = await supabase
          .from("teams")
          .insert([{ name: selected.team }]);
        if (teamError) throw teamError;
      }

      const { error: statusError } = await supabase
        .from("inscricoes")
        .update({ status: "Aceitos" })
        .eq("id", selected.id);

      if (statusError) throw statusError;

      setInscricoes((prev) =>
        prev.map((i) =>
          i.id === selected.id ? { ...i, status: "Aceitos" } : i
        )
      );
      setSelected(null);
      fetchAvailableTeams();

      if (selected.mode === "team") {
        toast("Time enviado à central de times com sucesso!", {
          type: "success",
        });
      } else if (selected.mode === "individual") {
        toast("Jogadora inscrita com sucesso!", { type: "success" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro ao aceitar inscrição.");
    }
  };

  const handleReject = async () => {
    if (!selected) return;

    try {
      const { error } = await supabase
        .from("inscricoes")
        .update({ status: "Rejeitados" })
        .eq("id", selected.id);

      if (error) throw error;

      setInscricoes((prev) =>
        prev.map((i) =>
          i.id === selected.id ? { ...i, status: "Rejeitados" } : i
        )
      );

      if (selected.mode === "team") {
        toast("Time rejeitado com sucesso!", { type: "error" });
      } else if (selected.mode === "individual") {
        toast("Jogadora rejeitada com sucesso!", { type: "error" });
      }

      setSelected(null);
      fetchAvailableTeams();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao rejeitar inscrição.");
    }
  };

  const renderJogadora = (p) => (
    <li
      key={p.email}
      className="flex flex-col gap-3 border border-stroke-color rounded-2xl p-3"
    >
      <div className="border-b border-gray-400 flex justify-center mb-2">
        {p.avatar ? (
          <img
            src={p.avatar}
            className="w-12 h-12 rounded-full object-cover mb-2"
            alt={p.name}
          />
        ) : (
          <FiUser size={48} className="text-gray-400 rounded-full mb-2" />
        )}
      </div>
      <div className="grid gap-2 divide-y divide-gray-400">
        <div>
          <h3 className="font-bold font-antonio">Nome:</h3>
          <p className="font-antonio text-[0.9375rem]">{p.name}</p>
        </div>
        <div>
          <h3 className="font-bold font-antonio">Email:</h3>
          <div className="font-antonio text-[0.9375rem]">{p.email}</div>
        </div>
        <div>
          <h3 className="font-bold font-antonio">Telefone:</h3>
          <div className="font-antonio text-[0.9375rem]">{p.phone}</div>
        </div>
        <div>
          <h3 className="font-bold font-antonio">CPF:</h3>
          <div className="font-antonio text-[0.9375rem]">{p.cpf}</div>
        </div>
        <div>
          <h3 className="font-bold font-antonio">Camisa:</h3>
          <div className="font-antonio text-[0.9375rem]">{p.shirt}</div>
        </div>
        <div>
          <h3 className="font-bold font-antonio">Posição:</h3>
          <div className="font-antonio text-[0.9375rem]">{p.position}</div>
        </div>
        <div>
          <h3 className="font-bold font-antonio">Perna dominante:</h3>
          <div className="font-antonio text-[0.9375rem]">{p.leg}</div>
        </div>
      </div>
    </li>
  );

  return (
    <section className="py-[2.6875rem] flex flex-col justify-center items-center">
      <div className="bg-white w-[80vw] rounded-2xl h-fit p-2 drop-shadow-[0px_0px_12.1px_rgba(0,0,0,0.26)]">
        <h1 className="font-antonio text-[1.75rem] text-center pt-6 pb-9">
          Caixa de entrada
        </h1>

        <StatusFilter onChange={setStatusFilter} />

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <ul className="space-y-3">
            {inscricoes
              .filter(
                (i) => statusFilter === "Todos" || i.status === statusFilter
              )
              .map((i) => (
                <li
                  key={i.id}
                  className="p-3 border-2 mt-2 flex justify-between items-center rounded-lg"
                >
                  <div>
                    <div className="font-semibold">{i.name}</div>
                    <div className="text-sm text-gray-500">
                      {i.mode === "team"
                        ? "Inscrição: Time"
                        : "Inscrição: Individual"}
                    </div>
                    <div className="text-xs text-gray-400">
                      Status: {i.status}
                    </div>
                  </div>
                  <Button
                    className="bg-pink text-white hover:bg-hover-pink cursor-pointer"
                    onClick={() => setSelected(i)}
                  >
                    Visualizar
                  </Button>
                </li>
              ))}
          </ul>
        )}

        <Dialog
          open={!!selected}
          onOpenChange={(open) => !open && setSelected(null)}
        >
          <DialogContent className="sm:max-w-[90rem] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-antonio">
                Detalhes da inscrição
              </DialogTitle>
            </DialogHeader>

            {selected && (
              <div className="space-y-4">
                {/* Jogadora info */}
                <div className="grid gap-4">
                  <div className="grid gap-3 border-2 border-stroke-color rounded-md p-2">
                    <h2 className="font-bold font-antonio text-xl place-self-center">
                      Responsável pela inscrição:
                    </h2>

                    <div className="w-20 h-20 rounded-full bg-gray-100 place-self-center flex items-center justify-center">
                      {selected.avatar ? (
                        <img
                          src={selected.avatar}
                          alt="avatar"
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <FiUser size={40} className="text-gray-400" />
                      )}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3 divide-y divide-stroke-color">
                      <div className="flex gap-1 items-center">
                        <span className="font-antonio font-semibold text-[1.125rem]">
                          Nome:
                        </span>
                        <span className="font-antonio text-[0.875rem]">
                          {selected.name}
                        </span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <span className="font-antonio font-semibold text-[1.125rem]">
                          Email:
                        </span>
                        <span className="font-antonio text-[0.875rem]">
                          {selected.email}
                        </span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <span className="font-antonio font-semibold text-[1.125rem]">
                          Telefone:
                        </span>
                        <span className="font-antonio text-[0.875rem]">
                          {selected.phone}
                        </span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <span className="font-antonio font-semibold text-[1.125rem]">
                          CPF:
                        </span>
                        <span className="font-antonio text-[0.875rem]">
                          {selected.cpf}
                        </span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <span className="font-antonio font-semibold text-[1.125rem]">
                          Camisa:
                        </span>
                        <span className="font-antonio text-[0.875rem]">
                          {selected.shirt}
                        </span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <span className="font-antonio font-semibold text-[1.125rem]">
                          Posição:
                        </span>
                        <span className="font-antonio text-[0.875rem]">
                          {selected.position}
                        </span>
                      </div>
                      <div className="flex gap-1 items-center">
                        <span className="font-antonio font-semibold text-[1.125rem]">
                          Perna dominante:
                        </span>
                        <span className="font-antonio text-[0.875rem]">
                          {selected.leg}
                        </span>
                      </div>

                      <div className="flex gap-1 items-center">
                        <span className="font-antonio font-semibold text-[1.125rem]">
                          Experiência profissional:
                        </span>
                        <span className="font-antonio text-[0.875rem]">
                          {selected.experience_professional
                            ? "Possui"
                            : "Nenhuma"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time info */}
                {selected.mode === "team" && selected.players && (
                  <div className="mt-3 border-2 border-stroke-color rounded-md p-2">
                    <h4 className="font-antonio font-bold text-xl mt-3 justify-self-center">
                      Informações do time
                    </h4>

                    {selected.team_logo && (
                      <div className="grid mt-3 p-2 justify-center place-items-center">
                        <img
                          src={selected.team_logo}
                          alt="logo do time"
                          className="w-28 h-28 object-cover rounded mt-2 border"
                        />

                        <div>
                          <div className="flex gap-1 border-b border-stroke-color mt-3 items-center">
                            <span className="font-antonio font-semibold text-[1.125rem]">
                              Nome do Time:
                            </span>
                            <span className="font-antonio text-[0.875rem]">
                              {selected.team}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-3">
                      <div className="font-bold font-antonio text-xl">
                        Jogadoras do time:
                      </div>
                      <ul className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {selected.players.map(renderJogadora)}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Individual */}
                {selected.mode === "individual" && (
                  <div className="mt-4">
                    <label className="block font-bold font-antonio mb-1">
                      Escolher time:
                    </label>

                    <Select
                      value={selected.teamId || ""}
                      onValueChange={(value) =>
                        setSelected((prev) => ({ ...prev, teamId: value }))
                      }
                    >
                      <SelectTrigger className="w-[100%] cursor-pointer ">
                        <SelectValue placeholder="Selecione um time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Times disponíveis</SelectLabel>
                          {availableTeams.length > 0 ? (
                            availableTeams.map((t) => (
                              <SelectItem
                                className="cursor-pointer"
                                key={t.id}
                                value={t.id}
                              >
                                {t.name} ({t.playersCount}/12 vagas)
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="none" disabled>
                              Nenhum time com vaga
                            </SelectItem>
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            <DialogFooter className="flex gap-2 mt-4">
              <Button
                onClick={handleReject}
                variant="outline"
                disabled={!selected || selected.status !== "Pendente"}
                className="cursor-pointer font-open-sans"
              >
                Rejeitar
              </Button>
              <Button
                onClick={handleAccept}
                className="bg-pink text-white hover:bg-hover-pink cursor-pointer font-open-sans"
                disabled={
                  !selected ||
                  selected.status !== "Pendente" ||
                  (selected.mode === "individual" && !selected.teamId)
                }
              >
                Aceitar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
