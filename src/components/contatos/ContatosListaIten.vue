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
  },
  methods:{
      verDetalhes(event){
          //this.$router.push(`/contatos/${this.contato.id}`) //Padrão
        //   this.$router.push({path: `/contatos/${this.contato.id}`}) //Não funcionando assim com esses paramentros vai para a home
          //this.$router.push({path: '/contatos/',params: {id :this.contato.id}}) 
          //this.$router.push({name: 'contato',params: {id: this.contato.id}})
          this.$router.replace({name : 'contato',params: {id: this.contato.id}})
      }
  }
};
</script>
