"use client";

import React, { SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  placeholder: string;
  onValueChange: React.Dispatch<React.SetStateAction<string | number>>;
  options: { value: string | number; label: string | number }[];
};

const SelectComponent: React.FC<Props> = ({
  placeholder,
  onValueChange,
  options,
}) => {
  return (
    <div className="">
      <Select onValueChange={(value) => onValueChange(value)}>
        <SelectTrigger className="w-[200px] sm:w-[180px] focus:ring-0">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className=" flex justify-end">
          {options.map((option) => (
            <SelectItem key={option.value} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectComponent;
