import React, { useState } from "react";
import { Popover } from "antd";
import styled from "styled-components";

import { Colors } from "@helpers/utils";

import { Text } from "../text";

export interface MenuItemType<T = number> {
  key: T;
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface Props<T> {
  trigger: React.ReactNode;
  menu: MenuItemType<T>[];
  onClickMenu: (item: MenuItemType<T>) => void;
}

export const MenuButton = <T,>({ trigger, menu, onClickMenu }: Props<T>) => {
  const [open, setOpen] = useState(false);

  const handleClickMenu = (menu: MenuItemType<T>) => {
    setOpen(false);
    onClickMenu(menu);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <Popover
      trigger="click"
      arrow={false}
      open={open}
      placement="bottomRight"
      onOpenChange={handleOpenChange}
      content={
        <Action>
          {menu.map((item, i) => (
            <ActionItem
              $color={item.color}
              key={i}
              onClick={() => handleClickMenu(item)}
            >
              {item.icon}
              <Text size="xs" color={item.color}>
                {item.label}
              </Text>
            </ActionItem>
          ))}
        </Action>
      }
    >
      {trigger}
    </Popover>
  );
};

const Action = styled.div`
  display: flex;
  flex-direction: column;

  & > *:not(:last-child) {
    border-bottom: 1px solid ${Colors.primary.light};
  }
`;

const ActionItem = styled.button<{ $color: string }>`
  padding: 8px 10px;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${(props) => props.$color};
  transition: 0.3s ease;

  & .action-icon {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: ${Colors.primary.light};
  }
`;
