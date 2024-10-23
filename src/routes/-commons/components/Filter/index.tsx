import { Tabs } from "antd";
import styled from "styled-components";

import { FilterHistory } from "./FilterHistory";
import { FilterForm } from "./FilterForm";
import { FilterInputs } from "@/helpers/types";

export interface FilterProps {
  formProps: {
    handleOnSubmit: (values: FilterInputs) => void;
    loading: boolean;
  };
}

export const Filter = ({ formProps }: FilterProps) => {
  return (
    <Container>
      <Tabs
        items={[
          {
            key: "1",
            label: "Filter",
            children: (
              <FilterForm
                handleOnSubmit={formProps.handleOnSubmit}
                loading={formProps.loading}
              />
            ),
          },
          {
            key: "2",
            label: "Histori",
            children: <FilterHistory history={[]} />,
          },
        ]}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 0 12px 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 50px -10px rgba(0, 0, 0, 0.1);
  background: ${(props) => props.theme.themeColor.bg};
`;
