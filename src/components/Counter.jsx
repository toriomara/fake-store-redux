"use client";

import { decrement, increment } from "@/features/counter/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";

export const Counter = () => {
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.isAuthenticated);
  console.log("AUTH ===>>", auth);

  return (
    <div className="grid gap-6">
      <h1 className="text-4xl font-semibold">Counter: {counter}</h1>
      <div className="flex space-x-3">
        <Button className="w-fit" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Button className="w-fit" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
      </div>
    </div>
  );
};
