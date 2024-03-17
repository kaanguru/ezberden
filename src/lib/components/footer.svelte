<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/';
	import { Info } from 'lucide-svelte';
</script>

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
	<Button on:click={() => goto('/bilgi')} size="sm" class="m-3 h-12 w-12 " aria-label="Bilgi"
		><Info size="icon" /></Button
	>
	<a
		href="https://www.npmjs.com/package/ezberlenen-parola"
		target="_blank"
		rel="noopener noreferrer"
		class="text-xs"
	>
		Ezberlenen Parola NPM Paketi kullanılmıştır</a
	>
	<Button on:click={() => goto('/')} size="sm" class="m-3 h-12 w-12  " aria-label="home">
		<img class="hidden dark:block" src="/img/favicon-32x32.png" width="32" height="32" alt="logo" />
		<img
			class="block dark:hidden"
			src="/img/favicon-32x32-inv.png"
			width="32"
			height="32"
			alt="logo"
		/>
	</Button>
</footer>
