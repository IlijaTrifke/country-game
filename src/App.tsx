import CountryCapitalGame from "./components/CountryCapitalGame";

function App() {
  return (
    <>
      <CountryCapitalGame
        data={{
          Germany: "Berlin",
          Azerbaijan: "Baku",
          Serbia: "Belgrade",
        }}
      />
    </>
  );
}

export default App;
