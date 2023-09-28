import React, { useState } from "react";

type ButtonState = "DEFAULT" | "SELECTED" | "WRONG";
type Option = {
  value: string;
  state: ButtonState;
};

export default function CountryCapitalGame({
  data,
}: {
  data: Record<string, string>;
}) {
  const countries = Object.keys(data);
  const capitals = Object.values(data);
  const [options, setOptions] = useState<Option[]>(
    [...countries, ...capitals]
      .sort(() => Math.random() - 0.5)
      .map((value) => ({
        value,
        state: "DEFAULT",
      }))
  );

  const [selected, setSelected] = useState<Option>();
  const isGameOver = options.length === 0;
  if (isGameOver) {
    return <div>Congretulations!</div>;
  }
  return (
    <>
      {options.map((option) => {
        return (
          <button
            className={
              option.state === "SELECTED"
                ? "selected"
                : option.state === "WRONG"
                ? "wrong"
                : ""
            }
            key={option.value}
            onClick={() => {
              if (!selected) {
                setOptions(
                  options.map((opt) => ({ ...opt, state: "DEFAULT" }))
                );

                setSelected(option);
                setOptions(
                  //set bg to blue 009Bff
                  options.map((opt) => {
                    return opt === option
                      ? {
                          ...option,
                          state: "SELECTED",
                        }
                      : { ...opt, state: "DEFAULT" };
                  })
                );
              } else {
                if (
                  //correct pair
                  selected.value === data[option.value] ||
                  data[selected.value] === option.value
                ) {
                  setOptions(
                    options.filter((opt) => {
                      return !(
                        opt.value === selected.value ||
                        opt.value === option.value
                      );
                    })
                  );
                } else {
                  //wrong pair
                  setOptions(
                    options.map((opt) => {
                      return opt.value === selected.value ||
                        opt.value === option.value
                        ? { ...opt, state: "WRONG" }
                        : opt;
                    })
                  );
                }
                setSelected(undefined);
              }
            }}
          >
            {option.value}
          </button>
        );
      })}
    </>
  );
}
