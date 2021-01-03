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
          <nuxt-link class="navbar-item" to="/">
            Home
          </nuxt-link>
          <nuxt-link class="navbar-item" to="/about">
            About
          </nuxt-link>
          <nuxt-link class="navbar-item" to="/contact">
            Contact
          </nuxt-link>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons" v-if="!user">
              <a class="button is-light" :href="api_url + '/auth/login'">
                Log in
              </a>
            </div>
            <div v-else>
              <div
                class="navbar-item has-dropdown is-hoverable is-hidden-tablet-only is-hidden-mobile"
              >
                <a class="navbar-link">
                  <figure class="image is-32x32 avatar profile-pic mr-2">
                    <img
                      :src="user.avatar.split('?')[0]"
                      :alt="user.username"
                      class="is-rounded"
                    />
                  </figure>
                  {{ user.username }}
                </a>

                <div class="navbar-dropdown">
                  <a class="navbar-item" :href="api_url + '/logout'">
                    Logout
                  </a>
                </div>
              </div>

              <a
                class="navbar-item is-hidden-desktop"
                :href="api_url + '/logout'"
              >
                Logout
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
      api_url: this.$axios.defaults.baseURL,
    };
  },
  async fetch() {
    try {
      let result = await this.$axios.$get(`/auth/info`, {
        withCredentials: true,
      });
      if (result.success) this.user = result.user;
    } catch (e) {}
  },
};
</script>

<style>
.navbar-padded {
  padding-left: 10px;
}

.profile-pic img {
  max-height: none !important;
}
</style>
