import { ScreeningIdentity } from "./ScreningModel";

export interface ScreeningResultRepositoryPort {
    Get(screening: ScreeningIdentity): Promise<any[]>;
}