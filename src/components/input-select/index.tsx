import { Select } from "antd";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
  type Path,
} from "react-hook-form";
import { type DefaultOptionType } from "antd/es/select";

interface InputSelectProps<T extends FieldValues, Y extends Path<T>>
  extends UseControllerProps<T, Y> {
  options?: DefaultOptionType[];
  customOnChange?: (data: string) => void;
}

export const InputSelect = <T extends FieldValues, Y extends Path<T>>({
  control,
  name,
  options,
  customOnChange,
}: InputSelectProps<T, Y>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <Select
          allowClear
          value={value || undefined}
          options={options}
          placeholder="Pilih"
          onChange={(val) => {
            if (typeof customOnChange === "function" && val) {
              customOnChange(val);
            }
            onChange(val);
          }}
        />
      )}
    />
  );
};
