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
  const [isGlutenFreeFilter, setIsGlutenFreeFilter] = useState(false);
  const [isOrganicFilter, setIsOrganicFilter] = useState(false);

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
          is_gluten_free: responseData[key].is_gluten_free,
          is_organic: responseData[key].is_organic,
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
    const matchesGlutenFree = isGlutenFreeFilter ? meal.is_gluten_free : true;
    const matchesOrganic = isOrganicFilter ? meal.is_organic : true;

    return matchesBrand && matchesFlavor && matchesGlutenFree && matchesOrganic;
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
      isGlutenFree={meal.is_gluten_free}
      isOrganic={meal.is_organic}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        {/* Форма фильтрации */}
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
            <option value="Лосось">Лосось</option>
            <option value="Говядина">Говядина</option>
            <option value="Индейка">Индейка</option>
            <option value="Ягненок">Ягненок</option>
          </select>

          <label htmlFor="is_gluten_free">
            <input
              type="checkbox"
              id="is_gluten_free"
              checked={isGlutenFreeFilter}
              onChange={(e) => setIsGlutenFreeFilter(e.target.checked)}
            />
            Безглютеновый
          </label>

          <label htmlFor="is_organic">
            <input
              type="checkbox"
              id="is_organic"
              checked={isOrganicFilter}
              onChange={(e) => setIsOrganicFilter(e.target.checked)}
            />
            Органический
          </label>
        </div>

        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};
