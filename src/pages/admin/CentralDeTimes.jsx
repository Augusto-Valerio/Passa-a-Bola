import { useState } from "react";

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

import { Link } from "react-router-dom";

export default function CentralDeTimes() {
  // estado para lista dinâmica
  const [listaTimes, setListaTimes] = useState([
    "Time Wolves",
    "Time Raptors",
    "Time Aurora FC",
  ]);
  const [novoTime, setNovoTime] = useState("");

  return (
    <section className="py-[43px] flex flex-col justify-center items-center">
      <div
        className="bg-white w-[80vw] items-center rounded-2xl h-fit 
        drop-shadow-[0px_0px_12.1px_rgba(0,0,0,0.26)]"
      >
        <h1 className="font-antonio text-[28px] text-center pt-[30px] pb-[37px]">
          Central de times
        </h1>

        <ul className="divide-y divide-gray-200">
          {listaTimes.map((time, index) => (
            <li
              key={index}
              className={`${index % 2 === 0 ? "bg-[#D9D9D9]" : "bg-white"}`}
            >
              <Link to="/admin/time">
                <button
                  className="w-full text-left py-2 px-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => console.log(`Abrir ${time}`)}
                >
                  {time}
                </button>
              </Link>
            </li>
          ))}
        </ul>

        {/* Botão para adicionar time */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-pink text-white cursor-pointer hover:bg-hover-pink mt-3">
              Adicionar time
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (novoTime.trim() !== "") {
                  setListaTimes([...listaTimes, novoTime.trim()]);
                  setNovoTime("");
                }
              }}
            >
              <DialogHeader>
                <DialogTitle>Adicionar time</DialogTitle>
                <DialogDescription>
                  Escreva o nome do time para adicioná-lo.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 mt-4">
                <div className="grid gap-3">
                  <Label htmlFor="nome-time">Nome do time</Label>
                  <Input
                    id="nome-time"
                    value={novoTime}
                    onChange={(e) => setNovoTime(e.target.value)}
                    placeholder="Digite o nome"
                  />
                </div>
              </div>

              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancelar
                  </Button>
                </DialogClose>

                <DialogClose asChild>
                  <Button
                    type="submit"
                    className="bg-pink hover:bg-hover-pink cursor-pointer"
                  >
                    Salvar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
