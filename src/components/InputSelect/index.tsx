import React from "react";
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
}

export const InputSelect = <T extends FieldValues, Y extends Path<T>>({
  control,
  name,
  options,
}: InputSelectProps<T, Y>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field: { onChange, value } }) => (
        <Select
          allowClear
          value={value}
          options={options}
          placeholder="Pilih"
          onChange={onChange}
        />
      )}
    />
  );
};
