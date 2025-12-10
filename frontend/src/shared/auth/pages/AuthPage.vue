<script setup lang="ts">
import AuthForm from '../components/AuthForm.vue';
import OnlyForGuests from '../components/OnlyForGuests.vue';
</script>

<template>
  <OnlyForGuests>
    <div>
      <AuthForm />
    </div>
  </OnlyForGuests>
</template>
