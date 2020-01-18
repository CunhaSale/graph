export class Beneficiaries {
    id: number;
    dataReferencia: string;
    municipio: County[];
    tipo: Type[];
    valor: number;
    quantidadeBeneficiados: number;
}

class County {
    codigoIBGE: string;
    nomeIBGE: string;
    nomeIBGEsemAcento: string;
    pais: string;
    uf: State[];
}

class State {
    sigla: string;
    nome: string;
}

class Type {
    id: number;
    descricao: string;
    descricaoDetalhada: string;
}
