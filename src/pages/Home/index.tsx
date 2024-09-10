import { useState } from "react";
import { Button } from "antd";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import {
  ControlledInputNumber,
  Header,
  InputSelect,
  Text,
} from "../../components";
import { Colors, formatRupiah } from "../../helpers/utils";
import {
  useFecthCost,
  useFetchCity,
  useFetchProvince,
} from "../../helpers/hooks";
import { Courier } from "../../helpers/types/responseApi";

import { courierLogo, courierType, Inputs } from "./data";
import {
  Content,
  CourierCard,
  CourierLogo,
  CourierName,
  CourierService,
  DetailCourier,
  DetailHeader,
  FilterContainer,
  FilterItem,
  Footer,
  Hero,
  Item,
  MainStyled,
  ResultContainer,
  SelectFilter,
  ServiceDetail,
  ServiceItem,
} from "./styled";

function HomePage() {
  const {
    handleSubmit,
    watch,
    control,
    reset,
    formState: { isValid },
  } = useForm<Inputs>();

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
        weight: (parseInt(data.weight) * 1000).toString(), // in gram
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
      <Header />
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
                        $color={item.color}
                        $bg={item.bg}
                        onClick={() => onChange(item.value)}
                      >
                        {item.label}
                      </CourierCard>
                    ))}
                  </Item>
                )}
              />
            </FilterItem>
            <FilterItem>
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                disabled={!isValid}
              >
                Cek Ongkir
              </Button>
              <Button
                type="default"
                htmlType="reset"
                onClick={() => {
                  reset();
                  setResult([]);
                }}
              >
                Reset
              </Button>
            </FilterItem>
          </FilterContainer>
        </form>

        {result.map((item) => (
          <ResultContainer key={item.code}>
            <DetailCourier>
              <DetailHeader>
                {item.code ? (
                  <CourierLogo $bg={courierLogo[item.code]}></CourierLogo>
                ) : null}
                <CourierName>
                  <Text type="tag" size="sm">
                    {item.code}
                  </Text>
                  <Text weight="bold">{item.name}</Text>
                </CourierName>
              </DetailHeader>

              <CourierService>
                {item.costs.map((cost) => (
                  <ServiceItem key={cost.service}>
                    <ServiceDetail>
                      <Text style={{ display: "flex", gap: "5px" }}>
                        {cost.description}
                        <Text type="tag" size="xs">
                          {cost.service}
                        </Text>
                      </Text>
                      <Text size="xs">
                        {cost.cost ? `${cost?.cost[0]?.etd || 0} Hari` : "-"}
                      </Text>
                    </ServiceDetail>
                    <ServiceDetail $align="end">
                      <Text size="xl" weight="bold">
                        {cost.cost?.length
                          ? formatRupiah(cost.cost[0]?.value || 0)
                          : "-"}
                      </Text>
                    </ServiceDetail>
                  </ServiceItem>
                ))}
              </CourierService>
            </DetailCourier>
          </ResultContainer>
        ))}
      </Content>
      <Footer>
        <Text size="sm" color={Colors.primary.grayLight}>
          2024 |{" "}
          <a
            href="https://github.com/ahmadnzr"
            target="_blank"
            className="footer_link"
          >
            Ahmad Nizar
          </a>
        </Text>
      </Footer>
    </MainStyled>
  );
}

export default HomePage;
