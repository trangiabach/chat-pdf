import { Logo } from "./Logo";
import { Toolbar } from "./Toolbar";

export const Navbar = () => {
  return (
    <>
      <div className="top-0 sticky z-50 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 w-full">
        <div className="flex h-14 w-full items-center px-3 md:px-8">
          <Logo />
          <Toolbar />
        </div>
      </div>
    </>
  );
};
