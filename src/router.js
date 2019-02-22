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
const extrarParametro = route => ({
  id: +route.params.id
})

const router = new VueRouter({
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
          path: ':id(\\d+)',
          component: ContatoDetalhe,
          name: 'contato',
          props: extrarParametro
        },
        {
          // path: ':id(\\d+)/editar/:opcional',
          //path: ':id(\\d+)/editar/:zeroOuMais*', 
          //path: ':id(\\d+)/editar/:umOuMais+',
          path: ':id(\\d+)/editar',
          alias: ':id(\\d+)/alterar',
          beforeEnter(to,from,next){
            console.log("beforeEnter")
           next()
          },
          components: {
            default: ContatoEditar,
            'contato-detalhe': ContatoDetalhe
          },
          props: {
            default: extrarParametro,
            'contato-detalhe': extrarParametro
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

router.beforeEach((to, from, next) => {
  console.log("beforeEach")
  next()
})

router.afterEach((to, from) => {
  console.log("afterEach")
})

export default router