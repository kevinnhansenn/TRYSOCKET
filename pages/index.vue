<template>
    <v-row justify="center">
        <v-snackbar color="error" top v-model="error" :timeout="timeout">
            Please use other username
            <v-btn color="blue" text @click="error = false">Close</v-btn>
        </v-snackbar>
        <v-dialog persistent v-model="dialog" max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">PRIVATE CHAT ROOM (SOCKET.IO)</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="name"
                                    label="Username"
                                    hint="Only unique username is accepted"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="joinRoom">ENTER</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            dialog: true,
            name: "",
            error: false,
            timeout: 3000
        };
    },
    methods: {
        ...mapMutations(["setUser"]),
        joinRoom() {
            this.$axios.s;
            this.$axios
                .$post("/user", {
                    user: this.name
                })
                .then(res => {
                    this.dialog = false;
                    this.setUser(this.name);
                    this.$router.push("/home");
                })
                .catch(e => {
                    // this.error = true;
                    this.$toast.error("Please Use other username");
                });
        }
    }
};
</script>
