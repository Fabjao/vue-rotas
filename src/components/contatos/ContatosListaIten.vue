<template>
  <li>
    <span>{{contato.nome}}</span>
    <!--<router-link class="btn btn-info btn-sm float-right" 
    :to="`/contatos/${contato.id}`"
    >Detalhes</router-link> Navegando nas rotas-->
    <router-link
      class="btn btn-info btn-sm float-right"
      :to="{name:'contato',params:{id: contato.id}}"
    >Detalhes</router-link>

    <!-- <button  class="btn btn-info btn-sm float-right"
    @click="verDetalhes">
        Detalhes
    </button> -->
  </li>
</template>

<script>
export default {
  props: {
    contato: {
      type: Object,
      required: true
    }
  }
};
</script>
