import Vue from 'vue'
import VueRouter from 'vue-router'
import Contatos from './views/contatos/Contatos.vue'
import Home from './views/Home.vue'
import ContatoDetalhe from './views/contatos/ContatoDetalhes.vue'
import ContatosHome from './views/contatos/ContatosHome.vue'
import ContatoEditar from './views/contatos/ContatoEditar.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/contatos', component: Contatos,
      children: [
        { path: ':id', component: ContatoDetalhe, name: 'contato' },
        {
          path: ':id/editar', 
          components: {
            default: ContatoEditar,
            'contato-detalhe' :ContatoDetalhe 
          }
        },
        { path: '', component: ContatosHome }
      ]
    },
    { path: '/', component: Home }
  ]
})