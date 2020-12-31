<template>
  <div id="container">
    <nav class="navbar">
      <div class="navbar-brand">
        <div
          class="navbar-burger"
          @click="showNav = !showNav"
          :class="{ 'is-active': showNav }"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': showNav }">
        <div class="navbar-start navbar-padded">
          <a class="navbar-item" href="/">
            Home
          </a>
          <a class="navbar-item" href="/about">
            About
          </a>
          <a class="navbar-item" href="/contact">
            Contact
          </a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div
              class="buttons"
              v-if="!user"
            >
              <a class="button is-light" :href="api_url + '/auth/login'">
                Log in
              </a>
            </div>
            <div v-else>
              <a class="button is-light">
                {{ user.username }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section class="section">
      <nuxt />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showNav: false,
      user: null,
    };
  },
  async fetch() {
    let result = await fetch(`${window.location.protocol}//api.${window.location.hostname.replace("www.", "")}/auth/info`, {credentials: 'include'}).then((res) => res.json())
    if (result.success) {
      this.user = result.user
    }
  },
};
</script>

<style>
.navbar-padded {
  padding-left: 10px;
}
</style>
