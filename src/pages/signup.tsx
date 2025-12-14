import Head from "next/head";
import SignUpPage from "../components/layout/SignUpPage";

export default function LoginRoute() {
  return (
    <>
      <Head>
        <title>Sign Up - MYPOS</title>
      </Head>
      <SignUpPage />
    </>
  );
}
