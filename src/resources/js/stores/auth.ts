import { ref } from "vue";
import { defineStore } from "pinia";

export interface AuthUser {
    name: string;
    role: string;
}

/**
 * Frontend-only mock auth: no backend call is made yet, this only
 * models the logged-in/out state so routing and the shell can react to it.
 */
export const useAuthStore = defineStore(
    "auth",
    () => {
        const isAuthenticated = ref(false);
        const user = ref<AuthUser | null>(null);

        function login(email: string): void {
            isAuthenticated.value = true;
            user.value = {
                name: email.split("@")[0] || "利用者",
                role: "在庫担当者",
            };
        }

        function logout(): void {
            isAuthenticated.value = false;
            user.value = null;
        }

        return { isAuthenticated, user, login, logout };
    },
    {
        persist: true,
    },
);
