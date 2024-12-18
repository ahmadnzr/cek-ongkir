import React, { useCallback } from "react";
import { Flex } from "antd";
import styled from "styled-components";

import { Colors, getCourierColor } from "@helpers/utils";
import { THistoryResponse } from "@helpers/types";
import { Text } from "@components/text";
import { MenuButton } from "@components/menu-button";
import { MenuItemType } from "@components/menu-button";
import { Icon } from "@components/icon";

import { FilterProps } from ".";

type MenuType = MenuItemType<"DELETE" | "APPLY">;

const menu: MenuType[] = [
  {
    key: "APPLY",
    label: "Terapkan",
    icon: <Icon name="check" className="action-icon" />,
    color: Colors.primary.blue,
  },
  {
    key: "DELETE",
    label: "Hapus",
    icon: <Icon name="xMark" className="action-icon" />,
    color: Colors.primary.red,
  },
];

export const FilterHistory = ({
  history,
  handleDelete,
  handleApply,
}: FilterProps["historyProps"]) => {
  const handleClickAction = useCallback(
    (action: MenuType, data: THistoryResponse) => {
      if (action.key === "DELETE") {
        handleDelete(data);
        return;
      }
      handleApply(data);
    },
    [handleApply, handleDelete],
  );

  return (
    <HistoryContainer>
      {history.map((item, id) => (
        <React.Fragment key={id}>
          <HistoryItem>
            <MenuButton
              onClickMenu={(action) => handleClickAction(action, item)}
              menu={menu}
              trigger={
                <DeleteIcon>
                  <Icon name="ellipsis" className="icon" />
                </DeleteIcon>
              }
            />
            <Text
              type="tag"
              size="sm"
              weight="bold"
              tagColor={getCourierColor(item.courier)}
            >
              {item.courier}
            </Text>
            <Flex justify="space-between" gap="2px" wrap>
              <Flex vertical gap="4px" flex={1}>
                <Text size="xs" weight="bold">
                  Asal :
                </Text>
                <Text size="xs">
                  {item.fromCity?.city_name}, {item.fromCity?.province}
                </Text>
              </Flex>
              <Flex vertical gap="4px" flex={1}>
                <Text size="xs" weight="bold">
                  Tujuan :
                </Text>
                <Text size="xs">
                  {item.toCity?.city_name}, {item.toCity?.province}
                </Text>
              </Flex>
              <Flex vertical gap="4px">
                <Text size="xs" weight="bold">
                  Berat :
                </Text>
                <Text size="xs">{item.weight} Kg</Text>
              </Flex>
            </Flex>
          </HistoryItem>
        </React.Fragment>
      ))}

      {!history.length ? (
        <NotFound>
          <Text size="lg" weight="bold">
            Belum Ada Histori
          </Text>
          <Text style={{ marginTop: "10px", lineHeight: "1.2rem" }}>
            Silakan simpan filter untuk membuat histori filter.
          </Text>
        </NotFound>
      ) : null}
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
