import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { postSignup } from "../backend";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";

export default function Signup(props) {
  const { register, handleSubmit } = useForm();

  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const signUp = (signupData) => {
    setErr(null);
    setMsg(null);

    postSignup(signupData).then((data) => {
      const { error, message } = data;
      if (error) {
        setErr(error);
      } else if (message) {
        setMsg(message);
      }
    });
  };

  return (
    <>
      <Container>
        <h1 className="text-center text-4xl">Signup</h1>
        <p className="px-5 py-4 text-gray-500 text-center">
          Enter your information to create an account
        </p>
        <form className="space-y-6" onSubmit={handleSubmit(signUp)}>
          <Input
            placeholder={"Gourav"}
            id={"firstName"}
            label={"First Name"}
            {...register("firstName", { required: true })}
          />
          <Input
            placeholder={"Thakur"}
            id={"lastName"}
            label={"Last Name"}
            {...register("lastName", { required: true })}
          />
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
          <Button>Sign up</Button>
        </form>
        {err && <p className="p-4 text-center text-red-600">{err}</p>}
        {msg && <p className="p-4 text-center text-green-600">{msg}</p>}

        <p className="p-4 text-center">
          Already have an account?{" "}
          <Link to={"/signin"} className="underline">
            Login
          </Link>
        </p>
      </Container>
    </>
  );
}
