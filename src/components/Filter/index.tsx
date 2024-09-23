import { useContext } from "react";
import { Button, Flex, Popover, Tabs } from "antd";
import styled, { css } from "styled-components";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  CheckIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";

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

export const Filter = () => {
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
  const history = [1];

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
      <Container>
        <Tabs
          items={[
            {
              key: "1",
              label: "Filter",
              children: (
                <>
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
                          <ControlledInputNumber
                            control={control}
                            name="weight"
                          />
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
                </>
              ),
            },
            {
              key: "2",
              label: "Histori",
              children: (
                <HistoryContainer>
                  {history.length ? (
                    <>
                      <HistoryItem>
                        <Popover
                          content={
                            <Action>
                              <ActionItem $color={Colors.primary.blue}>
                                <CheckIcon className="action-icon" />
                                <Text size="xs" color={Colors.primary.blue}>
                                  Terapkan
                                </Text>
                              </ActionItem>
                              <ActionItem $color={Colors.primary.red}>
                                <XMarkIcon className="action-icon" />
                                <Text size="xs" color={Colors.primary.red}>
                                  Hapus
                                </Text>
                              </ActionItem>
                            </Action>
                          }
                          title=""
                          trigger="focus"
                          arrow={false}
                          placement="bottomRight"
                        >
                          <DeleteIcon>
                            <EllipsisHorizontalIcon className="icon" />
                          </DeleteIcon>
                        </Popover>
                        <Flex align="center" justify="flex-start" gap="2px">
                          <Text type="tag" size="sm" weight="bold">
                            JNE
                          </Text>
                          <Text size="sm" weight="bold">
                            - JNE Trucking
                          </Text>
                        </Flex>
                        <Flex justify="space-between" gap="2px" wrap>
                          <Flex vertical gap="4px">
                            <Text size="xs" weight="bold">
                              Asal :
                            </Text>
                            <Text size="xs">Sleman, Yogyakarta</Text>
                          </Flex>
                          <Flex vertical gap="4px">
                            <Text size="xs" weight="bold">
                              Tujuan :
                            </Text>
                            <Text size="xs">Lombok Timur, NTB</Text>
                          </Flex>
                          <Flex vertical gap="4px">
                            <Text size="xs" weight="bold">
                              Berat :
                            </Text>
                            <Text size="xs">1 KG</Text>
                          </Flex>
                        </Flex>
                      </HistoryItem>
                      <HistoryItem>
                        <Popover
                          content={
                            <Action>
                              <ActionItem $color={Colors.primary.blue}>
                                <CheckIcon className="action-icon" />
                                <Text size="xs" color={Colors.primary.blue}>
                                  Terapkan
                                </Text>
                              </ActionItem>
                              <ActionItem $color={Colors.primary.red}>
                                <XMarkIcon className="action-icon" />
                                <Text size="xs" color={Colors.primary.red}>
                                  Hapus
                                </Text>
                              </ActionItem>
                            </Action>
                          }
                          title=""
                          trigger="focus"
                          arrow={false}
                          placement="bottomRight"
                        >
                          <DeleteIcon>
                            <EllipsisHorizontalIcon className="icon" />
                          </DeleteIcon>
                        </Popover>
                        <Flex align="center" justify="flex-start" gap="2px">
                          <Text type="tag" size="sm" weight="bold">
                            JNE
                          </Text>
                          <Text size="sm" weight="bold">
                            - JNE Trucking
                          </Text>
                        </Flex>
                        <Flex justify="space-between" gap="2px" wrap>
                          <Flex vertical gap="4px">
                            <Text size="xs" weight="bold">
                              Asal :
                            </Text>
                            <Text size="xs">Sleman, Yogyakarta</Text>
                          </Flex>
                          <Flex vertical gap="4px">
                            <Text size="xs" weight="bold">
                              Tujuan :
                            </Text>
                            <Text size="xs">Lombok Timur, NTB</Text>
                          </Flex>
                          <Flex vertical gap="4px">
                            <Text size="xs" weight="bold">
                              Berat :
                            </Text>
                            <Text size="xs">1 KG</Text>
                          </Flex>
                        </Flex>
                      </HistoryItem>
                    </>
                  ) : (
                    <NotFound>
                      <Text size="lg" weight="bold">
                        Belum Ada Histori
                      </Text>
                      <Text style={{ marginTop: "10px", lineHeight: "1.2rem" }}>
                        Silakan simpan filter untuk membuat histori filter.
                      </Text>
                    </NotFound>
                  )}
                </HistoryContainer>
              ),
            },
          ]}
        />
      </Container>
    </form>
  );
};

const Container = styled.div`
  padding: 0 12px 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 50px -10px rgba(0, 0, 0, 0.1);
`;

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

const HistoryContainer = styled.div`
  position: relative;
  min-height: 100px;
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
  align-content: start;
  gap: 20px;
`;

const NotFound = styled.div`
  position: absolute;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const HistoryItem = styled.div`
  position: relative;
  padding: 8px 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: 0.3s ease;
  outline: 1px solid white;
  outline: 1px solid ${Colors.primary.light};

  &:hover {
    box-shadow: 1px 1px 40px -10px rgba(0, 0, 0, 0.1);
  }
`;

const DeleteIcon = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;

  width: 16px;
  height: 16px;
  padding: 2px;
  border-radius: 16px;
  border: none;
  outline: 1px solid ${Colors.primary.light};
  background: white;
  cursor: pointer;

  & .icon {
    color: ${Colors.primary.grayDark};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
  }
`;

const Action = styled.div`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    border-bottom: 1px solid ${Colors.primary.light};
  }
`;

const ActionItem = styled.button<{ $color: string }>`
  padding: 8px 10px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(props) => props.$color};
  transition: 0.3s ease;

  & .action-icon {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: ${Colors.primary.light};
  }
`;
