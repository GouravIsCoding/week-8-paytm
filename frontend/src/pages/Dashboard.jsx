import React, { useState, useEffect, useRef } from "react";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../atoms";
import { getBalance, getFilterUsers } from "../backend";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import Modal from "../components/Modal";

export default function Dashboard(props) {
  const inputRef = useRef(null);
  let timer;
  const token = useRecoilValue(tokenAtom);
  const [input, setInput] = useState("");
  const [err, setErr] = useState(null);
  const [data, setData] = useState([]);
  const [name, setName] = useState(null);
  const [bal, setBal] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState(null);
  const filterUsers = useMemo(() => {
    const filterVal = input;
    getFilterUsers(input, token.userId).then((info) => {
      setData(() => info.users);
    });
  }, [input]);
  const inputChange = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const value = inputRef.current.value;

      setInput(value);
    }, 500);
  };

  const onClick = (e) => {
    const target = e.target.closest(".idbutton");
    const userId = target.getAttribute("id");
    setId(userId);

    const user = data.find((user) => user._id === userId);
    setName(`${user.firstName} ${user.lastName}`);

    setIsOpen(true);
  };
  useEffect(() => {
    setErr(null);
    getBalance(token.userId).then((data) => {
      const { error, balance } = data;
      if (balance) {
        setBal(balance);
      } else if (error) {
        setErr(error);
      }
    });
  }, [isOpen]);
  if (!isOpen) {
    return (
      <>
        <div>
          <div className="flex justify-between py-5 shadow-sm shadow-gray-200 bg-gray-50 px-5 mt-2">
            <h1 className="text-xl font-bold">Payments App</h1>
            <h1>
              Hello, User{" "}
              <span className="bg-gray-200 font-medium py-2 px-3 m-2 rounded-full">
                U
              </span>
            </h1>
          </div>

          {err && (
            <div className="block text-center bg-red-500">
              <h1 className="inline-block text-white text-xl py-5 px-8">
                {err}
              </h1>
            </div>
          )}
          <div className=" bg-gray-100 h-screen">
            <h1 className="text-xl font-bold px-4 py-6">
              Your balance Rs {bal}
            </h1>
            <div className="px-4">
              <Input
                onChange={inputChange}
                className2={"font-bold text-xl"}
                className={"p-2"}
                id={"filter"}
                ref={inputRef}
                label={"Users"}
                placeholder={"Search user..."}
              />
            </div>
            <div className="px-4">
              <ul className="py-2">
                {data.map((user) => (
                  <li
                    className="py-1 px-2 shadow-sm my-3 bg-gray-50"
                    key={user._id}
                  >
                    <div className="flex s justify-between items-center">
                      <div className="p-2 m-2">{`${user.firstName} ${user.lastName}`}</div>
                      <Button
                        onClick={onClick}
                        id={user._id}
                        className="w-[30%] sm:w-[20%] lg:w-[10%] text-xs md:text-sm idbutton"
                      >
                        Send Money
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  } else if (isOpen) {
    return (
      <div className="bg-gray-100 h-screen">
        <Modal name={name} to={id} token={token} setIsOpen={setIsOpen} />
      </div>
    );
  }
}
