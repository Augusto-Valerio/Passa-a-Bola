import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import StatusFilter from "@/components/StatusFilter";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { FiUser } from "react-icons/fi";

export default function Inbox() {
  const [inscricoes, setInscricoes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Todos");

  useEffect(() => {
    fetchInscricoes();
  }, []);

  async function fetchInscricoes() {
    setLoading(true);
    const { data, error } = await supabase
      .from("inscricoes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar inscrições:", error);
    } else {
      setInscricoes(data);
    }
    setLoading(false);
  }

  async function updateStatus(id, newStatus) {
    const { error } = await supabase
      .from("inscricoes")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status.");
    } else {
      // se for aceitação de time, adiciona o time no CentralDeTimes
      const inscricao = inscricoes.find((i) => i.id === id);
      if (newStatus === "Aceitos" && inscricao?.mode === "team") {
        const { error: teamError } = await supabase
          .from("teams")
          .insert([{ name: inscricao.team }]);
        if (teamError) console.error("Erro ao criar time:", teamError);
      }

      setInscricoes((prev) =>
        prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
      );

      setSelected(null);
    }
  }

  return (
    <section className="py-[2.6875rem] flex flex-col justify-center items-center">
      <div
        className="bg-white w-[80vw] items-center rounded-2xl h-fit 
        drop-shadow-[0px_0px_12.1px_rgba(0,0,0,0.26)] p-2"
      >
        <h1 className="font-antonio text-[1.75rem] text-center pt-[1.875rem] pb-[2.3125rem]">
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
                  className="p-3 border-2 mt-2 flex justify-between items-center rounded-[0.8125rem]"
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

                  <div className="flex gap-2">
                    <Button
                      className=" bg-pink text-white hover:bg-hover-pink cursor-pointer"
                      onClick={() => setSelected(i)}
                    >
                      Visualizar
                    </Button>
                  </div>
                </li>
              ))}
          </ul>
        )}

        {/* Modal de visualização */}
        <Dialog
          open={!!selected}
          onOpenChange={(open) => !open && setSelected(null)}
        >
          <DialogContent className="sm:max-w-[39.0625rem] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes da inscrição</DialogTitle>
            </DialogHeader>

            {selected && (
              <div className="mt-2 space-y-2">
                <div className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                    {selected.avatar ? (
                      <img
                        src={selected.avatar}
                        alt="avatar escolhido pela jogadora"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <FiUser size={40} className="text-gray-400" />
                    )}
                  </div>
                  <div className="grid gap-3">
                    <h2 className="font-bold">
                      Jogadora que inscreveu o time:
                    </h2>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <strong>Nome:</strong> {selected.name}
                      </div>
                      <div>
                        <strong>Email:</strong> {selected.email}
                      </div>
                      <div>
                        <strong>Telefone:</strong> {selected.phone}
                      </div>
                      <div>
                        <strong>CPF:</strong> {selected.cpf}
                      </div>
                      <div>
                        <strong>Camisa:</strong> {selected.shirt}
                      </div>
                      <div>
                        <strong>Posição:</strong> {selected.position}
                      </div>
                      <div>
                        <strong>Perna dominante:</strong> {selected.leg}
                      </div>
                    </div>
                  </div>
                </div>

                {selected.mode === "team" && (
                  <>
                    <div className="mt-3">
                      <div className="font-semibold">
                        <p>Nome do Time:</p> {selected.team}
                      </div>
                      {selected.team_logo && (
                        <img
                          src={selected.team_logo}
                          alt="logo do time escolhido"
                          className="w-28 h-28 object-cover rounded mt-2"
                        />
                      )}
                    </div>

                    <div className="mt-3">
                      <div className="font-bold">Jogadoras do time:</div>
                      <ul className="mt-2 grid grid-cols-2 gap-2">
                        {(selected.players || []).map((p, idx) => (
                          <li
                            key={idx}
                            className="flex flex-col gap-3 border-2 rounded-2xl p-3"
                          >
                            <div className="border-b-2 flex justify-center mb-2">
                              {p.avatar ? (
                                <img
                                  src={p.avatar}
                                  className="w-12 h-12 rounded-full object-cover mb-2"
                                  alt={p.name}
                                />
                              ) : (
                                <FiUser
                                  size={48}
                                  className="text-gray-400 bg-off-white rounded-full mb-2"
                                />
                              )}
                            </div>
                            <div className="grid gap-2">
                              <div>
                                <h3 className="font-bold">Nome:</h3>
                                <p>{p.name}</p>
                              </div>
                              <div>
                                <h3 className="font-bold">Email:</h3>
                                <div>{p.email}</div>
                              </div>
                              <div>
                                <h3 className="font-bold">Telefone:</h3>
                                <div>{p.phone}</div>
                              </div>
                              <div>
                                <h3 className="font-bold">CPF:</h3>
                                <div>{p.cpf}</div>
                              </div>
                              <div>
                                <h3 className="font-bold">Camisa:</h3>
                                <div>{p.shirt}</div>
                              </div>
                              <div>
                                <h3 className="font-bold">Posição:</h3>
                                <div>{p.position}</div>
                              </div>
                              <div>
                                <h3 className="font-bold">Perna dominante:</h3>
                                <div>{p.leg}</div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            )}

            <DialogFooter className="flex gap-2 mt-4">
              <Button
                onClick={() => updateStatus(selected.id, "Rejeitados")}
                disabled={!selected || selected.status !== "Pendente"}
                className="cursor-pointer"
                variant="outline"
              >
                Rejeitar
              </Button>

              <Button
                onClick={() => updateStatus(selected.id, "Aceitos")}
                disabled={!selected || selected.status !== "Pendente"}
                className=" bg-pink text-white hover:bg-hover-pink cursor-pointer"
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
