import './bootstrap'
import '@vueform/multiselect/themes/default.css'
import { createApp, h, ref } from 'vue'
import { Link, createInertiaApp } from '@inertiajs/vue3'
import { createPinia } from 'pinia'
import VueLazyLoad from 'vue3-lazyload'
import './../../public/assets/css/payment.css?v=10'
import trans from '@/composables/transComposable'
const appName = document.querySelector('meta[name="app-name"]')?.content || 'Laravel'

const language = ref(false)

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
    const page = pages[`./Pages/${name}.vue`]
    page.default.layout = page.default.layout ?? null
    return page
  },
  setup({ el, App, props, plugin }) {
    return createApp({ render: () => h(App, props) })
      .mixin({ methods: { trans, route: window.route } })
      .use(plugin)
      .component('Link', Link)
      .use(VueLazyLoad, {
        loading: '/assets/images/lazy.svg'
      })
      .use(createPinia())
      .mount(el)
  },
  progress: {
    color: '#32bead',
    showSpinner: true
  }
})