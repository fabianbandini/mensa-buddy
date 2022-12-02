import { useState, useEffect } from "react";
import MensaAPI from "../lip/api/Mensa";
import styles from "./mensas.module.scss";

export default function Mensas() {
  const [currentMenu, setCurrentMenu] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(async () => {
    setLoading(true);
    try {
      const resp = await MensaAPI.get("zollikofen");
      setCurrentMenu(resp);
    } catch {
      setLoading(false);
      setError(true);
    }

    setLoading(false);
  }, []);

  return (
    <>
      {isLoading && <p>loading</p>}
      <div className="styles.wrapper">
        {!error && <div></div>}

        {error && <h1>Error</h1>}
      </div>
    </>
  );
}
