<template>
  <div>
    <ContatoLista :busca="busca" />
    <router-view></router-view>
    <router-view name="contato-detalhe"></router-view>
  </div>
</template>

<script>
import ContatoLista from "./../../components/contatos/ContatosLista.vue";
export default {
  components: {
    ContatoLista
  },
  props:['busca']
};
</script>

