import Head from "next/head";
import LoginPage from "../components/layout/LoginPage";

export default function LoginRoute() {
  return (
    <>
      <Head>
        <title>Login - MYPOS</title>
      </Head>
      <LoginPage />
    </>
  );
}
