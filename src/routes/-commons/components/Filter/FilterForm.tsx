import { useContext } from "react";
import { Button, Modal } from "antd";
import styled, { css } from "styled-components";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { FilterInputs, IndicatorColor, SaveFilterType } from "@helpers/types";
import {
  Colors,
  courierType,
  getCourierColor,
  getLocalStorage,
} from "@helpers/utils";
import { useFetchCost, useFetchCity, useFetchProvince } from "@helpers/hooks";
import { FilterResultCtx } from "@helpers/lib";

import { Text, InputSelect, ControlledInputNumber } from "@components";

export const FilterForm = () => {
  const { setResults, setHistory, defaultFilter } = useContext(FilterResultCtx);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
    getValues,
    watch,
    setValue,
  } = useForm<FilterInputs>({
    values: {
      fromProvince: defaultFilter?.fromProvince?.province_id,
      toProvince: defaultFilter?.toProvince?.province_id,
      fromCity: defaultFilter?.fromCity?.city_id,
      toCity: defaultFilter?.toCity?.city_id,
      weight: defaultFilter?.weight,
      courier: defaultFilter?.courier,
    },
  });

  const fromProvince = watch("fromProvince");
  const toProvince = watch("toProvince");

  const { data: province } = useFetchProvince();
  const { data: fromCities } = useFetchCity(fromProvince);
  const { data: toCities } = useFetchCity(toProvince);
  const { mutate, isLoading } = useFetchCost();

  const onSubmit: SubmitHandler<FilterInputs> = (data) => {
    const { fromCity, toCity, weight, courier } = data;
    if (!fromCity || !toCity || !weight || !courier) return;

    mutate(
      {
        origin: fromCity,
        destination: toCity,
        weight: (parseInt(weight) * 1000).toString(), // in gram
        courier,
      },
      {
        onSuccess: (data) => {
          setResults(data.rajaongkir.results);
        },
      },
    );
  };

  const handleSave = () => {
    try {
      const { fromProvince, toProvince, fromCity, toCity, weight, courier } =
        getValues();
      if (!weight || !courier) return;

      const savedFilter =
        getLocalStorage<SaveFilterType[]>("SAVE_FILTER") || [];

      const newId = `${fromCity}/${toCity}/${weight}/${courier}`;
      const invalidID = savedFilter.some((item) => item.id === newId);

      if (invalidID) {
        throw new Error(
          "Filter sudah ada pada history. Silakan buat filter baru untuk menyimpan filter.",
        );
      }

      const save: SaveFilterType = {
        id: `${fromCity}/${toCity}/${weight}/${courier}`,
        fromProvince: province?.find(
          (item) => item.province_id === fromProvince,
        ),
        toProvince: province?.find((item) => item.province_id === toProvince),
        fromCity: fromCities?.find((item) => item.city_id === fromCity),
        toCity: toCities?.find((item) => item.city_id === toCity),
        weight: weight,
        courier: courier,
      };

      setHistory(save);

      Modal.success({
        title: "Filter Berhasil Disimpan",
        content: "Silakan melihat filter yang tersimpan pada tab histori.",
      });
    } catch (err: unknown) {
      const error =
        err instanceof Error ? err.message : "Unknown error occurred";

      Modal.error({
        title: "Filter Gagal Disimpan",
        content: error,
      });
    }
  };

  const handleManualReset = () => {
    setValue("courier", undefined);
    setValue("weight", undefined);
    setValue("fromProvince", undefined);
    setValue("toProvince", undefined);
    setValue("toCity", undefined);
    setValue("fromCity", undefined);
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
                options={fromCities?.map((item) => ({
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
              handleManualReset();
            }}
          >
            Reset
          </Button>
          <Button onClick={handleSave} disabled={!isValid}>
            Simpan Filter
          </Button>
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
