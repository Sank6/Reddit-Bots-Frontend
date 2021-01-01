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
            <div class="buttons" v-if="!user">
              <a class="button is-light" :href="api_url + '/auth/login'">
                Log in
              </a>
            </div>
            <div v-else>
              <div class="navbar-item has-dropdown is-hoverable is-hidden-tablet-only is-hidden-mobile">
                <a class="navbar-link">
                <figure class="image is-32x32 avatar profile-pic">
                  <img :src="user.avatar" :alt="user.username" class="is-rounded"/>
                </figure>
                  {{ user.username }}
                </a>

                <div class="navbar-dropdown">
                  <a class="navbar-item" :href="api_url + '/logout'">
                    Logout
                  </a>
                </div>
              </div>
              
              <a class="navbar-item is-hidden-desktop" :href="api_url + '/logout'">
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
      //api_url: `${window.location.protocol}api.${window.location.hostname.replace("www.", "")}`,
      api_url: "http://localhost:3001"
    };
  },
  async fetch() {
    let result = await fetch(`${this.api_url}/auth/info`, {
      credentials: "include",
    }).then((res) => res.json());
    if (result.success) {
      this.user = result.user;
    }
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
.profile-pic {
  margin-right: 10px;
}
</style>
