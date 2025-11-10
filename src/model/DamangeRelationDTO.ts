import { DetailDTO } from "./DetailDTO";
export interface DamangeRelationDTO {
    double_damage_from: DetailDTO;
    double_damage_to: DetailDTO;
    half_damage_from: DetailDTO;
    half_damage_to: DetailDTO;
    no_damage_from: DetailDTO;
    no_damage_to: DetailDTO;
}