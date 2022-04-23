import type Lettura from './lettura'
import type Lezione from './lezione';

export default interface Compito extends Lettura {
    lezione: Lezione;
}