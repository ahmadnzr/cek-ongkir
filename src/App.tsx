import styled from "styled-components";

import { Text } from "./components";
import { Button, Select } from "antd";
import { Colors } from "./helpers/utils";

function App() {
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
        <FilterContainer>
          <FilterItem>
            <Text size="lg" weight="bold">
              Asal
            </Text>
            <Item>
              <SelectFilter>
                <Text size="sm">Provinsi :</Text>
                <Select
                  allowClear
                  options={[{ label: "Jakarta", value: "jkt" }]}
                  placeholder="Pilih"
                />
              </SelectFilter>
              <SelectFilter>
                <Text size="sm">Kota/Kabupaten :</Text>
                <Select
                  allowClear
                  options={[{ label: "Jakarta", value: "jkt" }]}
                  placeholder="Pilih"
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
                <Select
                  allowClear
                  options={[{ label: "Jakarta", value: "jkt" }]}
                  placeholder="Pilih"
                />
              </SelectFilter>
              <SelectFilter>
                <Text size="sm">Kota/Kabupaten :</Text>
                <Select
                  allowClear
                  options={[{ label: "Jakarta", value: "jkt" }]}
                  placeholder="Pilih"
                />
              </SelectFilter>
            </Item>
          </FilterItem>
          <FilterItem>
            <Text size="lg" weight="bold">
              Kurir
            </Text>
            <Item>
              <CourierCard
                className="active"
                $color={Colors.indicator.green.fg}
                $bg={Colors.indicator.green.bg}
              >
                JNE
              </CourierCard>
              <CourierCard
                $color={Colors.indicator.purple.fg}
                $bg={Colors.indicator.purple.bg}
              >
                POS
              </CourierCard>
              <CourierCard
                $color={Colors.indicator.orange.fg}
                $bg={Colors.indicator.orange.bg}
              >
                TIKI
              </CourierCard>
            </Item>
          </FilterItem>
          <FilterItem>
            <Button type="primary">Cek Ongkir</Button>
            <Button>Simpan Filter</Button>
          </FilterItem>
        </FilterContainer>

        <ResultContainer>
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

          <DetailCourier>
            <DetailHeader>
              <CourierLogo></CourierLogo>
              <CourierName>
                <Text type="tag" size="sm">
                  JNE
                </Text>
                <Text weight="bold">Jalur Nugraha Ekakurir (JNE)</Text>
              </CourierName>
            </DetailHeader>

            <CourierService>
              <ServiceItem>
                <ServiceDetail>
                  <Text style={{ display: "flex", gap: "5px" }}>
                    Same Day Service
                    <Text type="tag" size="xs">
                      SDS
                    </Text>
                  </Text>
                  <Text size="xs">9-10 Hari</Text>
                </ServiceDetail>
                <ServiceDetail $align="end">
                  <Text size="xl" weight="bold">
                    Rp 100.000,00
                  </Text>
                </ServiceDetail>
              </ServiceItem>

              <ServiceItem>
                <ServiceDetail>
                  <Text style={{ display: "flex", gap: "5px" }}>
                    Same Day Service
                    <Text type="tag" size="xs">
                      SDS
                    </Text>
                  </Text>
                  <Text size="xs">9-10 Hari</Text>
                </ServiceDetail>
                <ServiceDetail $align="end">
                  <Text size="xl" weight="bold">
                    Rp 100.000,00
                  </Text>
                </ServiceDetail>
              </ServiceItem>
            </CourierService>
          </DetailCourier>
        </ResultContainer>
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

const CourierCard = styled.button<{ $color: string; $bg: string }>`
  flex: 1;
  border: none;
  background: ${(props) => props.$bg};
  color: ${(props) => props.$color};
  font-weight: 700;
  padding: 10px;
  border-radius: 10px;
  text-transform: uppercase;
  transition: 0.3s ease;
  outline: 1px solid ${(props) => props.$bg};

  &.active {
    outline: 2px solid ${(props) => props.$color};
  }
`;

const ResultContainer = styled.div`
  margin-top: 40px;
  border-radius: 10px;
  padding: 20px 10px;
  box-shadow: 1px 1px 50px -10px rgba(0, 0, 0, 0.1);
`;

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
