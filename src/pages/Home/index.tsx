import { useContext } from "react";

import {
  Filter,
  Footer,
  Header,
  Hero,
  ServiceCourierItem,
  Text,
} from "../../components";
import { Colors, courierLogo, getCourierColor } from "../../helpers/utils";
import { FilterResultCtx } from "../../helpers/lib";

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
} from "./styled";

function HomePage() {
  const { results } = useContext(FilterResultCtx);

  return (
    <MainStyled>
      <Header />
      <Content>
        <Hero />
        <Filter />
        {results.map((item) => (
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

export default HomePage;
