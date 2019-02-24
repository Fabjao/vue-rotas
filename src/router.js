import Vue from 'vue'
import VueRouter from 'vue-router'
//import Contato from './views/contatos/Contatos.vue'
//import Home from './views/Home.vue'
//import ContatoDetalhe from './views/contatos/ContatoDetalhes.vue'
//import ContatosHome from './views/contatos/ContatosHome.vue'
//import ContatoEditar from './views/contatos/ContatoEditar.vue'
import Erro404 from './views/contatos/Erro404.vue'
import Erro404Contato from './views/contatos/Erro404Contato.vue'
import Login from './views/login/Login.vue'

import EventBus from './event-bus'

const Home = () => import('./views/Home.vue')
const Contato = () => import(/*webpackChunkName:"contatos"*/'./views/contatos/Contatos.vue')
const ContatoDetalhe = () => import(/*webpackChunkName:"contatos"*/'./views/contatos/ContatoDetalhes.vue')
const ContatosHome = () => import(/*webpackChunkName:"contatos"*/'./views/contatos/ContatosHome.vue')
const ContatoEditar = () => import(/*webpackChunkName:"contatos"*/'./views/contatos/ContatoEditar.vue')
const ContatoInserir = () => import(/*webpackChunkName:"contatos"*/'./views/contatos/ContatoInserir.vue')


Vue.use(VueRouter)
const extrarParametro = route => ({
  id: +route.params.id
})

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (savedPosition) {
          return resolve(savedPosition)
        }
        if (to.hash) {
          return resolve({
            selector: to.hash,
            offset: { x: 0, y: 0 }
          })
        }
        resolve({ x: 0, y: 0 })
      }, 3000);
    })
  },
  routes: [
    {
      path: '/contatos',
      component: Contato,
      alias: ['/meus-contatos', '/lista-de-contatos'],
      props: (route) => {
        const busca = route.query.buscar
        return busca ? { busca } : {}
      },
      children: [
        {
          path: ':id(\\d+)',
          component: ContatoDetalhe,
          name: 'contatos',
          props: extrarParametro
        },
        {
          // path: ':id(\\d+)/editar/:opcional',
          //path: ':id(\\d+)/editar/:zeroOuMais*', 
          //path: ':id(\\d+)/editar/:umOuMais+',
          path: ':id(\\d+)/editar',
          alias: ':id(\\d+)/alterar',
          meta: { requerAutenticacao: true },
          beforeEnter(to, from, next) {
            console.log("beforeEnter")
            next() //Continuar
            //next(true) //Continuar fazendo com que possa receber um parametro boleano
            //next(false) //Aborta a proxima rota e fica no estado atual
            //next('/home') //redirecionar para uma determinada rota
            //next({path:'/contatos'}) //Redirecionamento de rotas
            //next(new Error(`Permissões insulficientes para acessar o recurso "${to.fullPath}"`))// lançar um erro
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
         {
          path: '/contatosinserir', component: ContatoInserir
        },
        { path: '', component: ContatosHome, name: 'contatos' },
        { path: '*', component: Erro404Contato }
      ]
    },
    { path: '/home', component: Home },
    { path: '/login', component: Login },
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
  console.log('Requer autenticação', to.meta.requerAutenticacao)
  const autenticado = EventBus.autenticado
  console.log(to.matched)
  if (to.matched.some(rota => rota.meta.requerAutenticacao)) {
    if (!autenticado) {
      next({
        path: '/login',
        query: { redirecionar: to.fullPath }
      })
      return
    }
  }
  next()
})

router.beforeResolve((to, from, next) => {
  console.log("beforeResolve")
  next()
})

router.afterEach((to, from) => {
  console.log("afterEach")
})

router.onError(erro => {
  alert(erro)
})

export default router