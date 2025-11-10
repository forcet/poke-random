import { NamesDTO } from "./NamesDTO";
import { TextEntriesDTO } from "./TextEntriesDTO";
export interface AbilityServiceDTO {
    name: string,
    names: NamesDTO[];
    flavor_text_entries: TextEntriesDTO[];
}