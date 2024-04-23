import { Pdf } from "@/types";
import { bucket } from "./bucket";

export const getAllFilesWithinBucket = async () => {
  const { data, error } = await bucket.list("", {
    sortBy: {
      column: "created_at",
      order: "desc",
    },
  });

  if (error) {
    console.log(error);
  }

  return data
    ?.filter((file) => file.name !== ".emptyFolderPlaceholder")
    .map((file) => {
      return {
        name: file.name,
        url: bucket.getPublicUrl(file.name).data.publicUrl,
        id: file.id,
      };
    }) as Pdf[];
};

export const uploadFileToBucket = async (file: File) => {
  const { data, error } = await bucket.upload(file.name, file);

  if (error) {
    console.log(error);

    return {
      name: file.name,
      error: error.message,
    };
  }

  const uploadedFile: Pdf = {
    name: file.name,
    url: bucket.getPublicUrl(file.name).data.publicUrl,
    id: data.id,
  };

  return uploadedFile;
};

export const deleteFileFromBucket = async (fileNames: string[]) => {
  const { data, error } = await bucket.remove(fileNames);

  if (error) {
    console.log(error);

    return {
      error: error.message,
    };
  }

  console.log(data);

  return data;
};
