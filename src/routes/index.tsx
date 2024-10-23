import { createFileRoute } from "@tanstack/react-router";

import { Footer, Header, Hero, Text } from "@components";
import { Colors, courierLogo, getCourierColor } from "@helpers/utils";

import {
  Content,
  CourierLogo,
  CourierName,
  CourierService,
  DetailCourier,
  DetailHeader,
  MainStyled,
  NotFoundContainer,
  ResultContainer,
} from "./-commons/styles";
import { Filter, ServiceCourierItem } from "./-commons/components";
import { FilterInputs } from "@/helpers/types";
import { useFetchCost } from "./-commons/hooks";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { mutate, isLoading, data } = useFetchCost();

  const handleCheckCost = (values: FilterInputs) => {
    mutate({
      origin: values.fromCity,
      destination: values.toCity,
      weight: (parseInt(values.weight) * 1000).toString(), // in gram
      courier: values.courier,
    });
  };

  return (
    <MainStyled>
      <Header />
      <Content>
        <Hero />
        <Filter
          formProps={{ handleOnSubmit: handleCheckCost, loading: isLoading }}
        />
        {data?.rajaongkir.results.map((item) => (
          <ResultContainer key={item.code}>
            <DetailCourier>
              <DetailHeader>
                {item.code ? (
                  <CourierLogo $bg={courierLogo[item.code]}></CourierLogo>
                ) : null}
                <CourierName>
                  <Text
                    type="tag"
                    size="sm"
                    tagColor={getCourierColor(item.code)}
                  >
                    {item.code}
                  </Text>
                  <Text weight="bold">{item.name}</Text>
                </CourierName>
              </DetailHeader>

              {item.costs.length ? (
                <CourierService>
                  {item.costs.map((cost) => (
                    <ServiceCourierItem
                      key={cost.service}
                      cost={cost}
                      code={item.code}
                    />
                  ))}
                </CourierService>
              ) : (
                <NotFoundContainer>
                  <Text size="lg" color={Colors.primary.grayLight}>
                    Layanan Pengiriman Tidak Tersedia
                  </Text>
                </NotFoundContainer>
              )}
            </DetailCourier>
          </ResultContainer>
        ))}
      </Content>
      <Footer />
    </MainStyled>
  );
}
