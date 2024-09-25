import styled from "styled-components";
import { Flex } from "antd";
import {
  CheckIcon,
  EllipsisHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/16/solid";

import { Colors } from "../../helpers/utils";

import { Text } from "../Text";
import { MenuButton, MenuItemType } from "../MenuButton";

interface Props {
  history: string[];
}

const menu: MenuItemType[] = [
  {
    id: 1,
    label: "Terapkan",
    icon: <CheckIcon className="action-icon" />,
    color: Colors.primary.blue,
  },
  {
    id: 2,
    label: "Hapus",
    icon: <XMarkIcon className="action-icon" />,
    color: Colors.primary.red,
  },
];

export const FilterHistory = ({ history }: Props) => {
  return (
    <HistoryContainer>
      {history.length ? (
        <>
          <HistoryItem>
            <MenuButton
              onClickMenu={(item) => {
                console.warn({ item });
              }}
              menu={menu}
              trigger={
                <DeleteIcon>
                  <EllipsisHorizontalIcon className="icon" />
                </DeleteIcon>
              }
            />
            <Flex align="center" justify="flex-start" gap="2px">
              <Text type="tag" size="sm" weight="bold">
                JNE
              </Text>
              <Text size="sm" weight="bold">
                - JNE Trucking
              </Text>
            </Flex>
            <Flex justify="space-between" gap="2px" wrap>
              <Flex vertical gap="4px">
                <Text size="xs" weight="bold">
                  Asal :
                </Text>
                <Text size="xs">Sleman, Yogyakarta</Text>
              </Flex>
              <Flex vertical gap="4px">
                <Text size="xs" weight="bold">
                  Tujuan :
                </Text>
                <Text size="xs">Lombok Timur, NTB</Text>
              </Flex>
              <Flex vertical gap="4px">
                <Text size="xs" weight="bold">
                  Berat :
                </Text>
                <Text size="xs">1 KG</Text>
              </Flex>
            </Flex>
          </HistoryItem>
        </>
      ) : (
        <NotFound>
          <Text size="lg" weight="bold">
            Belum Ada Histori
          </Text>
          <Text style={{ marginTop: "10px", lineHeight: "1.2rem" }}>
            Silakan simpan filter untuk membuat histori filter.
          </Text>
        </NotFound>
      )}
    </HistoryContainer>
  );
};

const HistoryContainer = styled.div`
  position: relative;
  min-height: 100px;
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
  align-content: start;
  gap: 20px;
`;

const NotFound = styled.div`
  position: absolute;
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

const HistoryItem = styled.div`
  position: relative;
  padding: 8px 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: 0.3s ease;
  outline: 1px solid white;
  outline: 1px solid ${Colors.primary.light};

  &:hover {
    box-shadow: 1px 1px 40px -10px rgba(0, 0, 0, 0.1);
  }
`;

const DeleteIcon = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;

  width: 16px;
  height: 16px;
  padding: 2px;
  border-radius: 16px;
  border: none;
  outline: 1px solid ${Colors.primary.light};
  background: white;
  cursor: pointer;

  & .icon {
    color: ${Colors.primary.grayDark};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
  }
`;
