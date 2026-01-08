<script setup lang="ts">
import NavListLink from '@/components/NavListLink.vue';
import { RouteNames } from '@/router/routes';
import PageWithSideNav from '@/components/layout/PageWithSideNav.vue';
import AuthGuard from '@/shared/auth/components/AuthGuard.vue';
import Profile from '@/components/icons/Profile.vue';
import UserCircle from '@/components/icons/UserCircle.vue';
import { useMyProfile } from '../useMyProfile';
import Spinner from '@/components/loaders/Spinner.vue';

const { getMyProfile, isProfileLoading, isEditProfileInProgress, editProfileErrors, profile, editProfile } =
  useMyProfile();

getMyProfile();
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

      <template #page-body>
        <div>
          <div
            v-if="isProfileLoading"
            class="h-screen w-full flex justify-center items-center"
          >
            <Spinner />
          </div>

          <RouterView
            v-else-if="profile"
            :profile="profile"
            :isEditProfileInProgress="isEditProfileInProgress"
            :editProfileErrors="editProfileErrors"
            @editProfile="editProfile"
          />
        </div>
      </template>
    </PageWithSideNav>
  </AuthGuard>
</template>
