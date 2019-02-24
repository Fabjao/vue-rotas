import Vue from 'vue'

export default new Vue({
    data: {
        autenticado: false,
        contatos: [
            { id: 1, nome: "Isaac Newton", email: "isaac@email.com" },
            { id: 2, nome: "Albert Einstein", email: "eisntei@email.com" },
            { id: 3, nome: "Stephen Hawking", email: "stephen@email.com" }
        ]
    },
    created() {
        this.$on('autenticar', (autenticado) => {
            this.autenticado = autenticado
        })
    },
    methods: {
        editarContato(contato) {
            const indice = this.contatos.findIndex(c => c.id === contato.id)
            this.contatos.splice(indice, 1, contato)
        },
        buscarContato(id) {            
            return Object.assign({}, this.contatos.find(c => c.id === id))            
        },
        inserirContato(contato){
            const novoIndice = this.contatos.length + 1
            contato.id = novoIndice      
            this.contatos.splice(novoIndice,0, contato)
        },
        excluirContato(id) {
            const indice= this.contatos.findIndex(c => c.id === id)
            this.contatos.splice(indice, 1)
        },
    }
})