<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">Username</th>
                    <th class="text-left">Message</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.socket">
                    <td>{{ user.user }}</td>
                    <td>
                        <v-btn color="info" @click="send(user.socket)">Send</v-btn>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
import { mapState } from "vuex";
export default {
    props: ["users"],
    data() {
        return {
            timeout: 2000
        };
    },
    computed: {
        ...mapState(["user"])
    },
    methods: {
        send(socket) {
            this.$emit("send", {
                sender: this.user,
                destSocket: socket
            });
        }
    }
};
</script>