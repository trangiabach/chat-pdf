"use client";

import { useTheme } from "next-themes";
import { MdOutlineWbSunny } from "react-icons/md";
import { GiMoonOrbit } from "react-icons/gi";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const themeSwitcherGraphic = {
  size: 18,
};

export const ThemeSwitcher = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="focus-visible:ring-0 h-4 w-4 md:h-10 md:w-10"
          variant="ghost"
          size="icon"
        >
          <MdOutlineWbSunny
            size={themeSwitcherGraphic.size}
            className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <GiMoonOrbit
            size={themeSwitcherGraphic.size}
            className="absolute scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
