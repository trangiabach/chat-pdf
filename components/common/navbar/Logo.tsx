import { FaFilePdf } from "react-icons/fa";
import { IoSparklesSharp } from "react-icons/io5";
import { colors } from "@/lib/consts";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";

export const logoGraphicSize = 22;

export const logoGraphic = {
  size: 22,
  color: colors.primary,
};

export const Logo = () => {
  return (
    <Link href="/">
      <div className="mr-6 flex items-center space-x-2">
        <div className="flex space-x-1.5 text-primary items-center">
          <FaFilePdf color={logoGraphic.color} size={logoGraphic.size} />
          <FaPlus color={logoGraphic.color} size={logoGraphic.size / 2} />
          <IoSparklesSharp
            color={logoGraphic.color}
            size={logoGraphic.size - 4}
          />
        </div>
        <div className="flex space-x-2 text-sm md:text-md">
          <span className="inline-block text-gray-600">/</span>
          <span className="font-bold inline-block">ChatPDF</span>
        </div>
      </div>
    </Link>
  );
};
