<script lang="ts">
	import '../app.pcss';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { Toaster } from '$lib/components/ui/sonner';
	import '@fontsource/courier-prime';
	import '@fontsource/caudex';
	import Footer from '$lib/components/footer.svelte';
</script>

<svelte:head>
	<title>Ezberden Parola</title>
	<meta property="og:title" content="Ezberden Parola" />
	<meta property="og:site_name" content="Ezberden" />
	<meta property="og:url" content="https://ezberden.vercel.app/" />
	<meta
		property="og:description"
		content="Türkçe'de kolay hatırlanabilen cümlelerden yola çıkarak çok güvenli şifreler oluşturun."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://ezberden.vercel.app/img/ss-desktop.webp" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<ModeWatcher />
<Toaster position="bottom-right" />

<Button on:click={toggleMode} variant="outline" class="ml-2" size="icon">
	<Sun class="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
	<Moon class="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
	<span class="sr-only">Toggle theme</span>
</Button>
<div id="logo" class="mb-5">
	<a href="/" aria-label="ana sayfaya git">
		<img
			class="mx-auto hidden max-h-20 dark:block"
			src="/img/ezberden-dark.png"
			alt="ezberden logo"
		/>
		<img class="mx-auto max-h-20 dark:hidden" src="/img/ezberden-light.png" alt="ezberden logo" />
	</a>
</div>

<slot />
<Footer />
