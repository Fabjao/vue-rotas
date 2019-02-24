<template>
  <div>
    <h3>Inserir Contato</h3>
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
  </div>
</template>

<script>
import EventBus from "@/event-bus";
export default {
  data() {
    return {
      contato: {
        id: "",
        nome: "",
        email: ""
      }
    };
  },
  methods: {
    salvar(event) {
      EventBus.inserirContato(this.contato);
      this.$router.push('/contatos')
    }
  }
};
</script>
