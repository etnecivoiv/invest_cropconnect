import { computed, ref } from 'vue'
import { router, usePage } from '@inertiajs/vue3'


export default () => {
  const footerCenter = computed(() => {
    return usePage().props.menus.find((item) => item.position.includes('footer-center')) || []
  })

  const footerRight = computed(() => {
    return usePage().props.menus.find((item) => item.position.includes('footer-right')) || []
  })

  const footerLeft = computed(() => {
    return usePage().props.menus.find((item) => item.position.includes('footer-left')) || []
  })

  const year = computed(() => {
    return new Date().getFullYear()
  })
  const socials = computed(() => {
    return usePage().props.primaryData['socials']
  })
  // newsletter
  const email = ref('')
  const subscribe = () => {
    if (email.value) {
      router.post(
        route('newsletter.subscribe'),
        { email: email.value },
        {
          preserveScroll: true,
        }
      )
    }
  }
  const NEWSLETTER_API = computed(() => import.meta.env.VITE_NEWSLETTER_API_KEY)
  return {
    footerCenter,
    footerRight,
    footerLeft,
    year,
    socials,
    email,
    subscribe,
    NEWSLETTER_API
  }
}
