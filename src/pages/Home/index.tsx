import { useContext } from "react";

import { Filter, Header, Hero, Text } from "../../components";
import { Colors, courierLogo, formatRupiah } from "../../helpers/utils";
import { FilterResultCtx } from "../../helpers/lib";

import {
  Content,
  CourierLogo,
  CourierName,
  CourierService,
  DetailCourier,
  DetailHeader,
  Footer,
  MainStyled,
  ResultContainer,
  ServiceDetail,
  ServiceItem,
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
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <Text style={{ display: "flex", gap: "5px" }}>
                          {cost.description}
                        </Text>
                        <Text type="tag" size="xs">
                          {cost.service}
                        </Text>
                      </div>
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
