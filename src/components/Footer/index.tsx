import styled from "styled-components";

import { Colors } from "@helpers/utils";

import { Text } from "@components";

export const Footer = () => {
  return (
    <FooterStyled>
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
    </FooterStyled>
  );
};

const FooterStyled = styled.footer`
  padding: 20px 10px;
  text-align: center;

  & .footer_link {
    text-decoration: underline;
  }
`;
