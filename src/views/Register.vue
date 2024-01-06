<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Register</h3>
    <input
      v-model="userData.fullname"
      type="text"
      placeholder="Tam Ad"
      class="input mb-3"
    />
    <input
      v-model="userData.username"
      type="text"
      placeholder="Kullanıcı Adı"
      class="input mb-3"
    />
    <input
      v-model="userData.password"
      type="password"
      placeholder="Şifre"
      class="input mb-3"
    />
    <button class="default-button" @click="register">Kayıt ol</button>
    <span class="text-center mt-3 text-sm">
      Zaten Üyeyim,
      <router-link
        :to="{ name: 'LoginPage' }"
        class="text-red-900 hover:text-black"
        >Giriş yap!</router-link
      >
    </span>
  </div>
</template>

<script>
import CryptoJs from "crypto-js";
export default {
  data() {
    return {
      userData: {
        username: null,
        fullname: null,
        password: null,
      },
    };
  },
  computed: {
    isUserValidation() {
      return (
        this.userData.username != null &&
        this.userData.fullname != null &&
        this.userData.password != null
      );
    },
  },
  methods: {
    register() {
      if (this.isUserValidation) {
        const key = "booklike1234!";
        const password = CryptoJs.HmacSHA1(
          this.userData.password,
          key
        ).toString();
        this.$axios
          .post("/users", { ...this.userData, password })
          .then((res) => {
            if (res?.data?.length > 0) {
              this.$store.commit("setUser", res?.data[0]);
              this.$router.replace("/");
            } else {
              alert("user created error");
            }
          });
      } else {
        alert("Please Fill all nessesary inputs");
      }
    },
  },
};
</script>
