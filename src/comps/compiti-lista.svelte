<script lang="ts">
import type Compito from "src/interfacci/compito";
import { createEventDispatcher } from "svelte";
import type { Writable } from "svelte/store";

export let compiti: Writable<Compito[]>;
const dispatch = createEventDispatcher();

function agg() {
    let compito: Compito = {
        lezione: {materia: 'Gynækologi', data: new Date()},
        da: 2,
        a: 10,
        libro: {autore: "Michele Dorph", id: 1, titolo: "Tester"},
        data: new Date()
    };
    dispatch('agg', compito);
}
</script>
<h1>Lektier</h1>
{#each $compiti as compito}
<p>{compito.da}</p>
{/each}
<button on:click={agg}>Tilføj lektie</button>