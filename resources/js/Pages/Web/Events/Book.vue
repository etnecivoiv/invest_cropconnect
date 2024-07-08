<script setup>
import { Head, router } from '@inertiajs/vue3'
import DefaultLayout from '@/Layouts/Default.vue'
import trans from '@/composables/transComposable'
import { ref } from 'vue'
import notify from '@/Plugins/Admin/notify'
import { computed } from 'vue'
import sharedComposable from '@/composables/sharedComposable'
import SpinnerBtn from '@/components/Admin/SpinnerBtn.vue'
const { formatCurrency, authUser } = sharedComposable()

defineOptions({ layout: DefaultLayout })
const props = defineProps(['event', 'bookings', 'authBookings', 'isExpired', 'isBooked', 'status'])

const selectedSeat = ref([])
const seatLimit = props.event.seat_limit ?? 1

const selectForBook = (seat, index = null) => {
  if (isFull.value || props.isBooked || !authUser.value) {
    return
  }
  if (props.bookings.includes(seat)) {
    notify.danger(trans(`Already booked, please choose another`))
    return
  }

  if (selectedSeat.value.includes(seat) && index != null) {
    let seatNo = index + 1
    selectedSeat.value = selectedSeat.value.filter((item) => {
      return item != seatNo
    })
  } else {
    if (selectedSeat.value.length >= seatLimit) {
      notify.warning(
        trans(
          `Maximum ${seatLimit} seat is limited for per user, You can unselect and choose again`
        )
      )
      return
    }
    selectedSeat.value.push(seat)
  }
}

const isFull = computed(() => {
  return props.bookings.length >= props.event.total_seat
})

const loading = ref(false)

const book = () => {
  if (selectedSeat.value.length == 0) {
    notify.danger(trans(`Please choose one or more seat!`))
    return
  }

  loading.value = true
  router.put(
    route('events.update', props.event),
    { selected_seats: selectedSeat.value, seat_no: selectedSeat.value },
    {
      onSuccess: () => {
        loading.value = false
        selectedSeat.value = []
        if (props.event.is_free) {
          notify.success(trans('Your booking request has been submitted successfully'))
        }
      }
    }
  )
}
</script>

<template>
  <Head :title="event.title" />

  <section class="container mb-20 mt-5">
    <h3>
      {{ trans('Booking Seat for') }}:
      <Link class="text-primary" :href="route('events.show', event)">{{ event.title }}</Link>
    </h3>

    <div class="mb-5 mt-5 flex flex-wrap justify-center gap-2">
      <div
        v-for="(seat, index) in event.total_seat"
        :key="seat"
        :class="{
          'bg-black text-white': bookings.includes(seat) && !authBookings.includes(seat),
          'bg-green-500 text-white': authBookings.includes(seat),
          'cursor-pointer hover:border-red-600': !bookings.includes(seat),
          'bg-primary text-white': selectedSeat.includes(seat)
        }"
        class="flex h-16 w-20 items-center justify-center rounded border border-gray-300 p-1 text-sm"
        @click="selectForBook(seat, index)"
      >
        {{ `${event.seat_prefix ?? 'seat - '} ${seat}` }}
      </div>
    </div>

    <h4 v-if="isExpired" class="text-danger text-center">
      {{ trans('Opps! No Seat Available') }}
    </h4>

    <h4 v-else-if="isFull" class="text-danger text-center">
      {{ trans('Opps! No Seat Available') }}
    </h4>

    <div class="text-center" v-else-if="!authUser">
      <Link class="btn btn-primary" href="/login">
        {{ trans('Login ') }} {{ trans('to book') }}
      </Link>
    </div>

    <div class="text-center" v-else-if="isBooked">
      <p class="mb-3">{{ trans('Already booked!') }}</p>
      <a
        v-if="status === 1"
        :href="route('events.book.ticket', event)"
        class="btn btn-primary rounded-full py-2"
        >{{ trans('Download Ticket') }}</a
      >
      <p class="text-bold" v-else-if="status === 2">
        {{ trans('Your request is under pending please wait for admin approval') }}
      </p>
    </div>

    <div class="text-center" v-else-if="!event.is_free">
      <button class="btn btn-primary" @click="book" :disabled="!selectedSeat.length">
        {{ trans('Pay') }} {{ formatCurrency(event.fee_amount * selectedSeat.length) }}
        {{ trans('to book') }}
      </button>
    </div>

    <div class="flex justify-center" v-else>
      <SpinnerBtn @click="book" :processing="loading" :btn-text="trans('Book Now')" />
    </div>
  </section>
</template>
