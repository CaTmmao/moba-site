<template>
  <div class="home">
    <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
      <swiper-slide>
        <img src="@/assets/imgs/a.jpeg" class="width-100p" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/imgs/b.jpeg" class="width-100p" />
      </swiper-slide>
      <swiper-slide>
        <img src="@/assets/imgs/c.jpeg" class="width-100p" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: {
          delay: 4000
        }
      }
    };
  }
};
</script>
