import styled from "styled-components";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import { Text } from "./components";
import { Button, InputNumber, Select } from "antd";
import { Colors, formatRupiah } from "./helpers/utils";
import { useFecthCost, useFetchCity, useFetchProvince } from "./helpers/hooks";
import { useState } from "react";
import { Courier } from "./helpers/types/responseApi";

type Inputs = {
  fromProvince: string;
  fromCity: string;
  toProvince: string;
  toCity: string;
  weight: string;
  courier: "jne" | "pos" | "tiki";
};

function App() {
  const { handleSubmit, watch, control } = useForm<Inputs>();

  const fromProvince = watch("fromProvince");
  const toProvince = watch("toProvince");

  const { data: province } = useFetchProvince();
  const { data: cities } = useFetchCity({ provinceId: fromProvince });
  const { data: toCities } = useFetchCity({ provinceId: toProvince });
  const { mutate, isLoading } = useFecthCost();

  const [result, setResult] = useState<Courier[]>([]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(
      {
        origin: data.fromCity,
        destination: data.toCity,
        weight: data.weight.toString(),
        courier: data.courier,
      },
      {
        onSuccess: (data) => {
          setResult(data.rajaongkir.results);
        },
      },
    );
  };

  return (
    <MainStyled>
      <HeaderStyled>
        <Text size="xxl" weight="bold" className="navbar_title">
          CheckOngkir
        </Text>
        <Button type="primary">Login</Button>
      </HeaderStyled>

      <Content>
        <Hero>
          <Text weight="bold" size="xl">
            Check Ongkir / Cek Tarif
          </Text>
          <Text className="hero_desc">
            Cek ongkos kirim gratis untuk ekpedisi semua daerah di Indonesia
            menggunakan jasa kurir JNE, POS, dan Tiki
          </Text>
        </Hero>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FilterContainer>
            <FilterItem>
              <Text size="lg" weight="bold">
                Asal
              </Text>
              <Item>
                <SelectFilter>
                  <Text size="sm">Provinsi :</Text>
                  <Controller
                    control={control}
                    name="fromProvince"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        allowClear
                        value={value}
                        options={province?.map((item) => ({
                          label: item.province,
                          value: item.province_id,
                        }))}
                        placeholder="Pilih"
                        onChange={onChange}
                      />
                    )}
                  />
                </SelectFilter>
                <SelectFilter>
                  <Text size="sm">Kota/Kabupaten :</Text>
                  <Controller
                    control={control}
                    name="fromCity"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        allowClear
                        value={value}
                        options={cities?.map((item) => ({
                          label: item.city_name,
                          value: item.city_id,
                        }))}
                        placeholder="Pilih"
                        onChange={onChange}
                      />
                    )}
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
                  <Controller
                    control={control}
                    name="toProvince"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        allowClear
                        value={value}
                        options={province?.map((item) => ({
                          label: item.province,
                          value: item.province_id,
                        }))}
                        placeholder="Pilih"
                        onChange={onChange}
                      />
                    )}
                  />
                </SelectFilter>
                <SelectFilter>
                  <Text size="sm">Kota/Kabupaten :</Text>
                  <Controller
                    control={control}
                    name="toCity"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        allowClear
                        value={value}
                        options={toCities?.map((item) => ({
                          label: item.city_name,
                          value: item.city_id,
                        }))}
                        placeholder="Pilih"
                        onChange={onChange}
                      />
                    )}
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
                  <Controller
                    control={control}
                    name="weight"
                    rules={{ required: true }}
                    render={({ field: { onChange, value } }) => (
                      <InputNumber
                        suffix="Kg"
                        style={{ width: "100px" }}
                        value={value}
                        min={1}
                        max={100}
                        onChange={onChange}
                      />
                    )}
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
                    <CourierCard
                      $isActive={value === "jne"}
                      $color={Colors.indicator.green.fg}
                      $bg={Colors.indicator.green.bg}
                      onClick={() => onChange("jne")}
                    >
                      JNE
                    </CourierCard>
                    <CourierCard
                      $isActive={value === "pos"}
                      $color={Colors.indicator.purple.fg}
                      $bg={Colors.indicator.purple.bg}
                      onClick={() => onChange("pos")}
                    >
                      POS
                    </CourierCard>
                    <CourierCard
                      $isActive={value === "tiki"}
                      $color={Colors.indicator.orange.fg}
                      $bg={Colors.indicator.orange.bg}
                      onClick={() => onChange("tiki")}
                    >
                      TIKI
                    </CourierCard>
                  </Item>
                )}
              />
            </FilterItem>
            <FilterItem>
              <Button loading={isLoading} type="primary" htmlType="submit">
                Cek Ongkir
              </Button>
            </FilterItem>
          </FilterContainer>
        </form>

        {result.length ? (
          <ResultContainer>
            {/*
          <DetailFilter>
            <DetailCheck>
              <Text color={Colors.primary.grayLight} size="sm">
                Dari :
              </Text>
              <Text>Jakarta Barat, DKI Jakarta</Text>
            </DetailCheck>
            <DetailCheck>
              <Text color={Colors.primary.grayLight} size="sm">
                Tujuan :
              </Text>
              <Text>Sleman, DIY</Text>
            </DetailCheck>
            <DetailCheck>
              <Text color={Colors.primary.grayLight} size="sm">
                Berat Barang :
              </Text>
              <Text>2 Kg</Text>
            </DetailCheck>
          </DetailFilter>
            */}

            {result.map((item) => (
              <DetailCourier>
                <DetailHeader>
                  <CourierLogo></CourierLogo>
                  <CourierName>
                    <Text type="tag" size="sm">
                      {item.code}
                    </Text>
                    <Text weight="bold">{item.name}</Text>
                  </CourierName>
                </DetailHeader>

                <CourierService>
                  {item.costs.map((cost, i) => (
                    <ServiceItem>
                      <ServiceDetail>
                        <Text style={{ display: "flex", gap: "5px" }}>
                          {cost.service}
                          <Text type="tag" size="xs">
                            {cost.description}
                          </Text>
                        </Text>
                        <Text size="xs">
                          {cost.cost ? `${cost?.cost[i]?.etd} Hari` : "-"}{" "}
                        </Text>
                      </ServiceDetail>
                      <ServiceDetail $align="end">
                        <Text size="xl" weight="bold">
                          {cost.cost
                            ? formatRupiah(cost.cost[i].value || 0)
                            : "-"}
                        </Text>
                      </ServiceDetail>
                    </ServiceItem>
                  ))}
                </CourierService>
              </DetailCourier>
            ))}
          </ResultContainer>
        ) : null}
      </Content>
    </MainStyled>
  );
}

