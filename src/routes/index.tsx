import { createFileRoute, useNavigate } from "@tanstack/react-router";

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

export type THistorySearch = FilterInputs & {
  tab: string;
};

export const Route = createFileRoute("/")({
  component: Index,
  validateSearch: (search: THistorySearch): THistorySearch => {
    return {
      tab: search.tab,
      fromProvince: search?.fromProvince,
      fromCity: search.fromCity,
      toProvince: search.toProvince,
      toCity: search.toCity,
      courier: search.courier,
      weight: search.weight,
    };
  },
});

function Index() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const costMutation = useFetchCost();
  const historyQuery = useFetchHistory({ enabled: search.tab === "2" });
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

  const clearHistory = () => {
    navigate({
      search: () => ({}),
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
            onReset: clearHistory,
            defaultValues: search,
            handleOnSubmit: handleCheckCost,
            handleSaveHistory,
            loading: costMutation.isLoading,
          }}
        />
        {search.courier /* as if the results were also reseted, lol for the condition :) */ &&
          costMutation.data?.rajaongkir.results.map((item) => (
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
