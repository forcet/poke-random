
import { PokemonDTO } from "./PokemonDTO";
import { Ability } from "./Ability";
import { Species } from "./Species";
import { Types } from "./Types";
import { Weakness } from "./Weakness";


export class Pokemon {
    constructor(
      public code: number,
      public name: string,
      public height: number,      
      public weight: number,
      public abilities: Ability[],
      public category: string,
      public description: string,
      public image: string,
      public imageShiny: string,
      public defaultImage: string,
      public types: Types[],
      public weakness: Weakness[],
    ) {}
  
    static fromDTO(dto: PokemonDTO, abilities: Ability[], species: Species, types: Types[], weakness: Weakness[]): Pokemon {
      return new Pokemon(dto.id, species.name, dto.height, dto.weight, abilities, 
        species.category, species.description, dto.sprites.other["official-artwork"].front_default, dto.sprites.other["official-artwork"].front_shiny,
        dto.sprites.front_default, types, weakness);
    }
  
    toString() {
      return `Para tu aventura te acompañara ${this.name}, suerte: ${this.code}`;
    }

    static readonly toSentenceCase = (value: string): string => {
      return value
        .toLowerCase()             
        .replace(/[-_]/g, " ")
        .trim()
        .replace(/^./, c => c.toUpperCase());
    };
}