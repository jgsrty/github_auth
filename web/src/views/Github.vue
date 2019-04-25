<template>
  <div>
    <div>{{githubUser}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      githubUser: "github登陆中..."
    };
  },
  mounted() {
    let code = this.$route.query.code;
    axios
      .get(`/users/github_auth?code=${code}`)
      .then(res => {
        if (res.data.data.username) {
          this.githubUser = res.data.data.username;
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
</style>