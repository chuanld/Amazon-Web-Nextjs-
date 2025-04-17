import React, {useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { CategoryItems } from "@/type";
import Link from "next/link";
import { usePathname } from "next/navigation";


const CategoryListView = ({categories}:CategoryItems) => {
  const [open, setOpen] = useState(false);
  const params = usePathname();


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-auto justify-between rounded-none rounded-tl-md rounded-bl-md text-black/80 capitalize border-r-2 hover:border-amazonOrangeDark hoverEffect`}
        >
          All
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Command className="bg-amazonBlue backdrop-blur-md text-white">
          <CommandInput placeholder="Search Category" className="h-9" />
          <CommandList>
            
            
            <CommandGroup className="text-white">
            {
              categories?.length > 0 ? (
                categories.map((item:string) => (
                  <CommandItem key={item} className={`${params.includes(item) ? 'bg-white/20' : ''}
                  text-white hover:bg-amazonOrange/20 hoverEffect`}>
                    <Link href={`/category/${item}`} className={`flex items-center w-full h-full `} onClick={() => setOpen(false)}>
                      {item}
                    </Link>
                  </CommandItem>
                ))
              ):(
                <CommandEmpty>No categories found.</CommandEmpty>
              )
            }
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryListView;
