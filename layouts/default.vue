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
              <div
                class="navbar-item has-dropdown is-hoverable is-hidden-tablet-only is-hidden-mobile"
              >
                <a class="navbar-link">
                  <figure class="image is-32x32 avatar profile-pic">
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
.profile-pic {
  margin-right: 10px;
}
</style>

<script>
window.cookieconsent.initialise({
  container: document.getElementById("content"),
  palette: {
    popup: { background: "#5e6d6f" },
    button: { background: "#7700ff" },
  },
  revokable: true,
  onStatusChange: function(status) {
    console.log(this.hasConsented() ? "enable cookies" : "disable cookies");
  },
  law: {
    regionalLaw: true,
  },
  location: true,
  content: {
    message: "We use cookies for Reddit login",
    href: '/about',
  },
  domain: "https://redditbots.ninja",
  position: "bottom-right",
  theme: "edgeless"
});
</script>
