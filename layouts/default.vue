<template>
    <v-app dark>
        <v-content>
            <v-container>
                <nuxt />
            </v-container>
        </v-content>
        <v-footer :fixed="fixed" app>
            <span>Kevin Hansen &copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            fixed: false,
            timeout: 5000
        };
    },
    methods: {
        ...mapMutations(["updateOnline"])
    },
    sockets: {
        updateOnline(user) {
            this.updateOnline(user);
        },
        incomingMessage(message) {
            this.$toast.info(message.sender + ": " + message.message);
        }
    }
};
</script>
