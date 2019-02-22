<template>
  <div>
    <h3 class="font weight-light">Detalhe do conato do id {{ id }}</h3>
    <div style="height:900px"></div>
    <p id="parametros">Parâmetros: {{parametros}}</p>
    <p>Hash: {{$route.hash}}</p>
    <router-link :to="`/contatos/${id}/editar`" class="btn btn-primary">Editar</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parametros: this.$route.params
    };
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  /*data() {
    return {
      id: this.$route.params.id
    };
  },*/
  /*watch: {
    $route(to, from) {
      this.id = to.params.id;
    }
  },*/
  beforeRouteUpdate(to, from, next) {
    //this.id = to.params.id;
    console.log("beforeRouteUpdate");
    this.parametros = to.params
    next();
  }
  /*created() {
    console.log("Parâmetro da rota:", this.$route.params);
  }*/
};
</script>
