"use client";

import { getAllFilesWithinBucket } from "@/db/storage/helpers";
import { Pdf } from "@/types";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface PdfsContextProps {
  pdfs: Pdf[];
  selectedPdf?: Pdf;
  setSelectedPdf: (pdf: Pdf) => void;
  refreshPdfs: () => Promise<void>;
}

const PdfsContext = createContext<PdfsContextProps | undefined>(undefined);

export const usePdfs = () => {
  const context = useContext(PdfsContext);

  if (!context) {
    throw new Error("usePdfs must be used within a PdfsProvider");
  }

  return context;
};

interface PdfsProviderProps extends PropsWithChildren {}

export const PdfsProvider: FC<PdfsProviderProps> = ({ children }) => {
  const [pdfs, setPdfs] = useState<Pdf[]>([]);
  const [selectedPdf, setSelectedPdf] = useState<Pdf | undefined>(undefined);

  useEffect(() => {
    getAllFilesWithinBucket().then((files) => {
      setPdfs(files);
    });
  }, []);

  const refreshPdfs = async () => {
    const files = await getAllFilesWithinBucket();
    setPdfs(files);
  };

  useEffect(() => {
    const doesSelectedPdfExist = pdfs.find((pdf) => pdf.id === selectedPdf?.id);

    if (!doesSelectedPdfExist) {
      setSelectedPdf(undefined);
    }
  }, [pdfs]);

  const value = useMemo(
    () => ({
      pdfs,
      selectedPdf,
      setSelectedPdf,
      refreshPdfs,
    }),
    [pdfs, setPdfs, selectedPdf, setSelectedPdf, refreshPdfs]
  );

  return <PdfsContext.Provider value={value}>{children}</PdfsContext.Provider>;
};
