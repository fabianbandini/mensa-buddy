import Image from "next/image";
import { use, useEffect, useState } from "react";
import styles from "./navigation.module.scss";
import MensaApi from "../lip/api/Mensa"

export default function Navigation() {
  const [locations, setLocations] = useState([]);
  const [isDay, setIsDay] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Zollikofen");

  useEffect(async () => {
    const resp = await MensaApi.getAll();
    console.log(resp);
  }, []) 

  const clickDropdown = () => {
    setClicked(!clicked);
  };

  const optionClicked = (location) => {
    setCurrentLocation(location);
    setClicked(false);
  };

  const clickChangeDisplayMode = (mode) => {
    if (mode == "day" && isDay) {
      return;
    }

    if (mode == "week" && !isDay) {
      return;
    }
    setIsDay(!isDay);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h2>
          Mensa <span>Buddy</span>
        </h2>
      </div>
      <div className={styles.right}>
        <div className={styles.iconContainer}>
          <img
            src="/calendar-day.svg"
            className={isDay ? styles.iconActive : ""}
            onClick={() => clickChangeDisplayMode("day")}
          />
          <img
            src="/calendar-week.svg"
            className={!isDay ? styles.iconActive : ""}
            onClick={() => clickChangeDisplayMode("week")}
          />
        </div>
        <div className={styles.dropdown}>
          <span
            className={
              !clicked
                ? styles.current
                : styles.current + " " + styles.currentActive
            }
            onClick={clickDropdown}
          >
            {currentLocation}
            <div className={styles.arrow}></div>
          </span>
          <div
            className={
              !clicked
                ? styles.options + " " + styles.optionsInactive
                : styles.options + " " + styles.optionsActive
            }
          >
            {locations.map((location) => {
              return (
                <span
                  className={styles.option}
                  onClick={() => optionClicked(location)}
                >
                  {location}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
