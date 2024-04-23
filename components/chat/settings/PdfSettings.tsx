import { Separator } from "@/components/ui/separator";
import { usePdfs } from "@/providers/PdfsProvider";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { PdfOption } from "./PdfOption";

export const PdfSettings = () => {
  const { pdfs } = usePdfs();

  return (
    <div className="pt-6">
      <div className="flex-col flex space-y-3">
        <div className="flex flex-col space-y-1">
          <span className="text-sm flex space-x-2 items-center">
            <span>Uploaded PDFs</span>
          </span>
          <span className="text-[0.7rem] text-foreground opacity-80">
            The PDFs you have uploaded so far
          </span>
        </div>
        <ScrollArea className="h-60 rounded-md border border-border/40 overflow-y-auto">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-semibold leading-none">PDFs</h4>
            {pdfs.length === 0 && (
              <div className="h-full text-[0.7rem] flex items-center justify-center">
                No PDFs detected
              </div>
            )}
            {pdfs.map((pdf) => (
              <PdfOption key={pdf.id} pdf={pdf} />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
