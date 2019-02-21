import Vue from 'vue'
import VueRouter from 'vue-router'
import Contatos from './views/contatos/Contatos.vue'
import Home from './views/Home.vue'
import ContatoDetalhe from './views/contatos/ContatoDetalhes.vue'
import ContatosHome from './views/contatos/ContatosHome.vue'
import ContatoEditar from './views/contatos/ContatoEditar.vue'
import Erro404 from './views/contatos/Erro404.vue'
import Erro404Contato from './views/contatos/Erro404Contato.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/contatos',
      component: Contatos,
      alias: ['/meus-contatos', '/lista-de-contatos'],
      props: (route) => {
        const busca = route.query.buscar
        return busca ? { busca } : {}
      },
      children: [
        {
          path: ':id',
          component: ContatoDetalhe,
          name: 'contato',
          props: route => ({
              id: +route.params.id
            })
        },
        {
          path: ':id/editar',
          alias: ':id/alterar',
          components: {
            default: ContatoEditar,
            'contato-detalhe': ContatoDetalhe
          },
          props: {
            default: true,
            'contato-detalhe': true
          }
        },
        { path: '', component: ContatosHome, name: 'contatos' },
        { path: '*', component: Erro404Contato }
      ]
    },
    { path: '/home', component: Home },
    {
      path: '/', redirect: to => {
        return { name: 'contatos' }
      }
    },
    {
      path: '*', component: Erro404
    }
  ]
})
