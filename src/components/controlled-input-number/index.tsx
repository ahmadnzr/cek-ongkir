import { InputNumber } from "antd";
import {
  Controller,
  type FieldValues,
  type UseControllerProps,
  type Path,
} from "react-hook-form";
import { type DefaultOptionType } from "antd/es/select";

interface ControlledInputNumberProps<T extends FieldValues, Y extends Path<T>>
  extends UseControllerProps<T, Y> {
  options?: DefaultOptionType[];
}

export const ControlledInputNumber = <
  T extends FieldValues,
  Y extends Path<T>,
>({
  control,
  name,
}: ControlledInputNumberProps<T, Y>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <InputNumber
          addonAfter="Kg"
          style={{ width: "100px" }}
          value={value || undefined}
          min={1}
          max={100}
          onChange={onChange}
        />
      )}
    />
  );
};
