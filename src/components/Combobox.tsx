"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps {
  value: string,
  onChange: (value:string)=>void
}

const plantCategories = [
  {
    value: "",
    label: "None",
  },
  {
    value: "succulents",
    label: "Succulents",
  },
  {
    value: "ferns",
    label: "Ferns",
  },
  {
    value: "flowering",
    label: "Flowering",
  },
  {
    value: "herbs",
    label: "Herbs",
  },
  {
    value: "trees",
    label: "Trees",
  },
  {
    value: "vines",
    label: "Vines",
  },
  {
    value: "shrubs",
    label: "Shrubs",
  },
  {
    value: "grasses",
    label: "Grasses",
  },
  {
    value: "aquatic",
    label: "Aquatic",
  },
  {
    value: "carnivorous",
    label: "Carnivorous",
  },
];


export function Combobox({value, onChange}: ComboboxProps) {

  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? plantCategories.find((category) => category.value === value)?.label
            : "Select category..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {plantCategories.map((category) => (
                <CommandItem
                  key={category.value}
                  value={category.value}
                  onSelect={(currentValue) => {
                    setOpen(false)
                  }}
                >
                  {category.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === category.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
