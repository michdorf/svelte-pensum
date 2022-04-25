import type { CompitoSalvabile } from '../interfacci/compito';
import type Compito from '../interfacci/compito';
import Salvabile, { type SalvabileServizio } from './salvabile';

class Compiti extends Salvabile implements SalvabileServizio{
    constructor() {
        super('compiti');
    }

    esporta(compiti: Compito[]): CompitoSalvabile[] {
        return compiti.map((compito: Compito) => {
            return Object.assign(compito, {
                data: compito.data.getTime(),
                lezione: {
                    data: compito.lezione.data.getTime()
                },
                libro: {
                    creato: compito.libro.creato.getTime()
                }
            });
        });
    }

    importa(data: CompitoSalvabile[]): Compito[] {
        return data.map((compito: CompitoSalvabile) => {
            return Object.assign(compito, {
                data: new Date(compito.data),
                lezione: {
                    data: new Date(compito.lezione.data)
                },
                libro: {
                    creato: new Date(compito.libro.creato)
                }
            });
        });
    }

    agg(compito: Compito) {
        super.agg(compito);
    }
}

export default new Compiti();