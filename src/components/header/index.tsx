import styled from "styled-components";

import { Icon } from "../icon";
import { Text } from "../text";

import { Colors } from "@/helpers/utils";
import { useThemeContext } from "@/helpers/lib";

export const Header = () => {
  const { theme, setTheme } = useThemeContext();

  const dark = theme === "dark";

  return (
    <HeaderStyled>
      <Text size="xxl" weight="bold" className="navbar_title">
        CheckOngkir
      </Text>
      <Menu>
        <ThemeToggle $dark={dark}>
          <Circle $isDark={dark}>
            <Icon name={dark ? "moon" : "sun"} className="light-icon" />
          </Circle>
          <ToggleButton>
            <button onClick={() => setTheme("light")}>
              <Text
                size="xs"
                color={dark ? Colors.primary.light : Colors.primary.grayDark}
              >
                Light
              </Text>
            </button>
            <button onClick={() => setTheme("dark")}>
              <Text
                size="xs"
                color={dark ? Colors.primary.light : Colors.primary.grayDark}
              >
                Dark
              </Text>
            </button>
          </ToggleButton>
        </ThemeToggle>
        <GithubLink
          href="https://github.com/ahmadnzr/cek-ongkir"
          target="_blank"
        >
          <img
            src="/github-mark.png"
            alt="github-icon"
            className="github-icon"
          />
        </GithubLink>
      </Menu>
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
  background: ${(props) => props.theme.themeColor.bg};
  box-shadow: 1px 1px 50px -10px rgba(0, 0, 0, 0.1);
`;

const GithubLink = styled.a`
  padding: 8px;
  background-color: ${Colors.primary.light};

  border-radius: 50%;
  transition: 0.3s ease;

  &:hover {
  }

  & .github-icon {
    width: 24px;
  }
`;

const Menu = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
`;

const ThemeToggle = styled.div<{ $dark: boolean }>`
  position: relative;
  height: 40px;
  padding: 4px;
  background: ${(props) => (props.$dark ? "#092E40" : "#fae9b1")};
  border-radius: 50px;
`;

const ToggleButton = styled.div`
  height: 100%;
  display: flex;
  gap: 6px;
  align-items: stretch;

  & button {
    background: none;
    border: none;
    flex: 1;
    cursor: pointer;
    padding: 0 2px;
  }
`;

const Circle = styled.button<{ $isDark: boolean }>`
  --size: 32px;
  position: absolute;
  top: 50%;
  left: ${(props) => (props.$isDark ? "38px" : "4px")};
  background: ${(props) => (props.$isDark ? "#26AFEE" : "#f1c138")};
  transition: 0.5s ease-out;
  transform: translateY(-50%);
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  border: none;
  display: block;

  & .light-icon {
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 20px;
  }
`;
