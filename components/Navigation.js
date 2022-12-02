import Image from "next/image";
import { use, useEffect, useRef, useState } from "react";
import styles from "./navigation.module.scss";
import MensaApi from "../lip/api/Mensa";

export default function Navigation() {
  const [locations, setLocations] = useState([]);
  const [locationsDisplay, setLocationsDisplay] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDay, setIsDay] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("Zollikofen");
  const [searchTerm, setSearchTerm] = useState(currentLocation);

  //extract to .env.local
  const displayCount = 5;

  useEffect(() => {
    const fetch = async () => {
      const resp = await MensaApi.getAll();
      let x = [];

      for (let key in resp) {
        x.push(resp[key].name);
      }

      setLocations(x);
    };

    fetch();

    window.addEventListener("click", handleDropDownState);

    return () => {
      window.removeEventListener("click", handleDropDownState);
    };
  }, []);

  const onClickSearch = () => {
    setSearchTerm("");
  };

  const handleDropDownState = (e) => {
    if (
      e.target.id != "display-list" &&
      e.target.id != "search-input" &&
      !e.target.classList.contains("locationContainer")
    ) {
      setIsSearching(false);
      setLocationsDisplay([]);
      setCurrentLocation((x) => {
        setSearchTerm(x);
        return x;
      });
    }
  };

  const search = (e) => {
    setIsSearching(true);
    setSearchTerm(e.currentTarget.value);

    let x = locations.filter((location) =>
      location.includes(e.currentTarget.value)
    );

    if (x.length > displayCount) {
      x = x.slice(0, displayCount);
    }

    setLocationsDisplay(x);
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
    <div className={styles.container} id="lol">
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
        {/*todo: overrengineer searchbar...*/}
        <div className={styles.searchbar}>
          <input
            value={searchTerm}
            onChange={(e) => search(e)}
            style={{
              borderBottomRightRadius: isSearching ? "0px" : "5px",
              borderBottomLeftRadius: isSearching ? "0px" : "5px",
            }}
            onClick={onClickSearch}
            id="search-input"
          />
          <div className={styles.displayList} id="display-list">
            {locationsDisplay.map((location) => {
              //add key to p
              return (
                <div
                  className={`${styles.locationContainer} locationContainer`}
                  key={location}
                >
                  {location}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