const MainStyled = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 40px;
`;

const HeaderStyled = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;

  width: 100%;
  height: 70px;
  padding: 0 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  box-shadow: 1px 1px 50px -10px rgba(0, 0, 0, 0.1);
`;

const Content = styled.main`
  margin-top: 70px;
  padding: 12px;
`;

const Hero = styled.section`
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & .hero_desc {
    line-height: 1.5;
  }
`;

const FilterContainer = styled.div`
  padding: 10px 12px;
  border-radius: 10px;
  box-shadow: 1px 1px 50px -10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
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
  $color: string;
  $bg: string;
  $isActive: boolean;
}>`
  flex: 1;
  border: none;
  background: ${(props) => props.$bg};
  color: ${(props) => props.$color};
  font-weight: 700;
  padding: 10px;
  border-radius: 10px;
  text-transform: uppercase;
  transition: 0.3s ease;
  outline: 2px solid ${(props) => (props.$isActive ? props.$color : props.$bg)};
`;

const ResultContainer = styled.div`
  margin-top: 40px;
  border-radius: 10px;
  padding: 20px 10px;
  box-shadow: 1px 1px 50px -10px rgba(0, 0, 0, 0.1);
`;

{
  /*

const DetailFilter = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const DetailCheck = styled.div`
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

*/
}

const DetailCourier = styled.div`
  margin-top: 20px;
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CourierLogo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  background: gray;
`;

const CourierName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CourierService = styled.div`
  margin-top: 10px;
`;

const ServiceItem = styled.div`
  padding: 14px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 2px dashed ${Colors.primary.grayLight};
`;

const ServiceDetail = styled.div<{ $align?: "start" | "end" }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default App;
