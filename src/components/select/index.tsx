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
    <div>
      <Select onValueChange={(value) => onValueChange(Number(value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white">
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
