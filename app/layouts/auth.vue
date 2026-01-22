<template>
  <div class="auth-layout">
    <!-- Sadece logoyu gösterelim -->
    <div class="auth-header">
      <NuxtLink to="/">doremusic</NuxtLink>
    </div>

    <!-- Sayfa İçeriği -->
    <div class="auth-content">
      <slot />
    </div>

    <div class="auth-footer">
      <p>© 2025 doremusic - Güvenli Giriş Ekranı</p>
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f4f4f4;
}

.auth-header {
  text-align: center;
  padding: 20px;
  background: white;
  border-bottom: 1px solid #ddd;
}

.auth-header a {
  font-size: 30px;
  font-weight: bold;
  color: #d32f2f;
  text-decoration: none;
}

.auth-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
}

.auth-footer {
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 12px;
}
</style>