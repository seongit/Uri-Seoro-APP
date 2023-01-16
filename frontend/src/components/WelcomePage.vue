<template>
  <div id="welcomePage" >
      <div class="outer" >
        <h3>당신 곁의 친근한 공간,</h3>
        <h1>우리 서로</h1>
        <img alt="Main image" src="../assets/main_image.png">
      </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
#welcomePage {
  height: 994px;
  left: 100%;
  top: 10%;
  background: #FCD842;
}

h1 {
  position: absolute;
  width: 19%;
  height: 10%;
  left: 43%;
  top: 25%;

  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 93px;
  text-align: center;
  color: #FFFFFF;
}

h3 {
  position: absolute;
  width: 19%;
  height: 10%;
  left: 43%;
  top: 20%;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 52px;
  text-align: center;
  color: #FFFFFF;
}

img {
  position: absolute;
  width: 25%;
  height: 40%;
  left: 40%;
  top: 32%;
}
</style>
