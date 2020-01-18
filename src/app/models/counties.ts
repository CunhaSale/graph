import { States } from './states';

export class Counties {
    id: number;
    nome: string;
    microrregiao: Microrregiao[];
}

class Microrregiao {
    id: number;
    nome: string;
    mesorregiao: Mesorregiao[];
}

class Mesorregiao {
    id: number;
    nome: string;
    UF: States[];
}
