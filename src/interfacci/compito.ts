import type { default as Lettura, LetturaSalvabile } from './lettura'
import type { default as Lezione, LezioneSalvabile } from './lezione';

export default interface Compito extends Lettura {
    lezione: Lezione;
}

/**
 * Compito compresso per salvare in db (date sono in timestamp)
 */
export interface CompitoSalvabile extends LetturaSalvabile {
    lezione: LezioneSalvabile
}