import { useState } from "react";
import { Button, Input } from "antd";
import styled from "styled-components";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { createFileRoute } from "@tanstack/react-router";

import { Text } from "@/components/text";
import { Colors } from "@helpers/utils";

type LoginForm = {
  username: string;
  password: string;
};

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const isAuth = localStorage.getItem("isAuth");

  const {
    control,
    formState: { isValid },
    handleSubmit,
  } = useForm<LoginForm>();

  const [error, setError] = useState(false);

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    if (data.username === "ongkir" && data.password === "ongkir") {
      localStorage.setItem("isAuth", JSON.stringify("true"));
      return;
    }

    setError(true);
  };

  if (isAuth) {
    // return <Navigate to="/" replace />;
  }

  return (
    <LoginStyled>
      <Text
        size="xl"
        weight="bold"
        style={{ width: "fit-content", margin: "0 auto" }}
      >
        Login
      </Text>
      <FormLogin onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="username"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChange={onChange} placeholder="username" />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <Input.Password
              value={value}
              onChange={onChange}
              placeholder="password"
            />
          )}
        />
        <Button type="primary" htmlType="submit" disabled={!isValid}>
          Login
        </Button>
      </FormLogin>

      <Info $isError={error}>
        <Text size="sm" color={Colors.indicator.green.fg} weight="bold">
          username: ongkir, password: ongkir
        </Text>
      </Info>
    </LoginStyled>
  );
}

const LoginStyled = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 350px;
  border-radius: 10px;
  padding: 20px 10px;
  box-shadow: 1px 1px 50px -10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormLogin = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Info = styled.div<{ $isError: boolean }>`
  padding: 10px;
  border-radius: 5px;
  background-color: ${Colors.indicator.green.bg};
  outline: 2px solid
    ${(props) =>
      props.$isError ? Colors.primary.red : Colors.indicator.green.bg};
`;
