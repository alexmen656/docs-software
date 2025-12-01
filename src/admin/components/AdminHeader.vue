<template>
    <header class="bg-white dark:bg-gray-800 fixed top-0 left-0 right-0 z-50">
        <div class="mx-auto px-4 sm:px-3 2xl:px-3">
            <div class="flex justify-between items-center h-15">
                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center logo-container"
                        @click="router.push({ name: 'landing' })" style="cursor: pointer;">
                        <img class="logo-image"
                            :src="darkmode ? '/src/assets/logo-syscom-dark.svg' : '/src/assets/logo-syscom.svg'"
                            alt="Logo of SysCom" />
                            Admin
                    </div>
                </div>
                <div v-if="showSearch" class="hidden md:flex flex-1 max-w-2xl mx-8">
                    <div class="relative w-full search-container">
                        <label for="header-search" class="sr-only">Search Admin</label>
                        <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500"
                            viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clip-rule="evenodd" />
                        </svg>
                        <input id="header-search" type="text" placeholder="Search the docs..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" />
                    </div>
                </div>
                <div class="flex items-center space-x-2 sm:space-x-4">
                    <div class="relative hidden md:block" ref="languageDropdownRef">
                        <button @click="toggleLanguageMenu" @keydown="handleButtonKeydown" aria-haspopup="menu"
                            :aria-expanded="isLanguageMenuOpen" aria-controls="language-menu"
                            :aria-label="currentLanguage.ariaLabel"
                            class="flex items-center space-x-1 sm:space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-2 sm:px-3 py-2 transition-colors">
                            <span
                                class="w-6 h-6 sm:w-8 sm:h-8 overflow-hidden flex items-center justify-center text-lg sm:text-xl"
                                aria-hidden="true">{{ currentLanguage.flag }}</span>
                            <span class="hidden sm:block text-md font-medium text-gray-700 dark:text-gray-200">{{
                                currentLanguage.name }}</span>
                            <svg class="hidden sm:block w-4 h-4 text-gray-400 dark:text-gray-500" fill="currentColor"
                                viewBox="0 0 20 20" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                        <ul v-show="isLanguageMenuOpen" id="language-menu" role="menu"
                            :tabindex="isLanguageMenuOpen ? 0 : -1" @keydown="handleMenuKeydown"
                            class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-1">
                            <li v-for="(lang, index) in languages" :key="lang.code" role="none">
                                <button :lang="lang.code" role="menuitem" :tabindex="isLanguageMenuOpen ? 0 : -1"
                                    @click="selectLanguage(lang)" @keydown="(e) => handleMenuItemKeydown(e, index)"
                                    :ref="el => { if (el) menuItemRefs[index] = el as HTMLButtonElement }"
                                    class="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100">
                                    <span class="text-lg" aria-hidden="true">{{ lang.flag }}</span>
                                    <span class="text-sm">{{ lang.name }}</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <button aria-label="Toggle theme" class="hidden sm:block">
                        <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"
                            class="toggleIcon_g3eP lightToggleIcon_pyhR">
                            <path fill="currentColor"
                                d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z">
                            </path>
                        </svg>
                    </button>
                    <button @click="router.push('/login')"
                        class="hidden md:block text-[#0e172b] font-semibold py-1 px-2 sm:py-2 sm:px-4 text-xs sm:text-base rounded-lg bg-primary bg-primary-hover whitespace-nowrap">
                        Log In
                    </button>
                    <button @click="toggleHeaderMenu" aria-label="Toggle menu" :aria-expanded="isHeaderMenuOpen"
                        class="md:hidden p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            class="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true">
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
            <div v-show="isHeaderMenuOpen" class="md:hidden border-t border-gray-200 dark:border-gray-700">
                <div class="px-4 py-3 space-y-3">
                    <div v-if="showSearch" class="relative w-full">
                        <label for="mobile-search" class="sr-only">Search the documentation</label>
                        <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500"
                            viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clip-rule="evenodd" />
                        </svg>
                        <input id="mobile-search" type="text" placeholder="Search the docs..."
                            class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400" />
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Language:</span>
                        <div class="flex gap-2">
                            <button v-for="lang in languages" :key="lang.code" @click="selectLanguage(lang)"
                                :class="['px-3 py-1.5 rounded text-sm transition-colors',
                                    currentLanguage.code === lang.code
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600']">
                                {{ lang.name }}
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Theme:</span>
                        <button aria-label="Toggle theme"
                            class="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors">
                            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"
                                class="toggleIcon_g3eP lightToggleIcon_pyhR">
                                <path fill="currentColor"
                                    d="M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5 S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1 s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0 c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95 c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41 L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41 s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06 c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z">
                                </path>
                            </svg>
                        </button>
                    </div>
                    <button @click="router.push('/login')"
                        class="w-full text-[#0e172b] font-semibold py-2 px-4 rounded-lg bg-primary bg-primary-hover text-base">
                        Log In
                    </button>
                </div>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useTheme } from '@/composables/useTheme'
