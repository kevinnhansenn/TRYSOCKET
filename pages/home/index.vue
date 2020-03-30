<template>
    <section>
        <v-snackbar top v-model="successfullySentFlag" :timeout="timeout">
            Message is successfully sent
            <v-btn color="blue" text @click="successfullySentFlag = false">Close</v-btn>
        </v-snackbar>
        <v-row>
            <v-col cols="8" align="center">
                <h1>{{user}}</h1>
            </v-col>
            <v-col cols="4">
                <v-btn @click="exit" color="error" width="100%" rounded>EXIT</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <v-col cols="4">
                <v-btn
                    v-if="!connected"
                    @click="connect"
                    color="success"
                    width="100%"
                    x-large
                    raised
                >CONNECT</v-btn>
                <v-btn v-else @click="connect" color="error" width="100%" x-large raised>DISCONECT</v-btn>
            </v-col>
        </v-row>
        <v-row justify="center">
            <p class="text-center success--text" v-if="connected">You are now connected</p>
            <p class="text-center error--text" v-else>You are not connected</p>
        </v-row>
        <v-row class="mx-5" v-if="connected">
            <v-text-field v-model="message" label="Enter your message here" outlined></v-text-field>
        </v-row>
        <v-row justify="center" v-if="connected">
            <SimpleTable @send="sendMessage" :users="filteredUsers" />
        </v-row>
    </section>
</template>

<script>
import SimpleTable from "@/components/SimpleTable";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
    middleware: ["auth"],
    components: {
        SimpleTable
    },
    data() {
        return {
            successfullySentFlag: false,
            message: "",
            connected: false,
            timeout: 3000
        };
    },
    computed: {
        ...mapState(["user"]),
        ...mapGetters(["filteredUsers"])
    },
    methods: {
        ...mapMutations(["clearAll"]),
        connect() {
            if (!this.connected) {
                this.$socket.emit("joinServer", this.user, data => {
                    if (data == null) {
                        return console.log("Something is wrong");
                    }
                    this.connected = !this.connected;
                });
            } else {
                this.exit();
            }
        },
        exit() {
            this.$axios
                .$post("/disconnect", {
                    user: this.user
                })
                .then(res => {
                    this.clearAll();
                    this.$router.push("/");
                })
                .catch(err => {
                    console.log(err);
                });
        },
        sendMessage(message) {
            this.$socket.emit(
                "sendMessage",
                {
                    message: this.message,
                    info: message
                },
                () => {
                    this.successfullySentFlag = true;
                }
            );
        }
    }
};
</script>

<style>
h1 {
    border: 3px solid white;
}
</style>