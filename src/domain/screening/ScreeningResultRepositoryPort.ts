import { ScreeningIdentity, ScreeningResult } from "./ScreningModel";

export interface ScreeningResultRepositoryPort {
    Get(screening: ScreeningIdentity): Promise<ScreeningResult[]>;
}