<script setup lang="ts">
import NavListLink from '../NavListLink.vue';
import AppButton from '../buttons/AppButton.vue';
import ArrowRight from '../icons/ArrowRight.vue';
import { useAuthStore } from '@/shared/auth/AuthStore';
import { useRouting } from '@/router/useRouting';
import { RouteNames } from '@/router/routes';
import Dropdown from '../dropdown/Dropdown.vue';
import ArrowDown from '../icons/ArrowDown.vue';
import { computed } from 'vue';
import Account from '../icons/Account.vue';
import Profile from '../icons/Profile.vue';
import Language from '../icons/Language.vue';
import Moon from '../icons/Moon.vue';
import Toggle from '../controls/Toggle.vue';
import DoorOut from '../icons/DoorOut.vue';
import { useModal } from '../modals/utils';
import ConfirmModal from '../modals/ConfirmModal.vue';

const { goToAuth } = useRouting();
const authStore = useAuthStore();

const confirmLogoutModal = useModal();

const user = computed(() => authStore.user);

const onLogout = async () => {
  await authStore.logout();
  confirmLogoutModal.close();
};
</script>

<template>
  <header class="fixed top-0 w-full px-2 py-4 bg-blue-100 h-20 flex items-center">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink :to="{ name: RouteNames.MAIN }">
        <h1 class="text-l font-bold tracking-wider text-gray-800">Localization platform</h1>
      </RouterLink>

      <div class="flex gap-4">
        <AppButton
          v-if="!user"
          text="Sign in"
          @click="goToAuth"
        >
          <template #append>
            <ArrowRight class="ml-2" />
          </template>
        </AppButton>

        <template v-if="user">
          <Dropdown>
            <template #trigger>
              <AppButton text="Menu">
                <template #append>
                  <ArrowDown />
                </template>
              </AppButton>
            </template>

            <template #content>
              <div class="p-2">
                <div class="px-2.5 py-2 space-x-1.5 text-sm bg-gray-100 rounded">
                  <div class="text-sm">
                    <div class="font-medium text-heading">{{ user.name }} {{ user.lastname }}</div>
                    <div class="truncate text-body">{{ user.email }}</div>
                  </div>
                </div>
              </div>

              <ul
                class="px-2 pb-2 text-sm text-body font-medium"
                aria-labelledby="dropdownInformationButton"
              >
                <li>
                  <NavListLink
                    :to="{ name: RouteNames.USER_CREDENTIALS }"
                    text="Account"
                  >
                    <template #icon>
                      <Account />
                    </template>
                  </NavListLink>
                </li>

                <li>
                  <NavListLink
                    to="not-implemented"
                    text="Profile"
                  >
                    <template #icon>
                      <Profile />
                    </template>
                  </NavListLink>
                </li>
                <li>
                  <NavListLink
                    to="not-implemented"
                    text="Translations"
                  >
                    <template #icon>
                      <Language />
                    </template>
                  </NavListLink>
                </li>
                <li
                  class="flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded mb-1.5"
                >
                  <div class="inline-flex items-center gap-1">
                    <Moon />
                    Dark mode
                  </div>
                  <Toggle />
                </li>

                <li class="border-t border-gray-100 pt-1">
                  <NavListLink
                    text="Sign out"
                    class="text-red-500"
                    @click="confirmLogoutModal.open"
                  >
                    <template #icon>
                      <DoorOut />
                    </template>
                  </NavListLink>
                </li>
              </ul>
            </template>
          </Dropdown>
          <ConfirmModal
            :showableComponent="confirmLogoutModal"
            :loading="authStore.isLogoutLoading"
            title="You will be logged out from the system"
            content="Please confirm this action."
            @cancel="confirmLogoutModal.close"
            @confirm="onLogout"
          />
        </template>
      </div>
    </div>
  </header>
</template>
