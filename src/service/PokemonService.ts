import { Pokemon } from "../model/Pokemon";
import { PokemonDTO } from "../model/PokemonDTO";
import { AbilityDTO } from "../model/AbilityDTO";
import { Ability } from "../model/Ability";
import { SpeciesDTO } from "../model/SpeciesDTO";
import { AbilityServiceDTO } from "../model/AbilityServiceDTO";
import { SpecieServiceDTO } from "../model/SpecieServiceDTO";
import { Http } from "./Http";
import { Species } from "../model/Species";
import { TypesDTO } from "../model/TypesDTO";
import { Types } from "../model/Types";
import { TypeServiceDTO } from "../model/TypeServiceDTO";
import { TypesData } from "../model/TypesData";
import { Weakness } from "../model/Weakness";
import { Random } from "../util/Random";
import { PokeData } from "../model/PokeData";

export class PokemonService { 
    async getRandomPokemon(): Promise<Pokemon> {
      const envValue = process.env.MAX_RANDOM_VALUE ?? 700;
      const maxValue = Number(envValue);
      const number = Random.int(1, maxValue);
      const serviceUrl = process.env.SERVICE_URL ?? "https://pokeapi.co/api/v2/pokemon/";
        const dto = await Http.getJson<PokemonDTO>(
          `${serviceUrl}${number}`
        );
        const abilities = await this.buildAbilitiesDto(dto.abilities);
        const species = await this.buildSpeciesDto(dto.species);
        const types = await this.buildTypesDto(dto.types);
        const typesUpdate : Types[] = types.map(({ damage_relations, ...rest }) => rest);
        const weakness = await this.buildWeaknessDto(types);
        const pokemonData = Pokemon.fromDTO(dto, abilities, species, typesUpdate, weakness);
        const result = await this.savePokemon(pokemonData);
        console.log(`Ejecución del servicio de guardado ${result.message} - ${result.insertedId}`);
        return pokemonData;
    }

    async getPokemon(id:number): Promise<Pokemon> {
      const serviceUrl = process.env.SERVICE_DATA_URL ?? "http://localhost:3001/data/";
        return await Http.getJson<Pokemon>(`${serviceUrl}${id}`);
    }

    async getAllPokemon(): Promise<Pokemon[]> {
      const serviceUrl = process.env.SERVICE_ALL_DATA_URL ?? "http://localhost:3001/getData";
        return await Http.getJson<Pokemon[]>(`${serviceUrl}`);
    }

    async savePokemon(pokemon: Pokemon): Promise<PokeData> {
      const serviceUrl = process.env.SERVICE_SAVE_DATA_URL ?? "http://localhost:3001/createData";
      return await Http.postJson<typeof pokemon, PokeData>(
        serviceUrl,
        pokemon
      );
    }

    async deletePokemon(id:number): Promise<void> {
      const serviceUrl = process.env.SERVICE_DATA_URL ?? "http://localhost:3001/data/";
      return await Http.delete(id, serviceUrl);
    }

     async buildAbilitiesDto(abilities: AbilityDTO[]): Promise<Ability[]> {
      const result = await Promise.all(
        abilities.map(async (item): Promise<Ability> => {
          const { ability, is_hidden, slot } = item;
          const abilityData = await Http.getJson<AbilityServiceDTO>(ability.url);
          const name = abilityData.names.find(e => e.language.name === 'es') ?? null;
          const text = abilityData.flavor_text_entries.find(text => text.language.name === 'es') ?? null;
          return {
            name: name!.name,
            description: this.cleanText(text!.flavor_text),
            isHidden: is_hidden,
            slot
          };
        })
      );
      return result;
    }

    async buildSpeciesDto(species: SpeciesDTO): Promise<Species> {
      const speciesData = await Http.getJson<SpecieServiceDTO>(species.url);
      const name = speciesData.names.find(e => e.language.name === 'es') ?? null;
      const text = speciesData.flavor_text_entries.find(e => e.language.name === 'es') ?? null;
      const genera = speciesData.genera.find(e => e.language.name === 'es') ?? null;
      return {
        name: name!.name,
        description: this.cleanText(text!.flavor_text),
        category: genera!.genus,

      }
    }


    async buildTypesDto(types: TypesDTO[]): Promise<TypesData[]> {
      const result = await Promise.all(
        types.map(async (item): Promise<TypesData> => {
          const { type, slot } = item;
          const typeData = await Http.getJson<TypeServiceDTO>(type.url);
          const name = typeData.names.find(e => e.language.name === 'es') ?? null;
          return {
            name: name!.name,
            slot,
            damage_relations: typeData.damage_relations
          };
        })
      );
      return result;
    }

    async buildWeaknessDto(types: TypesData[]): Promise<Weakness[]> {   
      const allDoubleDamageFrom = Array.from(
        new Map(
          types
            .flatMap(t => t.damage_relations.double_damage_from)
            .map(item => [item.name, item])
        ).values()
      );
      const allHalfDamageFrom   = types.flatMap(t => t.damage_relations.half_damage_from);
      const filtered = allDoubleDamageFrom.filter(
        dd => !allHalfDamageFrom.some(hd => hd.name === dd.name)
      );
      const result = await Promise.all(
        filtered.map(async (item): Promise<Weakness> => {
          const typeData = await Http.getJson<TypeServiceDTO>(item.url);
          const name = typeData.names.find(e => e.language.name === 'es') ?? null;
          return {
            name: name!.name
          };
        })
      );
      return result;
    }

    cleanText = (texto: string): string => {
      return texto
        .replace(/[\x00-\x1F\x7F]/g, " ") // quita caracteres de control (incluye \n, \r, \t, \f, etc.)
        .replace(/\s+/g, " ")             
        .trim();
    };
}