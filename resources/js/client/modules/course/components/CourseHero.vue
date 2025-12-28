<template>
    <section class="course-hero container-fluid container-xl">
        <div class="hero-content-wrapper">
            <div class="hero-background-video">
                <video class="h-100 w-100" autoplay muted loop playsinline>
                    <source src="/videos/movie.mp4" type="video/mp4">
                </video>
            </div>
            <div v-if="false" class="hero-background-image">
                <img src="/img/course-hero.png" alt="Hero Background">
            </div>
            <div class="hero-main-text">
                <h2 class="hero-main-title">Авторский курс</h2>
                <h1 class="hero-highlight-title">«ПУТЬ В ТУРИЗМ»</h1>
                <p class="hero-subtitle">от медийной туристической компании "В ПУТЬ"</p>
            </div>
            <div class="scroll-indicator">
                <div class="scroll-arrow-container">
                    <svg class="scroll-arrow" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
                    </svg>
                </div>
            </div>
        </div>

        <div class="hero-lower-content">
            <p class="lower-description">
                это не просто курс, мы расскажем <b>как начать карьеру,</b> которая может позволить тебе работать из любой
                точки нашей планеты — будь то пляжи Мальдив, горы Швейцарии или уютные уголки Европы.
            </p>
        </div>
    </section>
</template>

<script setup>

</script>

