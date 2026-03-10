<template>
    <div class="tour-store">
        <notifications group="notification" position="top left" />

        <app-header class="hero-section-absolute hero-section_dark"></app-header>

        <main class="content-wrapper container-xl">
            <section class="category-filters">
                <NavigationTabs />
            </section>

            <ProductList />
        </main>

        <app-footer></app-footer>
    </div>
</template>

<script>

import ProductList from "./components/ProductList.vue";
import NavigationTabs from "./components/NavigationTabs.vue";

export default {
    name: 'MerchStore',
    components: {NavigationTabs, ProductList},
}
</script>
