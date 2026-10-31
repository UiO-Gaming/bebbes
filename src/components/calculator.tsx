import { useState } from "react";
import styles from "./calculator.module.css";

const MAX_PEOPLE = 3000;
const BOTTLE_CENTILITERS = 150;
const SLICES_PER_PIZZA = 8;

const calculateLiters = (people: number, thirstiness: number) => {
  return Math.ceil((people * thirstiness) / 100);
};

const calculateBottles = (people: number, thirstiness: number) => {
  return Math.ceil((people * thirstiness) / BOTTLE_CENTILITERS);
};

const calculatePizzaSlices = (people: number, hungriness: number) => {
  return Math.ceil(people * hungriness);
};

const calculatePizzas = (people: number, hungriness: number) => {
  return Math.ceil(calculatePizzaSlices(people, hungriness) / SLICES_PER_PIZZA);
};

const Calculator = () => {
  const [people, setPeople] = useState(0);
  const [thirstiness, setThirstiness] = useState(50);
  const [hungriness, setHungriness] = useState(3);

  return (
    <main className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input
          className={styles.formPeople}
          type="number"
          placeholder="Antall personer"
          aria-label="Antall personer"
          min={1}
          max={MAX_PEOPLE}
          step={1}
          onChange={(e) => {
            const value = e.target.valueAsNumber;
            setPeople(
              Number.isNaN(value)
                ? 0
                : Math.min(Math.max(Math.floor(value), 0), MAX_PEOPLE)
            );
          }}
        />

        <select
          aria-label="Hvor tørste er dere?"
          value={thirstiness}
          onChange={(e) => {
            setThirstiness(Number(e.target.value));
          }}
        >
          <option value={33}>Noe å småslurke på</option>
          <option value={50}>Tørst</option>
          <option value={70}>Dehydrert</option>
        </select>

        <select
          aria-label="Hvor sultne er dere?"
          value={hungriness}
          onChange={(e) => {
            setHungriness(Number(e.target.value));
          }}
        >
          <option value={2}>Småspising</option>
          <option value={3}>Sulten</option>
          <option value={5}>Skrubbsulten</option>
        </select>
      </form>

      <div className={styles.resultContainer}>
        <div className={styles.results}>
          <p>
            <span className={styles.big}>
              {calculateLiters(people, thirstiness)}
            </span>{" "}
            liter
          </p>
          <p className={styles.or}>eller</p>
          <p>
            <span className={styles.big}>
              {calculateBottles(people, thirstiness)}
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
    </main>
  );
};

export default Calculator;