useTheme().setCSSVariables("header")

const router = useRouter()
const route = useRoute()
const darkmode = ref(false)

const updateDarkmode = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        darkmode.value = true
    } else {
        darkmode.value = false
    }
}

updateDarkmode()
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
darkModeMediaQuery.addEventListener('change', updateDarkmode)

interface Language {
    code: string
    name: string
    flag: string
    ariaLabel: string
}

const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸', ariaLabel: 'Select page language' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', ariaLabel: 'Sprache der Seite wählen' },
    { code: 'sk', name: 'Slovensky', flag: '🇸🇰', ariaLabel: 'Zvoľte jazyk stránky' }
]

const currentLanguage = ref<Language>(languages[0]!)
const isLanguageMenuOpen = ref(false)
const isHeaderMenuOpen = ref(false)
const languageDropdownRef = ref<HTMLElement | null>(null)
const menuItemRefs = ref<HTMLButtonElement[]>([])

const toggleLanguageMenu = () => {
    isLanguageMenuOpen.value = !isLanguageMenuOpen.value
    if (isLanguageMenuOpen.value) {
        nextTick(() => {
            menuItemRefs.value[0]?.focus()
        })
    }
}

const toggleHeaderMenu = () => {
    isHeaderMenuOpen.value = !isHeaderMenuOpen.value
}

const closeLanguageMenu = () => {
    isLanguageMenuOpen.value = false
}

const selectLanguage = (lang: Language) => {
    currentLanguage.value = lang
    closeLanguageMenu()
    document.documentElement.lang = lang.code
}

const handleButtonKeydown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        isLanguageMenuOpen.value = true
        nextTick(() => {
            menuItemRefs.value[0]?.focus()
        })
    }
}

const handleMenuKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        e.preventDefault()
        closeLanguageMenu()
        const button = languageDropdownRef.value?.querySelector('button')
        button?.focus()
    }
}

const handleMenuItemKeydown = (e: KeyboardEvent, index: number) => {
    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault()
            if (index < languages.length - 1) {
                menuItemRefs.value[index + 1]?.focus()
            }
            break
        case 'ArrowUp':
            e.preventDefault()
            if (index > 0) {
                menuItemRefs.value[index - 1]?.focus()
            }
            break
        case 'Escape':
            e.preventDefault()
            closeLanguageMenu()
            const button = languageDropdownRef.value?.querySelector('button')
            button?.focus()
            break
        case 'Tab':
            if (!e.shiftKey && index === languages.length - 1) {
                closeLanguageMenu()
            }

            if (e.shiftKey && index === 0) {
                closeLanguageMenu()
            }
            break
        case 'Enter':
        case ' ':
            e.preventDefault()
            const lang = languages[index]
            if (lang) selectLanguage(lang)
            break
    }
}

const handleClickOutside = (e: MouseEvent) => {
    if (languageDropdownRef.value && !languageDropdownRef.value.contains(e.target as Node)) {
        closeLanguageMenu()
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    darkModeMediaQuery.removeEventListener('change', updateDarkmode)
})

const evaluateShowSearch = () => {
    const pathname = route.path
    return pathname !== '/' && pathname !== '' && pathname !== '/landing' && pathname !== '/login'
}

const showSearch = ref(evaluateShowSearch())

watch(() => route.path, () => {
    showSearch.value = evaluateShowSearch()
    console.log('Route changed, showSearch:', showSearch.value)
})
</script>

<style scoped>
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

.logo-text {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.8px;
    line-height: 1;
    transition: color 0.2s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #ea0e2b;
    cursor: pointer;
}

.logo-image {
    height: 34px;
    width: auto;
    transition: transform 0.2s ease;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.logo-container {
    display: flex;
    align-items: center;
    gap: 14px;
    height: 100%;
    justify-content: flex-start;
    padding: 4px 0;
}

header {
    background: #eff3f6;
}

@media (prefers-color-scheme: dark) {
    header {
        background: #1f2937;
    }
}
</style>
