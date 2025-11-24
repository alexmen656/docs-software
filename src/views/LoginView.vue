<template>
    <div
        class="min-h-full bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-gray-800 dark:via-gray-900 dark:to-black flex items-center justify-center px-4 sm:px-6 lg:px-8 img-bg">
        <div class="max-w-md w-full space-y-8">
            <div class="text-center">
                <h2 class="mt-6 text-3xl font-extrabold dark:text-white">
                    Welcome back
                </h2>
                <p class="mt-2 text-sm text-primary-100 dark:text-gray-300">
                    Sign in to your SysCom account
                </p>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-6">
                <form class="space-y-4" @submit.prevent="handleLogin">
                    <div>
                        <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Email or Username
                        </label>
                        <input id="username" v-model="username" name="username" type="text" required
                            class="appearance-none block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            placeholder="your@email.com or username">
                    </div>
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Password
                        </label>
                        <input id="password" v-model="password" name="password" type="password" required
                            class="appearance-none block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:cursor-not-allowed bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                            placeholder="••••••••">
                    </div>
                    <button type="submit"
                        class="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium dark:text-white bg-primary-600 dark:bg-primary-700 hover:bg-primary-700 dark:hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:bg-primary-400 dark:disabled:bg-primary-600 disabled:cursor-not-allowed">
                        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                            </circle>
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                            </path>
                        </svg>
                    </button>
                </form>
                <div class="text-center">
                    <p class="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?
                        <router-link to="/signup"
                            class="font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300">
                            Sign up
                        </router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
    useTokenClient,
    type AuthCodeFlowSuccessResponse,
    type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";

const router = useRouter()

const username = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
    console.log("Access Token: ", response.access_token);

    try {
        const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                'Authorization': `Bearer ${response.access_token}`
            }
        });

        if (userInfoResponse.ok) {
            const userInfo = await userInfoResponse.json();
            console.log("User Info: ", userInfo);

            const success = true;
            if (success) {
                router.push('/dashboard');
            }
        } else {
            console.error("Failed to fetch user info:", userInfoResponse.statusText);
        }
    } catch (error) {
        console.error("Error fetching user info:", error);
    }
};

const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
    console.log("Error: ", errorResponse);
};

const { isReady, login } = useTokenClient({
    onSuccess: handleOnSuccess,
    onError: handleOnError,
    scope: 'email profile',
});

const handleLogin = async () => {
    const success = true;

    if (success) {
        router.push('/dashboard')
    }
}
</script>

<style scoped>
.img-bg {
    background-image:
        linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
        url('/bg-image2.jpeg');
    background-size: cover;
    background-position: center;
}
</style>