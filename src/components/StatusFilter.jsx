import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { RiArrowDownSLine } from "react-icons/ri";

// Lista de status com label e valor real do banco
const statuses = [
  { value: "Pendente", label: "Pendente" },
  { value: "Aceitos", label: "Aceitos" },
  { value: "Rejeitados", label: "Rejeitados" },
  { value: "Todos", label: "Todos" },
];

export default function StatusFilter({ onChange }) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(statuses[3]);

  const handleSelect = (status) => {
    setSelectedStatus(status);
    setOpen(false);
    if (onChange) onChange(status.value); // retorna label em português
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[150px] flex justify-between items-center cursor-pointer"
        >
          <span>{selectedStatus ? selectedStatus.label : "Todos"}</span>
          <RiArrowDownSLine className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar status..." />
          <CommandList>
            <CommandEmpty>Nenhum resultado</CommandEmpty>
            <CommandGroup>
              {statuses.map((status) => (
                <CommandItem
                  key={status.value}
                  value={status.value}
                  onSelect={() => handleSelect(status)}
                  className="cursor-pointer"
                >
                  {status.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
