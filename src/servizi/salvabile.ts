/**
* HELT FORKERT! Du skal slette class Salvabile
* og i stedet ligge al funktionalitet med at gemme
* i SalvabileServizio, som enhver klasse så kan extende
* direkte.
* pt. Fungerer det ikke med at Salvabile .subscribe'er
* til den anden service, fordi den kun kører callback
* en gang ved .subscribe
*/
import { writable, type Writable } from "svelte/store";

export class SalvabileServizio {
    data: Writable<unknown> = writable<unknown>();

    esporta(): unknown {
        console.error("You must implement esporta in class " + this.constructor.name);
        return;
    }
}

class Salvabile {
    private storageKey = "pensum";
    private servizi: Array<[string, SalvabileServizio]> = [];
    private stato: {[key: string]: unknown} = {};

    constructor() {
        if (typeof window !== 'undefined') {
            const contenuto = localStorage.getItem(this.storageKey);
            this.stato = contenuto ? JSON.parse(contenuto) : {};
        }
    }
    
    registra(zona: string, servizio: SalvabileServizio) {
        if (typeof window === 'undefined') {
            return null;
        }
        this.servizi.push([zona, servizio]);
        servizio.data.subscribe(valore => {
            console.log("Update", valore);
            this.stato[zona] = valore;
            this.salva();
        });
        const t = this.stato;
        return t ? writable<unknown>(t[zona]) : null;
    }

    salva() {
        if (typeof window === 'undefined') {
            return;
        }
        const o: {[key: string]: string} = {};
        for (let i = 0; i < this.servizi.length; i++) {
            o[this.servizi[i][0]] = JSON.stringify(this.servizi[i][1].esporta());
        }
        localStorage.setItem(this.storageKey, JSON.stringify(o));
    }
}

export default new Salvabile();
