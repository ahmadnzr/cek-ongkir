import { createFileRoute } from "@tanstack/react-router";

import { Footer, Header, Hero, Text } from "@components";
import { Colors, courierLogo, getCourierColor } from "@helpers/utils";
import { FilterInputs, THistoryResponse } from "@/helpers/types";

import {
  Content,
  CourierLogo,
  CourierName,
  CourierService,
  DetailCourier,
  DetailHeader,
  MainStyled,
  NotFoundContainer,
  ResultContainer,
} from "./-commons/styles";
import { Filter, ServiceCourierItem } from "./-commons/components";
import { useFetchCost } from "./-commons/hooks";
import { useFetchHistory } from "./-commons/hooks/useFetchHistory";
import { useCreateHistoryMutation } from "./-commons/hooks/create-history-mutation";
import { useDeleteHistoryMutation } from "./-commons/hooks/delete-history-mutation";

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tab: search?.tab as string,
    };
  },
});

function Index() {
  const { tab } = Route.useSearch();

  const costMutation = useFetchCost();
  const historyQuery = useFetchHistory({ enabled: tab === "2" });
  const historyMutation = useCreateHistoryMutation();
  const deleteHistoryMutation = useDeleteHistoryMutation();

  const handleCheckCost = (values: FilterInputs) => {
    costMutation.mutate({
      origin: values.fromCity,
      destination: values.toCity,
      weight: (parseInt(values.weight) * 1000).toString(), // in gram
      courier: values.courier,
    });
  };

  const handleSaveHistory = (values: THistoryResponse) => {
    historyMutation.mutate(values);
  };

  const handleDeleteHistory = (values: THistoryResponse) => {
    deleteHistoryMutation.mutate({ id: values.id });
  };

  const handleApplyHistory = (values: THistoryResponse) => {
    if (!values.fromCity?.city_id || !values.toCity?.city_id) return;

    costMutation.mutate({
      origin: values.fromCity?.city_id,
      destination: values.toCity?.city_id,
      weight: (parseInt(values.weight) * 1000).toString(), // in gram
      courier: values.courier,
    });
  };

  return (
    <MainStyled>
      <Header />
      <Content>
        <Hero />
        <Filter
          historyProps={{
            history: historyQuery.data || [],
            handleDelete: handleDeleteHistory,
            handleApply: handleApplyHistory,
          }}
          formProps={{
            handleOnSubmit: handleCheckCost,
            handleSaveHistory,
            loading: costMutation.isLoading,
          }}
        />
        {costMutation.data?.rajaongkir.results.map((item) => (
          <ResultContainer key={item.code}>
            <DetailCourier>
              <DetailHeader>
                {item.code ? (
                  <CourierLogo $bg={courierLogo[item.code]}></CourierLogo>
                ) : null}
                <CourierName>
                  <Text
                    type="tag"
                    size="sm"
                    tagColor={getCourierColor(item.code)}
                  >
                    {item.code}
                  </Text>
                  <Text weight="bold">{item.name}</Text>
                </CourierName>
              </DetailHeader>

              {item.costs.length ? (
                <CourierService>
                  {item.costs.map((cost) => (
                    <ServiceCourierItem
                      key={cost.service}
                      cost={cost}
                      code={item.code}
                    />
                  ))}
                </CourierService>
              ) : (
                <NotFoundContainer>
                  <Text size="lg" color={Colors.primary.grayLight}>
                    Layanan Pengiriman Tidak Tersedia
                  </Text>
                </NotFoundContainer>
              )}
            </DetailCourier>
          </ResultContainer>
        ))}
      </Content>
      <Footer />
    </MainStyled>
  );
}
