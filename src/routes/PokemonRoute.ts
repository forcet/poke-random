import { Router, Request, Response, NextFunction } from "express";
import { PokemonService } from "../service/PokemonService";

const router = Router();
const pokemonService = new PokemonService();


router.get("/pokemon", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pokemon = await pokemonService.getRandomPokemon();  
      console.log(pokemon);
      if (!pokemon) return res.status(404).send("lo siento no hay datos");
      return res.send(pokemon.toString()); 
    } catch (err) {
      next(err);
    }
});

router.get("/pokemon/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params;
    const numericId = Number(id); 
    if (Number.isNaN(numericId)) {
      return res
        .status(400)
        .json({ message: "El parámetro :id debe ser numérico" });
    }

    const pokemon = await pokemonService.getPokemon(numericId);  
    console.log(pokemon);
    if (!pokemon) return res.status(404).json({ message: "lo siento no hay datos" });
    return res.status(200).json(pokemon); 
  } catch (err) {
    next(err);
  }
});

router.get("/info/pokemon", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pokemones = await pokemonService.getAllPokemon();
    const reduceMap = pokemones.map(poke => {
      return {name: poke.name, image: poke.defaultImage, code: poke.code};
    })
    console.log(reduceMap);
    if (!reduceMap) return res.status(404).json({ message: "lo siento no hay datos" });
    return res.status(200).json(reduceMap); 
  } catch (err) {
    next(err);
  }
});

router.get("/all/pokemon", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pokemon = await pokemonService.getAllPokemon();  
    if (!pokemon) return res.status(404).json({ message: "lo siento no hay datos" });
    return res.status(200).json(pokemon); 
  } catch (err) {
    next(err);
  }
});

router.post("/pokemon", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const pokemon = await pokemonService.getRandomPokemon();
    if (!pokemon) {
      return res.status(404).json({ message: "No encontrado" });
    }
    return res.status(200).json(pokemon);
  } catch (err) {
    next(err);
  }
});

router.delete("/pokemon/:id", async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const numericId = Number(id); 
    if (Number.isNaN(numericId)) {
      return res
        .status(400)
        .json({ message: "El parámetro :id debe ser numérico" });
    }
    await pokemonService.deletePokemon(numericId);
    return res
        .status(200)
        .json({ message: "Pokemon borrado del registro" });  
  } catch (error) {
    next(error);
  }
});

export default router;