import styled from "styled-components";

import { Text } from "../text";

export const Hero = () => {
  return (
    <HeroStyled>
      <Text weight="bold" size="xl">
        Check Ongkir / Cek Tarif
      </Text>
      <Text className="hero_desc">
        Cek ongkos kirim gratis untuk ekpedisi semua daerah di Indonesia
        menggunakan jasa kurir JNE, POS, dan Tiki
      </Text>
    </HeroStyled>
  );
};

export const HeroStyled = styled.section`
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & .hero_desc {
    line-height: 1.5;
  }
`;
