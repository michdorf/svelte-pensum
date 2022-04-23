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