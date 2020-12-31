<template>
  <div>
    <h1 class="title">Reddit Bots</h1>
    <div class="lds-ring" v-if="$fetchState.pending">
      <div></div><div></div><div></div><div></div>
    </div>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <div class="columns is-desktop">
        <div
          class="column"
          v-for="bot_chunk of bots_chunked"
          v-bind:key="bot_chunk"
        >
          <div class="card" v-for="bot of bot_chunk" v-bind:key="bot">
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48 avatar">
                    <img :src="bot.avatar" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-4">{{ bot.username }}</p>
                  <p class="subtitle is-6">
                    <a
                      :href="`https://reddit.com/u/${bot.username}`"
                      target="_blank"
                      >u/{{ bot.username }}</a
                    >
                  </p>
                </div>
              </div>
              <div class="content">
                <div class="description">
                  {{ bot.description || "No description provided" }}
                </div>
                <div class="cake has-text-grey">
                  <span class="icon">
                    <font-awesome-icon :icon="['fas', 'birthday-cake']" />
                  </span>
                  <time :datetime="bot.cakeDay">{{ format(bot.cakeDay) }}</time>
                </div>
              </div>
            </div>
            <footer class="card-footer">
              <a
                :href="`https://reddit.com/u/${bot.username}`"
                class="card-footer-item has-text-primary"
                target="_blank"
              >
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'link']" />
                </span>
                View
              </a>
              <a href="#" class="card-footer-item has-text-primary">
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'heart']" />
                </span>
                Like
              </a>
              <a href="#" class="card-footer-item has-text-warning">
                <span class="icon">
                  <font-awesome-icon :icon="['fas', 'flag']" />
                </span>
                Report
              </a>
            </footer>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
Object.defineProperty(Array.prototype, "chunk", {
  value: function(chunks) {
    let result = [];
    for (let i = chunks; i > 0; i--) {
      result.push(this.splice(0, Math.ceil(this.length / i)));
    }
    return result;
  },
});

export default {
  data() {
    return {
      bots_chunked: [],
    };
  },
  async fetch() {
    this.bots_chunked = (
      await fetch(`${window.location.protocol}//api.${window.location.hostname.replace("www.", "")}/list`).then((res) => res.json())
    ).chunk(3);
  },
  methods: {
    format(date) {
      return new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>
