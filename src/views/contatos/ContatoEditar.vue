<template>
  <div v-if="contato">
    <h3 class="font-weight-light">Nome: {{contato.nome}}</h3>
    <form @submit.prevent="salvar">
      <div class="form-group">
        <label>Nome</label>
        <input type="text" class="form-control" placeholder="Insira o nome" v-model="contato.nome">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          class="form-control"
          placeholder="Insira o email"
          v-model="contato.email"
        >
      </div>
      <button class="btn btn-secondary mt-4mb-4 mr2" type="button" @click="$router.back()">Voltar</button>
      <button class="btn btn-success" type="submit">Salvar</button>
    </form>

    <!--<button class="btn btn-secondary mt-4 mb-4" @click="$router.back()">Voltar</button>-->
  </div>
</template>

<script>
import EventBus from "@/event-bus";
export default {
  data() {
    return {
      contato: undefined,
      estaCancelando: true
    };
  },
  props: ["id"],

  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    /*if (to.query.autenticado === "true") {
      return next(vm => {
        console.log("Curso: ", vm.curso);
      });
    }
    next("/contatos");*/
    next(vm => {
      //vm.contato = EventBus.buscarContato(vm.id)
      vm.contato = EventBus.buscarContato(+to.params.id);
    });
  },
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave");
    // const confirmar = window.confirm("Deseja realmente sair?");
    // next(confirmar);

    this.estaCancelando ? next(window.confirm("Deseja realmente sair?")) : next();
  },
  methods: {
    salvar(event) {
      EventBus.editarContato(this.contato);
      this.estaCancelando = false;
      this.$router.push("/contatos");
    }
  }
};
</script>
