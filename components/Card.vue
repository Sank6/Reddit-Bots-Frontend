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
      <a
        href="#"
        class="card-footer-item has-text-warning"
        @click="report(bot)"
      >
        <span class="icon">
          <font-awesome-icon :icon="['fas', 'flag']" />
        </span>
        Report
      </a>
    </footer>

    <div class="modal" :id="bot.username + '-modal'">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title" v-if="!response">
            Report <span class="has-text-primary">{{ bot.username }}</span>
          </p>
          <p class="modal-card-title" v-else-if="response == 'pending'">
            Sending report
          </p>
          <p class="modal-card-title" v-else>
            {{ response.errors || response.error ? "Error" : "Success" }}
          </p>
          <button
            class="delete"
            aria-label="close"
            @click="close(bot.username + '-modal')"
          ></button>
        </header>
        <section class="modal-card-body" v-if="!response">
          <div class="field">
            <div class="select is-fullwidth">
              <select
                name="reason"
                @change="input(bot.username)"
                :id="bot.username + '-select'"
              >
                <option value="User is not a bot">User is not a bot</option>
                <option value="User is breakeing Reddit TOS"
                  >User is breakeing Reddit TOS</option
                >
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div class="field">
            <div class="is-fullwidth is-hidden" :id="bot.username + '-input'">
              <input
                class="input"
                type="text"
                placeholder="Enter a reason"
                maxlength="200"
              />
            </div>
          </div>
        </section>
        <section class="modal-card-body" v-else-if="response == 'pending'">
          <div class="container">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </section>
        <section class="modal-card-body" v-else>
          <div class="container">
            <div v-if="response.error">
              <p>
                {{ response.error }}
              </p>
            </div>
            <div v-else-if="response.errors">
              <p v-for="(error, i) of response.errors" v-bind:key="i">
                {{ error.msg }} {{ error.param }}
              </p>
            </div>
            <div v-else>
              <p>Your report has been sent. You can close this now.</p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot" v-if="!response">
          <button class="button is-primary" @click="sendReport(bot)">
            Send Report
          </button>
          <button class="button" @click="close(bot.username + '-modal')">
            Cancel
          </button>
        </footer>
        <footer class="modal-card-foot" v-else>
          <button class="button is-secondary" @click="close(bot.username + '-modal')">
            Close
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["bot"],
  data() {
    return {
      api_url: `${window.location.protocol}//api.${window.location.hostname.replace("www.", "")}`
      //api_url: "http://localhost:3001",
      response: null,
    };
  },
  methods: {
    format(date) {
      return new Date(date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
    report(bot) {
      document
        .getElementById(`${bot.username}-modal`)
        .classList.add("is-active");
    },
    close(modal) {
      document.getElementById(modal).classList.remove("is-active");
    },
    input(id) {
      if (document.getElementById(`${id}-select`).value == "Other")
        return document
          .getElementById(`${id}-input`)
          .classList.remove("is-hidden");
      else
        return document
          .getElementById(`${id}-input`)
          .classList.add("is-hidden");
    },
    sendReport(bot) {
      this.response = "pending";
      let reason;
      if (document.getElementById(`${bot.username}-select`).value == "Other")
        reason = document.getElementById(`${bot.username}-input`).value;
      else reason = document.getElementById(`${bot.username}-select`).value;
      (async () => {
        const opts = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userReported: bot.username, reason }),
          credentials: "include",
        };
        this.response = await fetch(
          `${this.api_url}/report`,
          opts
        ).then((res) => res.json());
      })();
    },
  },
};
</script>
