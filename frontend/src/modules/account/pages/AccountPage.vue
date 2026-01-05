<script setup lang="ts">
import Lock from '@/components/icons/Lock.vue';
import Account from '@/components/icons/Account.vue';
import PageWithSideNav from '@/components/layout/PageWithSideNav.vue';
import NavListLink from '@/components/NavListLink.vue';
import { RouteNames } from '@/router/routes';
import AuthGuard from '@/shared/auth/components/AuthGuard.vue';
</script>

<template>
  <AuthGuard>
    <PageWithSideNav title="Account">
      <template #sidebar-body>
        <ul class="py-2">
          <li>
            <NavListLink
              text="Credentials"
              :to="{ name: RouteNames.USER_CREDENTIALS }"
            >
              <template #icon>
                <Account />
              </template>
            </NavListLink>

            <NavListLink
              text="Change password"
              :to="{ name: RouteNames.CHANGE_PASSWORD }"
            >
              <template #icon>
                <Lock />
              </template>
            </NavListLink>
          </li>
        </ul>
      </template>
    </PageWithSideNav>
  </AuthGuard>
</template>
