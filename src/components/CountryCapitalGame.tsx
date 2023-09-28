import React, { useState } from "react";

type ButtonState = "DEFAULT" | "SELECTED" | "WRONG";
type Option = {
  value: string;
  state: ButtonState;
};

function randomize() {
  return Math.random() - 0.5;
}

function getCountries(data: Record<string, string>) {
  return Object.keys(data);
}
function getCapitals(data: Record<string, string>) {
  return Object.values(data);
}

function getButtonClass(option: Option) {
  if (option.state === "SELECTED") {
    return "selected";
  } else if (option.state === "WRONG") {
    return "wrong";
  } else {
    return "";
  }
}

function isPartOfPair(opt: Option, selected: Option, option: Option) {
  return opt.value === selected.value || opt.value === option.value;
}

export default function CountryCapitalGame({
  data,
}: {
  data: Record<string, string>;
}) {
  const [options, setOptions] = useState<Option[]>(
    [...getCountries(data), ...getCapitals(data)]
      .sort(randomize)
      .map((value) => ({
        value,
        state: "DEFAULT",
      }))
  );

  const [selected, setSelected] = useState<Option>();

  const isGameOver = options.length === 0;

  function onButtonClick(option: Option) {
    if (!selected) {
      setOptions(options.map((opt) => ({ ...opt, state: "DEFAULT" })));

      setSelected(option);
      setOptions(
        //set bg to blue 009Bff
        options.map((opt) => ({
          ...opt,
          state: opt === option ? "SELECTED" : "DEFAULT",
        }))
      );
    } else {
      const capital = data[option.value];
      const selectedCapital = data[selected.value];

      if (
        //correct pair
        selected.value === capital ||
        selectedCapital === option.value
      ) {
        setOptions(
          options.filter((opt) => !isPartOfPair(opt, option, selected))
        );
      } else {
        //wrong pair
        setOptions(
          options.map((opt) => ({
            ...opt,
            state: isPartOfPair(opt, option, selected) ? "WRONG" : opt.state,
          }))
        );
      }
      setSelected(undefined);
    }
  }
  if (isGameOver) {
    return <div>Congretulations!</div>;
  }
  return (
    <>
      {options.map((option) => {
        return (
          <button
            className={getButtonClass(option)}
            key={option.value}
            onClick={() => onButtonClick(option)}
          >
            {option.value}
          </button>
        );
      })}
    </>
  );
}
