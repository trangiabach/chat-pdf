"use client";

import { uploadFileToBucket } from "@/db/storage/helpers";
import { embedPdfs } from "@/lib/api/embed";
import { colors } from "@/lib/consts";
import { usePdfs } from "@/providers/PdfsProvider";
import { Pdf } from "@/types";
import { FC, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdOutlineDownloading } from "react-icons/md";
import { toast } from "@/components/ui/sonner";

export interface ChatPdfUploadZoneProps {
  setDialogOpen?: (open: boolean) => void;
}

export const ChatPdfUploadZone: FC<ChatPdfUploadZoneProps> = ({
  setDialogOpen,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [firstMount, setFirstMount] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const { refreshPdfs, setSelectedPdf, pdfs } = usePdfs();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const fileUploads = acceptedFiles.map((file) => uploadFileToBucket(file));

      setIsUploading(true);
      setError(undefined);

      const fileNamesString = acceptedFiles.map((file) => file.name).join(", ");

      toast(`Uploading files...`, {
        description: `Files ${fileNamesString}`,
      });

      const uploadedFiles = await Promise.all(fileUploads);

      const uploadedFilesString = uploadedFiles
        .map((file) => file.name)
        .join(", ");

      toast(
        "Sucessfully uploaded files. Beginning final step to embed files...",
        {
          description: `Files ${uploadedFilesString}`,
        }
      );

      const sucessfullyUploadedFiles = uploadedFiles.filter(
        (file) => file.error === undefined
      ) as Pdf[];

      const failedFiles = uploadedFiles.filter(
        (file) => file.error !== undefined
      );

      if (failedFiles.length > 0) {
        setError(
          `Failed to upload files ${failedFiles
            .map((file) => `${file.name} (${file.error})`)
            .join(", ")}`
        );

        setIsUploading(false);
      }

      toast(
        "Embedding files... After this, the file will be ready for chatting."
      );

      await embedPdfs(sucessfullyUploadedFiles);

      if (failedFiles.length <= 0) {
        await refreshPdfs();
      }

      setIsUploading(false);

      toast(`Sucessfully embedded files. It is ready for chatting!`, {
        description: `Files ${uploadedFilesString}`,
      });

      if (setDialogOpen && failedFiles.length <= 0) {
        setDialogOpen(false);
      }
    } catch (error: any) {
      console.log(error);

      const reportedError = error.message || JSON.stringify(error);

      toast(`Error encountered`, {
        description: reportedError,
      });

      setIsUploading(false);

      setError(reportedError);
    }
  }, []);

  useEffect(() => {
    setFirstMount(false);
    if (pdfs.length > 0 && !firstMount) {
      setSelectedPdf(pdfs[0]);
    }
  }, [pdfs]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <>
      {isUploading ? (
        <div className="h-[150px] w-full flex flex-col justify-center items-center space-y-2">
          <MdOutlineDownloading
            className="animate-spin"
            color={colors.primary}
            size={35}
          />
          <div className="text-sm">
            Uploading files... Please do not exit out of the dialog! This can
            take a few minutes if the PDF file is large.
          </div>
        </div>
      ) : (
        <div
          className="h-[150px] w-full flex items-center justify-center cursor-pointer border-primary border border-dashed rounded-sm"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag and drop some files here, or click to select files</p>
          )}
        </div>
      )}
      {error && (
        <div className="bg-red-500 px-2 py-1 text-sm text-white rounded-sm w-full flex flex-col space-y-1">
          <span>Uploading encountered error: </span>
          <span> {error}</span>
        </div>
      )}
    </>
  );
};
