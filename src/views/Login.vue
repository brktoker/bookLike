<template>
  <div class="login_register_container">
    <h3 class="text-2xl text-center mb-3">Login</h3>
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
    <button @click="login" class="default-button">Giriş yap</button>
    <span class="text-center mt-3 text-sm">
      Üye değilim,
      <router-link
        :to="{ name: 'RegisterPage' }"
        class="text-red-900 hover:text-black"
      >
        Üye olmak istiyorum!</router-link
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
        password: null,
      },
    };
  },
  computed: {
    isUserValidation() {
      return this.userData.username != null && this.userData.password != null;
    },
  },
  methods: {
    login() {
      if (this.isUserValidation) {
        const key = "booklike1234!";
        const password = CryptoJs.HmacSHA1(
          this.userData.password,
          key
        ).toString();

        this.$axios
          .get(`/users?username=${this.userData.username}&${password}`)
          .then((res) => {
            if(res?.data?.length > 0){
              this.$store.commit("setUser",res?.data[0])
              this.$router.replace("/")
            } else {
              alert("This user not found on the system")
            }
          });
      } else {
        alert("Please Fill all nessesary inputs")
      }
    },
  },
};
</script>
