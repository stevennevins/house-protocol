import { motion } from "framer-motion";
import React, { useState } from "react";
import { useInterval } from "../hooks";

export default function BouncingBall({ result = null, isHi = true, hi = 200 }) {
  const [count, setCount] = useState(0);

  function rand(max = hi) {
    return Math.floor(Math.random() * max);
  }

  const Counter = ({ valueFrom = 0, valueTo = hi, duration = 1300 }) => {
    useInterval(() => {
      if (result === null) {
        setCount(rand(valueTo - valueFrom));
      } else {
        setCount(result);
      }
    }, duration);
    return count;
  };

  const loss = {
    width: "10rem",
    height: "10rem",
    backgroundColor: "#FF0000",
    borderRadius: "5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3.33rem",
  };

  const win = {
    width: "10rem",
    height: "10rem",
    backgroundColor: "#00FF00",
    borderRadius: "5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3.33rem",
  };

  function getCircleStyle(count = hi) {
    if (count > 100 && isHi) {
      return win;
    }
    if (count < 100 && !isHi) {
      return win;
    }
    return loss;
  }

  function getAnimate() {
    if (result === null) {
      return ["-25%", "25%"];
    }
    return "0%";
  }
  const bounceTransition = {
    y: {
      duration: 0.65,
      yoyo: Infinity,
      ease: "easeIn",
    },
  };
  return (
    <motion.div
      style={getCircleStyle(count)}
      transition={bounceTransition}
      animate={{
        y: getAnimate(),
      }}
    >
      <Counter style={{}} />
    </motion.div>
  );
}
