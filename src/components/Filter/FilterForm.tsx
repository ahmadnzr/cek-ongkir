import { useContext } from "react";
import { Button } from "antd";
import styled, { css } from "styled-components";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { FilterInputs, IndicatorColor } from "../../helpers/types";
import { Colors, courierType, getCourierColor } from "../../helpers/utils";
import {
  useFecthCost,
  useFetchCity,
  useFetchProvince,
} from "../../helpers/hooks";
import { FilterResultCtx } from "../../helpers/lib";

import { Text } from "../Text";
import { InputSelect } from "../InputSelect";
import { ControlledInputNumber } from "../ControlledInputNumber";

export const FilterForm = () => {
  const { setResults } = useContext(FilterResultCtx);
  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { isValid },
  } = useForm<FilterInputs>();

  const fromProvince = watch("fromProvince");
  const toProvince = watch("toProvince");

  const { data: province } = useFetchProvince();
  const { data: cities } = useFetchCity({ provinceId: fromProvince });
  const { data: toCities } = useFetchCity({ provinceId: toProvince });
  const { mutate, isLoading } = useFecthCost();

  const onSubmit: SubmitHandler<FilterInputs> = (data) => {
    mutate(
      {
        origin: data.fromCity,
        destination: data.toCity,
        weight: (parseInt(data.weight) * 1000).toString(), // in gram
        courier: data.courier,
      },
      {
        onSuccess: (data) => {
          setResults(data.rajaongkir.results);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FilterContainer>
        <FilterItem>
          <Text size="lg" weight="bold">
            Asal
          </Text>
          <Item>
            <SelectFilter>
              <Text size="sm">Provinsi :</Text>
              <InputSelect
                control={control}
                name="fromProvince"
                options={province?.map((item) => ({
                  label: item.province,
                  value: item.province_id,
                }))}
              />
            </SelectFilter>
            <SelectFilter>
              <Text size="sm">Kota/Kabupaten :</Text>
              <InputSelect
                control={control}
                name="fromCity"
                options={cities?.map((item) => ({
                  label: item.city_name,
                  value: item.city_id,
                }))}
              />
            </SelectFilter>
          </Item>
        </FilterItem>
        <FilterItem>
          <Text size="lg" weight="bold">
            Tujuan
          </Text>
          <Item>
            <SelectFilter>
              <Text size="sm">Provinsi :</Text>
              <InputSelect
                control={control}
                name="toProvince"
                options={province?.map((item) => ({
                  label: item.province,
                  value: item.province_id,
                }))}
              />
            </SelectFilter>
            <SelectFilter>
              <Text size="sm">Kota/Kabupaten :</Text>
              <InputSelect
                control={control}
                name="toCity"
                options={toCities?.map((item) => ({
                  label: item.city_name,
                  value: item.city_id,
                }))}
              />
            </SelectFilter>
          </Item>
        </FilterItem>
        <FilterItem>
          <Text size="lg" weight="bold">
            Berat
          </Text>
          <Item>
            <SelectFilter>
              <ControlledInputNumber control={control} name="weight" />
            </SelectFilter>
          </Item>
        </FilterItem>
        <FilterItem>
          <Text size="lg" weight="bold">
            Kurir
          </Text>
          <Controller
            control={control}
            name="courier"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Item>
                {courierType.map((item) => (
                  <CourierCard
                    key={item.value}
                    $isActive={value === item.value}
                    $color={getCourierColor(item.value)}
                    onClick={() => onChange(item.value)}
                  >
                    {item.label}
                  </CourierCard>
                ))}
              </Item>
            )}
          />
        </FilterItem>
        <FilterButton>
          <Button
            className="primary-btn"
            loading={isLoading}
            type="primary"
            htmlType="submit"
            disabled={!isValid}
            style={{ gridColumn: "1/3" }}
          >
            Cek Ongkir
          </Button>
          <Button
            type="default"
            htmlType="reset"
            onClick={() => {
              reset();
              setResults([]);
            }}
          >
            Reset
          </Button>
          <Button disabled={!isValid}>Simpan Filter</Button>
        </FilterButton>
      </FilterContainer>
    </form>
  );
};

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FilterButton = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const Item = styled.div`
  display: flex;
  gap: 10px;
`;

const SelectFilter = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CourierCard = styled.div<{
  $isActive: boolean;
  $color: IndicatorColor;
}>`
  ${(props) => css`
    background: ${Colors.indicator[props.$color].bg};
    color: ${Colors.indicator[props.$color].fg};
    outline: 4px solid
      ${Colors.indicator[props.$color][props.$isActive ? "fg" : "bg"]};
  `};
  cursor: pointer;
  flex: 1;
  border: none;
  font-weight: 700;
  padding: 10px;
  border-radius: 10px;
  text-transform: uppercase;
  transition: 0.3s ease;
  text-align: center;
`;
