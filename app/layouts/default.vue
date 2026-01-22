<template>
  <div class="app-layout">
    <!-- Header Sabit -->
    <AppHeader />
    
    <!-- Sayfa İçeriği -->
    <main class="content">
      <slot />
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ekranı kapla */
  font-family: 'Segoe UI', sans-serif;
}

.content {
  flex: 1; /* Footer'ı aşağı it, içeriği yay */
  background-color: #f9f9f9;
  padding-bottom: 40px;
}
</style>