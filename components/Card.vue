<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48 avatar">
            <img :src="bot.avatar" alt="Bot Avatar" />
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{ bot.username }}</p>
          <p class="subtitle is-6">
            <a :href="`https://reddit.com/u/${bot.username}`" target="_blank"
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
      <a href="#" class="card-footer-item has-text-warning">
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'flag']" />
        </span>
        Report
      </a>
    </footer>
  </div>
</template>

<script>
export default {
  props: ["bot"],
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
