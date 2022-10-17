import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  //We use the react hook -'useParams' to work with the Link from react router
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  //We set up the useEffect so that anytime the component renders we would fetch the info about that specific cocktail

  //We already have our lookup url but we would need to tweak it so that the parameter can indicate the specific id that is being looked up

  //Anytime the id changes or the app renders, we use useEffect
  React.useEffect(() => {
    setLoading(true);
    async function getCocktail() {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();

        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngedient1,
            strIngedient2,
            strIngedient3,
            strIngedient4,
            strIngedient5,
          } = data.drinks[0];
          const ingredients = [
            strIngedient1,
            strIngedient2,
            strIngedient3,
            strIngedient4,
            strIngedient5,
          ];

          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
        } else {
          setCocktail(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getCocktail();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!cocktail) {
    return <h2 className="section-title">No cocktail to display</h2>;
  }

  const { name, image, category, info, glass, instructions, ingredients } =
    cocktail;
  return (
    <section>
      <h2 className="section-title">{name}</h2>
    </section>
  );
};

export default SingleCocktail;
