import { useEffect, useState } from "react";
import styles from "./MealList.module.css";
import { Card } from "../UI/Card";
import { MealItem } from "./MealItem/MealItem";

export const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpErrorMessage, setHttpErrorMessage] = useState();

  // Состояния для фильтров
  const [brandFilter, setBrandFilter] = useState("");
  const [flavorFilter, setFlavorFilter] = useState("");

  // Состояние для сортировки
  const [sortOrder, setSortOrder] = useState("asc");

  // Состояние для видимости стрелки
  const [showScrollUp, setShowScrollUp] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://react-app-catfood-95a52-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("Что-то пошло не так");
      }

      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
          flavor: responseData[key].flavor,
          brand: responseData[key].brand,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((err) => {
      setIsLoading(false);
      setHttpErrorMessage(err.message);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Отображаем стрелку, когда прокручиваем вниз больше 200 пикселей
      if (window.scrollY > 200) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

  const filteredMeals = meals.filter((meal) => {
    const matchesBrand = brandFilter ? meal.brand === brandFilter : true;
    const matchesFlavor = flavorFilter ? meal.flavor === flavorFilter : true;
    return matchesBrand && matchesFlavor;
  });

  filteredMeals.sort((a, b) => {
    return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
  });

  const mealList = filteredMeals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      flavor={meal.flavor}
      brand={meal.brand}
    />
  ));

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

        <ul>{mealList}</ul>
      </Card>

      {/* Стрелка для прокрутки вверх */}
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
