"use client";

import { setCookie } from "cookies-next/client";
import { useEffect, useState } from "react";

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({
  currentTab = 1,
  tabOptions = [1, 2, 3, 4],
}: Props) => {
  const [selected, setSelected] = useState(currentTab);

  useEffect(() => {
    if (currentTab < 1 || currentTab > tabOptions.length) {
      setSelected(1);
      setCookie("selectedTab", 1);
    }
  }, [currentTab, tabOptions.length]);

  const handleTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie("selectedTab", tab);
  };

  return (
    <div className="flex gap-2 rounded-xl bg-gray-200 p-2">
      {tabOptions.map((option) => (
        <div key={option}>
          <input
            checked={selected === option}
            onChange={() => handleTabSelected(option)}
            type="radio"
            id={option.toString()}
            className="peer hidden"
          />
          <label
            htmlFor={option.toString()}
            className="block cursor-pointer rounded-xl p-3 px-5 text-center transition-all select-none peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            onClick={() => handleTabSelected(option)}
          >
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};
