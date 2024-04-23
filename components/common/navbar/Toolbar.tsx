import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { ThemeSwitcher } from "./ThemeSwitcher";

export const toolbarGraphic = {
  size: 18,
};

export const Toolbar = () => {
  return (
    <div className="flex flex-1 items-center justify-end">
      <div className="flex items-center space-x-2">
        <ThemeSwitcher />
        <Button className="px-1 md:px-2" variant="ghost" asChild>
          <Link
            className="flex md:space-x-2"
            target="_blank"
            href="https://github.com/trangiabach/chat-pdf"
          >
            <span className="text-xs hidden md:inline md:text-sm">
              Contribute
            </span>
            <FaGithub size={toolbarGraphic.size} />
          </Link>
        </Button>
      </div>
    </div>
  );
};
