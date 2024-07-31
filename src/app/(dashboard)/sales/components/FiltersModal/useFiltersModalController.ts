import { useState } from "react";

export function useFiltersModalController() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step);
  }

  return {
    selectedYear,
    handleChangeYear
  };
}
