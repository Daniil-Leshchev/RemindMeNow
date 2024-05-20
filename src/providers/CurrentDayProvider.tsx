import { PropsWithChildren, createContext, useContext, useState } from "react";
import React from "react";

const CurrentDayContext = createContext({
  currentDay: Date.prototype,
  setContextDay: (chosenDay: Date) => {},
});

const CurrentDayProvider = ({ children }: PropsWithChildren) => {
  const newDate = new Date();
  newDate.setHours(0, 0, 0, 0);
  const [currentDay, setDay] = useState(newDate);

  const setContextDay = (chosenDay: Date) => {
    setDay(chosenDay);
  }

  return (
    <CurrentDayContext.Provider value={{ currentDay, setContextDay }}>
      {children}
    </CurrentDayContext.Provider>
  )
};

export default CurrentDayProvider;
export const useCurrentDay = () => useContext(CurrentDayContext);