<script>
	import '../app.pcss';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<ModeWatcher />

<Button on:click={toggleMode} variant="outline" size="icon">
	<Sun
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
	/>
	<Moon
		class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>

<Toaster position="top-right" />
<slot />
<footer class="mt-9 text-center text-xl text-muted-foreground">
	<div class="flex justify-center">
		<a
			href="https://www.npmjs.com/package/ezberlenen-parola"
			target="_blank"
			rel="noopener noreferrer"
			><img alt="NPM Version" src="https://img.shields.io/npm/v/ezberlenen-parola" />
		</a>
		<a
			href="https://www.npmjs.com/package/ezberlenen-parola"
			target="_blank"
			rel="noopener noreferrer"
		>
			<img
				alt="jsDelivr hits (npm)"
				class="mx-2"
				src="https://img.shields.io/jsdelivr/npm/hm/ezberlenen-parola"
			/>
		</a>
	</div>
	<a
		href="https://www.npmjs.com/package/ezberlenen-parola"
		target="_blank"
		rel="noopener noreferrer"
		class="text-xs"
	>
		Ezberlenen Parola NPM Paketi kullanılmıştır</a
	>
</footer>
