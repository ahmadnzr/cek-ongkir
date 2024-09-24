import React, { useState } from "react";
import { Popover } from "antd";
import styled from "styled-components";

import { Text } from "../Text";
import { Colors } from "../../helpers/utils";

export interface MenuItemType {
  id: number;
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface Props {
  trigger: React.ReactNode;
  menu: MenuItemType[];
  onClickMenu: (item: MenuItemType) => void;
}

export const MenuButton = ({ trigger, menu, onClickMenu }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickMenu = (menu: MenuItemType) => {
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
          {menu.map((item) => (
            <ActionItem
              $color={item.color}
              key={item.id}
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
