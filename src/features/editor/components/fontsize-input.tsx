import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus } from "lucide-react";
import React from "react";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

const FontSizeInput = ({ value, onChange }: Props) => {
  const increment = () => {
    onChange(value + 1);
  };
  const decrement = () => {
    onChange(value - 1);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 500) {
      return onChange(500);
    }
    if (value < 0) {
      return onChange(0);
    }
    onChange(value);
  };
  return (
    <div className="flex items-center ">
      <Button
        onClick={decrement}
        variant={"outline"}
        className="rounded-none border-r-0 rounded-r-none"
        size={"icon"}
      >
        <Minus className="size-4" />
      </Button>
      <Input
        onChange={handleChange}
        value={value ? value : 0}
        className="w-[50px] h-8 focus-visible:ring-offset-0 focus-visible:ring-0 rounded-none"
      />
      <Button
        onClick={increment}
        variant={"outline"}
        className="rounded-none border-l-0 rounded-l-none"
        size={"icon"}
      >
        <Plus className="size-4" />
      </Button>
    </div>
  );
};

export default FontSizeInput;
