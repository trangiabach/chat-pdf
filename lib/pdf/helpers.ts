export const sanitizeText = (text: string) => {
  return text.replace(/<[^>]*>/g, "").replace(/[^a-zA-Z0-9\s]/g, "");
};
