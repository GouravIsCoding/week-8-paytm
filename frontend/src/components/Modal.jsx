import React, { useRef } from "react";
import Container from "./Container";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import { postTransfer } from "../backend";

export default function Modal({ name, token, to, setIsOpen }) {
  const inputRef = useRef(null);
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const closeModal = () => {
    setIsOpen(false);
  };
  const transfer = () => {
    const amount = Number(inputRef.current.value);
    setErr(null);
    setMsg(null);

    postTransfer(to, amount, token.userId).then((data) => {
      const { error, message } = data;
      if (message) {
        setMsg(message);
      } else if (error) {
        setErr(err);
      }
    });
  };
  return (
    <>
      <Container>
        <h1
          onClick={closeModal}
          className="text-2xl float-end mb-6  text-gray-200"
        >
          X
        </h1>
        <h1 className="text-3xl font-bold text-center px-2 py-4 my-7">
          Send Money
        </h1>
        <div>
          <h2 className="text-2xl font-semibold p-2 my-3">
            <span className="text-white bg-green-500 py-2 px-3 rounded-full font-normal m-2">
              {name[0]}
            </span>
            {name}
          </h2>
          <div className="px-2">
            <Input
              id={"amount"}
              ref={inputRef}
              className={"my-3"}
              type={"number"}
              label={"Amount (in Rs)"}
              placeholder={"Enter amount"}
            />
            {err && <p className="p-4 text-center text-red-600">{err}</p>}
            {msg && <p className="p-4 text-center text-green-600">{msg}</p>}
            <Button
              onClick={transfer}
              className="bg-green-500 hover:bg-green-600 "
            >
              Initiate Transfer
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
