import { Slider } from "@/components/ui/slider";
import { useSettings } from "@/providers/SettingsProvider";
import { useState } from "react";

export const ModelSettings = () => {
  const { settings, updateModelTemparature } = useSettings();

  const onValueChange = (values: number[]) => {
    if (values.length <= 0) {
      return;
    }

    const newValue = values[0];

    updateModelTemparature(newValue);
  };

  return (
    <div className="pt-6">
      <div className="flex-col flex space-y-3">
        <div className="flex flex-col space-y-1">
          <span className="text-sm flex space-x-2 items-center">
            <span>Model temparature</span>
            <span className="text-[0.7rem] px-[0.6rem] py-[0.2rem] bg-primary rounded-md text-white">
              {settings.model.temparature}
            </span>
          </span>
          <span className="text-[0.7rem] text-foreground opacity-80">
            Adjusts how the model can take risks (higher) or play it safe
            (lower)
          </span>
        </div>
        <div className="w-full flex space-x-2 text-sm items-center">
          <span>0</span>
          <Slider
            className="h-[0.3rem]"
            defaultValue={[settings.model.temparature]}
            max={1}
            step={0.1}
            min={0}
            onValueChange={onValueChange}
          />
          <span>1</span>
        </div>
      </div>
    </div>
  );
};
