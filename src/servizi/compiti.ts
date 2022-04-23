import type Compito from '../interfacci/compito';
import {get, writable, type Writable} from 'svelte/store';
import salvabile, { SalvabileServizio } from "./salvabile";

class Compiti extends SalvabileServizio {
    data = writable<Compito[]>([]);

    constructor() {
        super();
        const t = salvabile.registra('compiti', this);
        if (t !== null) {
            this.data = t as Writable<Compito[]>;
        }
    }

    esporta(): any {
        const c = get(this.data);
        return c.map((compito: any) => {
            compito.data = compito.data.getTime();
            return compito;
        });
    }

    agg(compito: Compito) {
        this.data.update((compiti) => [compito, ...compiti]);
    }
}

export default new Compiti();