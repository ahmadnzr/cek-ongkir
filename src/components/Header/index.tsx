import styled from "styled-components";

import { Text } from "@components";

export const Header = () => {
  return (
    <HeaderStyled>
      <Text size="xxl" weight="bold" className="navbar_title">
        CheckOngkir
      </Text>
      <GithubLink href="https://github.com/ahmadnzr/cek-ongkir" target="_blank">
        <img src="/github-mark.png" alt="github-icon" className="github-icon" />
      </GithubLink>
    </HeaderStyled>
  );
};

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

const GithubLink = styled.a`
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.09);
  border-radius: 50%;
  transition: 0.3s ease;

  &:hover {
  }

  & .github-icon {
    width: 24px;
  }
`;
