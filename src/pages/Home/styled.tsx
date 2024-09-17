import styled from "styled-components";

export const MainStyled = styled.div`
  width: 100%;
  min-height: 100dvh;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 1fr auto;

  @media (min-width: 425px) {
    width: 425px;
  }
`;

export const Content = styled.main`
  margin: 70px 0 0;
  padding: 12px;
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

export const NotFoundContainer = styled.div`
  margin-top: 10px;
  text-align: center;
`;
