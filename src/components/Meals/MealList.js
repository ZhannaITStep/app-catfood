import { useEffect, useState } from "react";
import styles from "./MealList.module.css";
import { Card } from "../Card/Card";
import { MealItem } from "./MealItem/MealItem";

export const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpErrorMessage, setHttpErrorMessage] = useState(null);
  const [brandFilter, setBrandFilter] = useState("");
  const [flavorFilter, setFlavorFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          "https://react-app-catfood-95a52-default-rtdb.firebaseio.com/meals.json"
        );
        if (!response.ok) throw new Error("Что-то пошло не так");
        const responseData = await response.json();

        const loadedMeals = Object.keys(responseData).map((key) => ({
          id: key,
          ...responseData[key],
        }));

        setMeals(loadedMeals);
      } catch (error) {
        setHttpErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollUp(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredMeals = meals
    .filter(
      (meal) =>
        (!brandFilter || meal.brand === brandFilter) &&
        (!flavorFilter || meal.flavor === flavorFilter)
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  if (isLoading) {
    return (
      <section className={styles.loading}>
        <p>Извлечение данных с сервера...</p>
      </section>
    );
  }

  if (httpErrorMessage) {
    return (
      <section className={styles.error}>
        <p>{httpErrorMessage}</p>
      </section>
    );
  }

  return (
    <section className={styles.meals}>
      <Card>
        <div className={styles.filters}>
          <label htmlFor="brand">Бренд:</label>
          <select
            id="brand"
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          >
            <option value="">Все</option>
            <option value="Brand A">Brand A</option>
            <option value="Brand B">Brand B</option>
            <option value="Brand C">Brand C</option>
            <option value="Brand D">Brand D</option>
          </select>

          <label htmlFor="flavor">Вкус:</label>
          <select
            id="flavor"
            value={flavorFilter}
            onChange={(e) => setFlavorFilter(e.target.value)}
          >
            <option value="">Все</option>
            <option value="Курица">Курица</option>
            <option value="Рыба">Рыба</option>
            <option value="Говядина">Говядина</option>
            <option value="Индейка">Индейка</option>
            <option value="Ягненок">Ягненок</option>
            <option value="Утка">Утка</option>
            <option value="Курица и индейка">Курица и индейка</option>
          </select>

          <label htmlFor="sortOrder">Сортировка по цене:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </div>

        <ul>
          {filteredMeals.map((meal) => (
            <MealItem key={meal.id} {...meal} />
          ))}
        </ul>
      </Card>

      {showScrollUp && (
        <button
          className={styles.scrollUp}
          onClick={scrollToTop}
          aria-label="Прокрутить вверх"
        >
          &#8593;
        </button>
      )}
    </section>
  );
};
