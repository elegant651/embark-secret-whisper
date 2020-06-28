<template>
  <div class="home">
    <div class="container">
      <img src="/img/b-logo@3x.png" />
      <h2 class="ma-3">Make a good habit by what you can do battle.</h2>
      <div class="btnStart" @click="moveCreateTodo">Start Battle to-do!</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  methods: {
    moveCreateTodo() {
      this.$router.push('/create-todo')
    }
  }
}
</script>

<style>
  .container {
    max-width: 768px;
    margin: 0 auto;
    text-align: center;
    padding-top: 80px;
    padding-bottom: 80px;
  }

  .btnStart {
    width: 296px;
    height: 56px;
    border-radius: 28px;
    background-color: #0062ff;
    font-size: 18px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 56px;
    letter-spacing: normal;
    text-align: center;
    color: #ffffff;
    margin: 0 auto;
    margin-bottom: 80px;
    cursor: pointer;
  }

  .btnStart a {
    text-transform: none;
    color: #fff;
  }

  .imgWrap {
    display: flex;
    align-items: center;
  }

  h1 {
    max-width: 453px;
    font-size: 32px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.38;
    letter-spacing: normal;
    text-align: center;
    color: #0062ff;
    margin: 0 auto;
    margin-top: 80px;
    margin-bottom: 40px;
  }

  h2 {        
    font-size: 28px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: normal;
    text-align: center;
    color: #17191d;        
  }

  .imgWrap h2 {
    max-width: 453px;
    margin: 0 auto;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 30px;
    margin-top: 30px;
  }

  h3 {
    max-width: 453px;
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.42;
    letter-spacing: normal;
    color: #17191d;
    margin: 0 auto;
    margin-left: 20px;
    margin-right: 20px;
  }

  h4 {
    font-size: 24px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: center;
    color: #17191d;
  }
</style>  