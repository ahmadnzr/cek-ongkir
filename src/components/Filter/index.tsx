import { Tabs } from "antd";
import styled from "styled-components";

import { useFilterResultCtx } from "../../helpers/lib";

import { FilterHistory } from "./FilterHistory";
import { FilterForm } from "./FilterForm";

/*TODO:
 * Create Icon component
 * for concistency
 * */

export const Filter = () => {
  const { history } = useFilterResultCtx();

  return (
    <Container>
      <Tabs
        items={[
          {
            key: "1",
            label: "Filter",
            children: <FilterForm />,
          },
          {
            key: "2",
            label: "Histori",
            children: <FilterHistory history={history} />,
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
