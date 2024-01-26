import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { tokenAtom } from "../atoms";
import { postLogin } from "../backend";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";

export default function Signin(props) {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const setTokenVal = useSetRecoilState(tokenAtom);
  const { register, handleSubmit } = useForm();
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const signIn = (signinData) => {
    setErr(null);
    setMsg(null);

    postLogin(signinData).then((data) => {
      const { error, message, token } = data;
      if (error) {
        setErr(error);
      } else if (message) {
        setTokenVal({ userId: token });
        navigate("/dashboard", { state: { message } });
      }
    });
  };

  return (
    <>
      <Container>
        <h1 className="text-center text-4xl">Signin</h1>
        <p className="px-5 py-4 text-gray-500 text-center">
          Enter your credentials to access your account
        </p>
        <form className="space-y-6" onSubmit={handleSubmit(signIn)}>
          <Input
            placeholder={"gouravthakur@example.com"}
            id={"email"}
            label={"Email"}
            {...register("username", { required: true })}
          />
          <Input
            className={"py-3 text-lg"}
            id={"password"}
            label={"password"}
            type={"password"}
            {...register("password", { required: true })}
          />
          <Button>Signin</Button>
        </form>
        {err && <p className="p-4 text-center text-red-600">{err}</p>}
        {msg && <p className="p-4 text-center text-green-600">{msg}</p>}
        {data && <p className="p-4 text-center text-green-600">{data}</p>}

        <p className="p-4 text-center">
          Don't have an account?{" "}
          <Link to={"/signup"} className="underline">
            Signup
          </Link>
        </p>
      </Container>
    </>
  );
}
