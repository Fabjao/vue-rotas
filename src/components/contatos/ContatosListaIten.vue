<template>
  <li>
    <span>{{contato.nome}}</span>
    <!--<router-link class="btn btn-info btn-sm float-right" 
    :to="`/contatos/${contato.id}`"
    >Detalhes</router-link> Navegando nas rotas-->
    <router-link
      class="btn btn-info btn-sm float-right"
      :to="{path: `/contatos/${contato.id}`}"
    >Detalhes</router-link>

    <button
      class="btn btn-info btn-sm float-right mr-2"      
      @click="excluir"
    >Excluir</button>

    <!-- <button  class="btn btn-info btn-sm float-right"
    @click="verDetalhes">
        Detalhes
    </button>-->
  </li>
</template>

<script>
import EventBus from '@/event-bus'
export default {
  props: {
    contato: {
      type: Object,
      required: true
    }
  },
  methods:{
    excluir(event){      
     EventBus.excluirContato(this.contato.id)
    }
  }
};
</script>
