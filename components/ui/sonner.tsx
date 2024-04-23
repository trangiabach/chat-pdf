"use client";

import { useTheme } from "next-themes";
import { ReactNode } from "react";
import { ExternalToast, Toaster as Sonner } from "sonner";
import { toast as sonnerToast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

const toast = (message: string | ReactNode, data?: ExternalToast) => {
  sonnerToast(message, {
    ...data,
    action: {
      label: "Dismiss",
      onClick: () => console.log("dismissed"),
    },
  });
};

export { Toaster, toast };
