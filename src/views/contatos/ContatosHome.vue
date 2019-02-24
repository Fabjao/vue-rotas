<template>
  <ContatoLista :busca="busca" />
</template>

<script>
import ContatoLista from "./../../components/contatos/ContatosLista.vue";
export default {
  components: {
    ContatoLista
  },
  props: ["busca"]
};
</script>

