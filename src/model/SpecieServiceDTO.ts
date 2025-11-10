import { NamesDTO } from "./NamesDTO";
import { GeneraDTO } from "./GeneraDTO";
import { TextEntriesDTO } from "./TextEntriesDTO";
export interface SpecieServiceDTO {
    name: string,
    names: NamesDTO[];
    flavor_text_entries: TextEntriesDTO[];
    genera: GeneraDTO[];
}