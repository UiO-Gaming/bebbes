import React, { useState } from "react";
import styles from "./calculator.module.css";

import { useForm } from "react-hook-form";

type calcTypes = {
  people: number;
  thirstyness: number;
  hungriness: number;
};

const calculateLiters = (people: number, thirstyness: number) => {
  return Math.ceil(people * thirstyness);
};

const calculateBottles = (people: number, thirstyness: number) => {
  return Math.ceil(calculateLiters(people, thirstyness) / 1.5);
};

const calculatePizzaSlices = (people: number, hungriness: number) => {
  return Math.ceil(people * hungriness);
};

const calculatePizzas = (people: number, hungriness: number) => {
  return Math.ceil(calculatePizzaSlices(people, hungriness) / 8);
};

const Calculator = () => {
  const {
    register,
    formState: { errors },
  } = useForm<calcTypes>();

  const [people, setPeople] = useState(0);
  const [thirstyness, setThirstyness] = useState(0.5);
  const [hungriness, setHungriness] = useState(3);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <input
          className={styles.formPeople}
          type="number"
          placeholder="Antall personer"
          {...(register("people"), { required: true, min: 1, max: 3000 })}
          onChange={(e) => {
            if (!e.target.value) {
              setPeople(0);
            } else {
              setPeople(e.target.valueAsNumber);
            }
          }}
        />

        <select
          {...register("thirstyness")}
          onChange={(e) => {
            setThirstyness(Number(e.target.value));
          }}
        >
          <option value={0.33}>Noe å sippe på</option>
          <option value={0.5} selected={true}>
            Tørst
          </option>
          <option value={0.7}>Dehydrert</option>
        </select>

        <select
          {...register("hungriness")}
          onChange={(e) => {
            setHungriness(Number(e.target.value));
          }}
        >
          <option value={2}>Småspising</option>
          <option selected={true} value={3}>
            Sulten
          </option>
          <option value={5}>Skrubbsulten</option>
        </select>
      </form>

      <div className={styles.resultContainer}>
        <div className={styles.results}>
          <p>
            <span className={styles.big}>
              {calculateLiters(people, thirstyness)}
            </span>{" "}
            liter
          </p>
          <p className={styles.or}>eller</p>
          <p>
            <span className={styles.big}>
              {calculateBottles(people, thirstyness)}
            </span>{" "}
            flasker (1,5L)
          </p>
        </div>
        <div className={styles.results}>
          <p>
            <span className={styles.big}>
              {calculatePizzaSlices(people, hungriness)}
            </span>{" "}
            pizzastykker
          </p>
          <p className={styles.or}>eller</p>
          <p>
            <span className={styles.big}>
              {calculatePizzas(people, hungriness)}
            </span>{" "}
            store pizzaer
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
