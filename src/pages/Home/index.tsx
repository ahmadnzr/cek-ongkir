import { useContext } from "react";

import { Filter, Footer, Header, Hero, Text } from "../../components";
import {
  Colors,
  courierLogo,
  formatRupiah,
  getCourierColor,
} from "../../helpers/utils";
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
                          <Text
                            type="tag"
                            size="xs"
                            tagColor={getCourierColor(item.code)}
                          >
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
