import styled from "styled-components";

import { Colors } from "../../helpers/utils";

export const MainStyled = styled.div`
  width: 100%;
  margin: 0 auto;

  @media (min-width: 425px) {
    width: 425px;
  }
`;

export const Content = styled.main`
  margin: 70px 0 40px;
  padding: 12px;
`;

export const Hero = styled.section`
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & .hero_desc {
    line-height: 1.5;
  }
`;

export const FilterContainer = styled.div`
  padding: 10px 12px;
  border-radius: 10px;
  box-shadow: 1px 1px 50px -10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Item = styled.div`
  display: flex;
  gap: 10px;
`;

export const SelectFilter = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const CourierCard = styled.div<{
  $color: string;
  $bg: string;
  $isActive: boolean;
}>`
  cursor: pointer;
  flex: 1;
  border: none;
  background: ${(props) => props.$bg};
  color: ${(props) => props.$color};
  font-weight: 700;
  padding: 10px;
  border-radius: 10px;
  text-transform: uppercase;
  transition: 0.3s ease;
  outline: 4px solid ${(props) => (props.$isActive ? props.$color : props.$bg)};
  text-align: center;
`;

export const ResultContainer = styled.div`
  margin-top: 40px;
  border-radius: 10px;
  padding: 20px 10px;
  box-shadow: 1px 1px 50px -10px rgba(0, 0, 0, 0.1);
`;

export const DetailCourier = styled.div``;

export const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const CourierLogo = styled.div<{ $bg: string }>`
  width: 60px;
  height: 60px;
  border-radius: 5px;
  background: white;
  box-shadow: 1px 1px 50px -10px rgba(0, 0, 0, 0.1);
  content: "";
  background-image: url(${(props) => props.$bg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export const CourierName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CourierService = styled.div`
  margin-top: 10px;
`;

export const ServiceItem = styled.div`
  padding: 14px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 2px dashed ${Colors.primary.grayLight};
`;

export const ServiceDetail = styled.div<{ $align?: "start" | "end" }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Footer = styled.footer`
  padding: 20px 10px;
  text-align: center;

  & .footer_link {
    text-decoration: underline;
  }
`;
