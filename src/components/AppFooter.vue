<template>
    <footer class="bg-gray-800 dark:bg-slate-900 text-gray-300 py-12">
        <div class="max-w-7xl mx-auto px-8">
            <nav aria-label="Footer navigation">
                <ul class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 list-none p-0 m-0">
                    <li>
                        <h2 class="font-semibold text-white mb-4 text-base">CMS Documentation</h2>
                        <ul class="space-y-2 text-sm list-none p-0 m-0">
                            <li><a href="#" class="footer-link">Getting Started</a></li>
                            <li><a href="#" class="footer-link">Projects</a></li>
                            <li><a href="#" class="footer-link">Services</a></li>
                            <li><a href="#" class="footer-link">Codespaces</a></li>
                        </ul>
                    </li>
                    <li>
                        <h2 class="font-semibold text-white mb-4 text-base">API Documentation</h2>
                        <ul class="space-y-2 text-sm list-none p-0 m-0">
                            <li><a href="#" class="footer-link">APIs Overview</a></li>
                            <li><a href="#" class="footer-link">External APIs</a></li>
                            <li><a href="#" class="footer-link">Internal APIs</a></li>
                        </ul>
                    </li>
                    <li>
                        <h2 class="font-semibold text-white mb-4 text-base">Resources</h2>
                        <ul class="space-y-2 text-sm list-none p-0 m-0">
                            <li><a href="#" class="footer-link" target="_blank" rel="noopener noreferrer" aria-label="CMS Platform (opens in new tab)">CMS Platform <span aria-hidden="true">↗</span></a></li>
                            <li><a href="#" class="footer-link" target="_blank" rel="noopener noreferrer" aria-label="Support (opens in new tab)">Support <span aria-hidden="true">↗</span></a></li>
                            <li><a href="#" class="footer-link" target="_blank" rel="noopener noreferrer" aria-label="Status (opens in new tab)">Status <span aria-hidden="true">↗</span></a></li>
                        </ul>
                    </li>
                    <li>
                        <h2 class="font-semibold text-white mb-4 text-base">Development</h2>
                        <ul class="space-y-2 text-sm list-none p-0 m-0">
                            <li><a href="#" class="footer-link">Changelog</a></li>
                            <li><a href="#" class="footer-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in new tab)">GitHub <span aria-hidden="true">↗</span></a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div class="border-t border-gray-700 pt-8 text-center text-sm">
                <p class="text-gray-400">Copyright © 2025 Alex Polan. Built with Syscom.</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
.footer-link {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease, text-decoration 0.2s ease;
}

.footer-link:hover,
.footer-link:focus {
    color: white;
    text-decoration: underline;
}

.footer-link:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
}
</style>