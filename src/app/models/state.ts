export class State {
    id: number;
    sigla: string;
    nome: string;
    regiao: Regiao[];
}

class Regiao {
    id: number;
    sigla: string;
    nome: string;
}
