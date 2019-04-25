<template>
  <div>
    <button @click="toGithub">github登录</button>
  </div>
</template>

<script>
let oauth_uri='https://github.com/login/oauth/authorize'
let client_id = 'c26a2c36287f5662ed62'
let client_secret='f88afd71471725488ed301697f634c7d85d5524c'
let redirect_uri = 'http://192.168.1.177:8081'
export default {
  mounted() {
    axios
      .get("/users/user_info")
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  methods: {
    toGithub() {
      window.location.href = `${oauth_uri}?client_id=${client_id}&redirect_url=${redirect_uri}`
    }
  }
};
</script>

<style lang="scss" scoped>
</style>