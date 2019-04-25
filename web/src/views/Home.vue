<template>
  <div></div>
</template>

<script>
export default {
  mounted() {
    console.log(axios);
    axios
      .get("/users/user_info")
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
</style>