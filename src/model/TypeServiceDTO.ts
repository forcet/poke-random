import { NamesDTO } from "./NamesDTO";
import { DamangeRelationDTO } from "./DamangeRelationDTO";
export interface TypeServiceDTO {
    name: string,
    names: NamesDTO[];
    damage_relations: DamangeRelationDTO;
}