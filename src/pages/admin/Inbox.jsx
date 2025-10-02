// src/pages/admin/inbox.jsx
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
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

export default function Inbox() {
  const [inscricoes, setInscricoes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

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

  async function updateStatus(id, status) {
    const { error } = await supabase
      .from("inscricoes")
      .update({ status })
      .eq("id", id);
    if (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status.");
    } else {
      fetchInscricoes();
      setSelected(null);
    }
  }

  return (
    <section className="py-[43px] flex flex-col justify-center items-center">
      <div
        className="bg-white w-[80vw] items-center rounded-2xl h-fit 
        drop-shadow-[0px_0px_12.1px_rgba(0,0,0,0.26)]"
      >
        <h1 className="font-antonio text-[28px] text-center pt-[30px] pb-[37px]">
          Caixa de entrada
        </h1>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          <ul className="space-y-3">
            {inscricoes.map((i) => (
              <li
                key={i.id}
                className="p-3 border flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">{i.name}</div>
                  <div className="text-sm text-gray-500">
                    {i.mode === "team" ? "Time" : "Individual"}
                  </div>
                  <div className="text-xs text-gray-400">
                    Status: {i.status}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => setSelected(i)}>Visualizar</Button>
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
          <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Detalhes da inscrição</DialogTitle>
            </DialogHeader>

            {selected && (
              <div className="mt-2 space-y-2">
                <div className="flex gap-4 items-center">
                  {selected.avatar && (
                    <img
                      src={selected.avatar}
                      alt="avatar"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  )}
                  <div className="grid gap-3">
                    <h2 className="font-bold">Capitão do time:</h2>

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
                          alt="team logo"
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
                            {p.avatar && (
                              <div className="border-b-2">
                                <img
                                  src={p.avatar}
                                  className="w-12 h-12 rounded-full object-cover justify-self-center mb-2"
                                  alt={p.name}
                                />
                              </div>
                            )}
                            <div>
                              <div>
                                <strong>Nome:</strong> {p.name}
                              </div>
                              <div>
                                <strong>Email:</strong> {p.email}
                              </div>
                              <div>
                                <strong>Telefone:</strong> {p.phone}
                              </div>
                              <div>
                                <strong>CPF:</strong> {p.cpf}
                              </div>
                              <div>
                                <strong>Camisa:</strong> {p.shirt}
                              </div>
                              <div>
                                <strong>Posição:</strong> {p.position}
                              </div>
                              <div>
                                <strong>Perna dominante:</strong> {p.leg}
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
              <Button variant="ghost" onClick={() => setSelected(null)}>
                Fechar
              </Button>
              <Button onClick={() => updateStatus(selected.id, "accepted")}>
                Aceitar
              </Button>
              <Button onClick={() => updateStatus(selected.id, "rejected")}>
                Rejeitar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
