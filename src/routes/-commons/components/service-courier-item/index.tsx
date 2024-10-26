import styled from "styled-components";

import { Colors, formatRupiah, getCourierColor } from "@helpers/utils";
import { CourierDetail, CourierType } from "@helpers/types";

import { Text } from "@components/text";

interface Props {
  cost?: CourierDetail;
  code?: CourierType;
}

export const ServiceCourierItem = ({ cost, code }: Props) => {
  return (
    <ServiceItem>
      <ServiceDetail>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <Text style={{ display: "flex", gap: "5px" }}>
            {cost?.description}
          </Text>
          <Text type="tag" size="xs" tagColor={getCourierColor(code)}>
            {cost?.service}
          </Text>
        </div>
        <Text size="xs">
          {cost?.cost ? `${cost?.cost[0]?.etd || 0} Hari` : "-"}
        </Text>
      </ServiceDetail>
      <ServiceDetail $align="end">
        <Text size="xl" weight="bold">
          {cost?.cost?.length ? formatRupiah(cost.cost[0]?.value || 0) : "-"}
        </Text>
      </ServiceDetail>
    </ServiceItem>
  );
};

const ServiceItem = styled.div`
  padding: 14px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  border-bottom: 2px dashed ${Colors.primary.grayLight};
`;

const ServiceDetail = styled.div<{ $align?: "start" | "end" }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
