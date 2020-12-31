<template>
  <div>
    <h1 class="title">Reddit Bots</h1>
    <div class="lds-ring" v-if="$fetchState.pending">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
        <div v-for="(bot, i) in bots" v-bind:key="i">
          <div v-if="i%3 == 0">
            <div class="columns">
              <div class="column is-4">
                <Card :bot="bots[i]" />
              </div>
              <div class="column is-4" v-if="bots[i+1]">
                <Card :bot="bots[i+1]" />
              </div>
              <div class="column is-4"  v-if="bots[i+2]">
                <Card :bot="bots[i+2]" />
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bots: [],
      page: 0,
      //api_url: `${window.location.protocol}//api.${window.location.hostname.replace("www.", "")}`
      api_url: "http://localhost:3001",
    };
  },
  async fetch() {
    let fetched = await fetch(`${this.api_url}/list`).then((res) => res.json());
    this.bots = [...fetched];
  },
  methods: {
    handleScroll() {
      (async () => {
        if (window.scrollMaxY - window.scrollY < 50) {
          this.page++;
          let fetched = await fetch(
            `${this.api_url}/list?page=${this.page}`
          ).then((res) => res.json());
          this.bots = this.bots.concat(fetched);
        }
      })();
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
