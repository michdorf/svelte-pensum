/**
* HELT FORKERT! Du skal slette class Salvabile
* og i stedet ligge al funktionalitet med at gemme
* i SalvabileServizio, som enhver klasse så kan extende
* direkte.
* pt. Fungerer det ikke med at Salvabile .subscribe'er
* til den anden service, fordi den kun kører callback
* en gang ved .subscribe
*/
import { get, writable, type Writable } from "svelte/store";

export interface SalvabileServizio {
    /* data: Writable<unknown>; */ /* Should be controlled by Salvabile (parent class) */
    zona: string;
    esporta(data: unknown): unknown;
    importa(data: unknown): unknown;
}

let _statoGlobale: {[key: string]: string} = {};
class Salvabile {
    private storageKey = "pensum";
    private staIniziando = true;
    zona: string;
    private _data: Writable<any[]>;

    get data() {
        return this._data;
    }

    constructor(zona: string) {
        this.staIniziando = true;
        this.zona = zona;
        this._data = this.carica();

        this._data.subscribe(_ => {
            this.salva();
        });
    }

    carica(): Writable<unknown[]> {
        if (typeof localStorage === 'undefined') {
            return writable([]);
        }
        _statoGlobale = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        const data = this.importa(JSON.parse(this.zona in _statoGlobale ? _statoGlobale[this.zona] : '[]'));
        console.log('Caricato ', data);
        return writable(data);
    }

    agg(riga: unknown) {
        this._data.update((righe) => [riga, ...righe]);
    }

    salva() {
        if (typeof window === 'undefined') {
            return;
        }
        if (this.staIniziando) {
            this.staIniziando = false;
            return;
        }
        _statoGlobale[this.zona] = JSON.stringify(this.esporta(get(this._data)));
        console.log('Salvato ', _statoGlobale);
        localStorage.setItem(this.storageKey, JSON.stringify(_statoGlobale));
    }

    importa(data: unknown[]) {
        console.error("You must implement importa in class " + this.constructor.name);
        return data;
    }

    esporta(data: unknown[]) {
        console.error("You must implement esporta in class " + this.constructor.name);
        return data;
    }
}

export default Salvabile;
