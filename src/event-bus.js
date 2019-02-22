import Vue from 'vue'

export default new Vue({
    data:{
        autenticado: false,
        contatos: [
            { id: 1, nome: "Isaac Newton", email: "isaac@email.com" },
            { id: 2, nome: "Albert Einstein", email: "eisntei@email.com" },
            { id: 3, nome: "Stephen Hawking", email: "stephen@email.com" }
          ]
    },
    created(){
        this.$on('autenticar',(autenticado)=>{
            this.autenticado = autenticado
        })
    }
})