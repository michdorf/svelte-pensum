<script lang="ts">
    import CompitiLista from "../comps/compiti-lista.svelte";
    import type Compito from "src/interfacci/compito";
    import Compiti from '../servizi/compiti';

    function agg(compito: CustomEvent<Compito>) {
        Compiti.agg(compito.detail);
    }
</script>
<CompitiLista compiti={Compiti.data} on:agg={agg}></CompitiLista>
<h1>Læste sider</h1>
<button>Tilføj læsning</button>