export default interface Libro {
    id: number;
    titolo: string;
    autore: string;
    creato: Date;
    ISBN?: number;
}

export interface LibroSalvabile {
    id: number;
    titolo: string;
    autore: string;
    creato: number;
    ISBN?: number;
}