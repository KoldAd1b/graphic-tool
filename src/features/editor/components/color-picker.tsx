import React from "react";
import { ChromePicker, CirclePicker } from "react-color";
import { colors } from "@/features/editor/types";
import { rgbaToString } from "../utlis";

type Props = {
  value: string | undefined;
  onChange: (value: string) => void;
};

const ColorPicker = ({ value, onChange }: Props) => {
  return (
    <div className="w-full space-y-4">
      <ChromePicker
        color={value}
        onChange={(color) => {
          const formattedValue = rgbaToString(color.rgb);
          onChange(formattedValue);
        }}
        className="border rounded-lg"
      />
      <CirclePicker
        color={value}
        colors={colors}
        onChangeComplete={(color) => {
          const formattedValue = rgbaToString(color.rgb);
          onChange(formattedValue);
        }}
      />
    </div>
  );
};

export default ColorPicker;
