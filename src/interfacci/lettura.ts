import type { LibroSalvabile } from "./libro";
import type Libro from "./libro";

/**
 * Lettura (compito o lettura) da leggere/letti
 */
export default interface Lettura {
    libro: Libro;
    da: number;
    a: number;
    data: Date;
}

export interface LetturaSalvabile {
    libro: LibroSalvabile;
    da: number;
    a: number;
    data: number;
}