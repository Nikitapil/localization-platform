<script setup lang="ts">
import NavListLink from '@/components/NavListLink.vue';
import { RouteNames } from '@/router/routes';
import PageWithSideNav from '@/components/layout/PageWithSideNav.vue';
import AuthGuard from '@/shared/auth/components/AuthGuard.vue';
import Profile from '@/components/icons/Profile.vue';
import UserCircle from '@/components/icons/UserCircle.vue';
</script>

<template>
  <AuthGuard>
    <PageWithSideNav title="Profile">
      <template #sidebar-body>
        <ul class="py-2">
          <li>
            <NavListLink
              text="Credentials"
              :to="{ name: RouteNames.PROFILE_CREDENTIALS }"
            >
              <template #icon>
                <Profile />
              </template>
            </NavListLink>

            <NavListLink
              text="Users"
              :to="{ name: RouteNames.PROFILE_USERS }"
            >
              <template #icon>
                <UserCircle />
              </template>
            </NavListLink>
          </li>
        </ul>
      </template>
    </PageWithSideNav>
  </AuthGuard>
</template>
