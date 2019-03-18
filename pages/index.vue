<template>
  <section class="py-3">
    <b-container>
      <b-row class="row justify-content-center">
        <b-col class="col-auto text-center">
          <logo class="my-md-5" />
          <h1 class="text-warning my-md-5">
            Welcome to my Website
          </h1>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style></style>
