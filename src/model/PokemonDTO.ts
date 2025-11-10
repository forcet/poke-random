import { AbilityDTO } from "./AbilityDTO";
import { DetailDTO } from "./DetailDTO";
import { SpritesDTO } from "./SpritesDTO";
import { TypesDTO } from "./TypesDTO";

export interface PokemonDTO {
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: AbilityDTO[];
    species: DetailDTO;
    sprites: SpritesDTO;
    types: TypesDTO[];
}