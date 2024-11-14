import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { Container, LoginContainer, Column, Spacing, Title } from "./styles";
import { defaultValues, IFormLogin } from "./types";

const schema = yup.object({
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .min(6, "No mínimo 6 caracteres")
    .required("Campo obrigatório"),
}).required();

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch, 
  } = useForm<IFormLogin>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = (data: IFormLogin) => {
    console.log("Dados do formulário:", data);
    // VJ: Logica do Login.
  };

  const email = watch("email");
  const password = watch("password");

  const isButtonDisabled = !email || !password || !!errors.email || !!errors.password;

  const handleButtonClick = (e: React.MouseEvent) => {
    if (isButtonDisabled) {
      e.preventDefault(); 
      return;
    }
    handleSubmit(onSubmit)(e);
  };

  return (
    <Container>
      <LoginContainer>
        <Column>
          <Title>Login</Title>
          <Spacing />
          <Input
            name="email"
            placeholder="Email"
            control={control}
            errorMessage={errors?.email?.message}
          />
          <Spacing />
          <Input
            name="password"
            type="password"
            placeholder="Senha"
            control={control}
            errorMessage={errors?.password?.message}
          />
          <Spacing />
          <Button
            title="Entrar"
            onClick={handleButtonClick} 
          />
        </Column>
      </LoginContainer>
    </Container>
  );
};

export default Login;
