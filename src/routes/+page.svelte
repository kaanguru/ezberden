<script lang="ts">
	import { fade } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Alert from '$lib/components/ui/alert';
	import {
		ClipboardCheck,
		ThumbsUp,
		ImageDown,
		ScanSearch,
		RefreshCw,
		Timer,
		ShoppingBasket
	} from 'lucide-svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Table from '$lib/components/ui/table';
	import { parolaUret } from 'ezberlenen-parola';
	import zxcvbn from 'zxcvbn';

	let kelmSays = 3;
	let standrt = false;
	let aralklr = ' ';
	let sepettekiParola = '';
	let kopyalaAlertAlaniAcik = false;
	let direncAlertAlaniAcik = false;
	let fotoAlertAlaniAcik = false;
	let crackTimes: string[] = [];
	let smallPhotoURL: string | null | undefined = '';

	$: secenekler = { kelimeSayisi: kelmSays, standart: standrt, araliklar: aralklr };
	$: uretilenParola = parolaUret(secenekler);
	$: parolaOznesi = sepettekiParola.split(standrt ? '-' : aralklr)[1];

	function yenidenUret() {
		kopyalaAlertAlaniAcik = false;
		direncAlertAlaniAcik = false;
		fotoAlertAlaniAcik = false;
		sepettekiParola = '';
		uretilenParola = parolaUret(secenekler);
	}
	async function sepeteKopyala() {
		if (kopyalaAlertAlaniAcik) {
			kopyalaAlertAlaniAcik = false;
			return;
		}
		sepettekiParola = uretilenParola;
		await navigator.clipboard.writeText(sepettekiParola);
		kopyalaAlertAlaniAcik = true;
		setTimeout(() => {
			kopyalaAlertAlaniAcik = false;
		}, 2000);
	}

	async function fotoAlaniGoster() {
		smallPhotoURL = await getPhotoURL(parolaOznesi, 'tiny');
		// smallPhotoURL = await getSmallPhotoURL(parolaOznesi);
		fotoAlertAlaniAcik = true;
		setTimeout(() => {
			fotoAlertAlaniAcik = false;
		}, 9000);
	}

	function direncAlaniGoster(): void {
		if (direncAlertAlaniAcik) {
			direncAlertAlaniAcik = false;
			return;
		}
		const kalite = zxcvbn(sepettekiParola);
		crackTimes = Object.values(kalite.crack_times_display);
		direncAlertAlaniAcik = true;
		setTimeout(() => {
			fotoAlertAlaniAcik = false;
		}, 9000);
	}

	function ceviri(cracktims: string) {
		const translations = {
			centuries: 'Yüzyıllar',
			years: 'yıl',
			months: 'ay',
			weeks: 'hafta',
			days: 'gün',
			day: 'gün',
			hours: 'saat',
			minutes: 'dakika',
			seconds: 'saniye'
		};
		return cracktims.replace(
			/\b(centuries|years|months|weeks|days|day|hours|minutes|seconds)\b/g,
			(match) => translations[match as keyof typeof translations]
		);
	}
	async function getSmallPhotoURL(parolaOznesi: string) {
		const formData = new FormData();
		formData.append('parolaOznesi', parolaOznesi);
		const response = await fetch('/', {
			method: 'POST',
			body: formData
		});
		const text = await response.text();
		if (!text) {
			// Handle empty response gracefully (e.g., return null)
			return null;
		}
		console.log(text); // Log the raw response text
		const data = JSON.parse(text); // Manually parse the JSON

		// const data = await response.json();

		return data.smallPhotoURL;
	}
</script>

{#if sepettekiParola}
	<ShoppingBasket class="absolute right-0 top-0 z-10" />
	<div id="basket" class="absolute right-0 top-4 h-auto w-1/3 text-right">
		<p class="bg-secondary/75 p-1 text-right font-bold text-secondary-foreground">
			{sepettekiParola}
		</p>
	</div>
{/if}
<div class="container mx-auto justify-center">
	<div id="logo" class="mb-5">
		<img class="mx-auto hidden max-h-20 dark:block" src="/ezberden-dark.png" alt="ezberden logo" />
		<img class="mx-auto max-h-20 dark:hidden" src="/ezberden-light.png" alt="ezberden logo" />
	</div>

	<div class="satir">
		<input
			id="kelimeSayisi"
			class="mr-1 max-w-9 bg-secondary px-1 dark:bg-primary"
			type="number"
			max={6}
			min={2}
			bind:value={kelmSays}
		/>
		<span class="mx-1">kelimelik,</span>
		<Checkbox id="standartlar" class="mx-1 bg-secondary dark:bg-primary" bind:checked={standrt} />
		<span>Standartlara Uygun</span>
	</div>
	<div class="satir">
		kelime aralarında
		<Input
			id="araliklar"
			class="mx-2 max-w-8 bg-secondary dark:bg-primary"
			type="text"
			bind:value={aralklr}
			maxlength={2}
		/>
		karakteri olan <br />
	</div>
	<h2 class="satir mb-5">kolay ezberlenecek bir parola</h2>
	<div class="satir">
		<div id="parola-alan" class="m-2 bg-primary p-2 text-primary-foreground">{uretilenParola}</div>
	</div>
	<div class="satir">
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Button variant="outline" size="icon" on:click={yenidenUret}>
					<RefreshCw />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Beğenemedin mi? Yenile</p>
			</Tooltip.Content>
		</Tooltip.Root>

		<Tooltip.Root>
			<Tooltip.Trigger>
				<Button variant="outline" size="icon" on:click={sepeteKopyala}>
					<img class="dark:bg-primary" src="/Reminder.png" width="32" alt="Copy to clipboard" />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Beğendiysen kopyala</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</div>
	{#if sepettekiParola}
		<div class="satir b mb-4">
			<!-- foto -->
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Button variant="outline" size="icon" on:click={fotoAlaniGoster}>
						<ImageDown />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Hayal gücün için bir yardımcı</p>
				</Tooltip.Content>
			</Tooltip.Root>
			<!-- DİRENÇ -->
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Button variant="outline" size="icon" on:click={direncAlaniGoster}>
						<Timer />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Direnç Kontrolü</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
	{/if}

	{#if fotoAlertAlaniAcik && smallPhotoURL}
		<div class="satir max-w-md" transition:fade={{ delay: 250, duration: 300 }}>
			<small
				><span class="m-3 font-bold">{sepettekiParola.split(standrt ? '-' : aralklr)[1]}</span> kelimesini
				hatırlamanıza yardımcı olacağını düşündüğümüz bir fotoğraf</small
			>
			<img
				class="m-2"
				src={smallPhotoURL}
				alt={sepettekiParola.split(standrt ? '-' : aralklr)[1]}
			/>
			<hr />
		</div>
		<blockquote class="mt-16 border-l-2 pl-6 text-sm italic">
			<a href="https://www.pexels.com">Photos provided by Pexels</a>
		</blockquote>
	{:else if fotoAlertAlaniAcik}
		<div class="satir max-w-md" transition:fade={{ delay: 250, duration: 300 }}>
			<p class="mx-auto leading-7 [&:not(:first-child)]:mt-6">
				Şifreyi hatırlamak için <span class="font-bold">
					{sepettekiParola.split(standrt ? '-' : aralklr)[1]}
				</span> kelimesini arattık ama uygun fotoğraf bulamadık.
			</p>
			<a
				class="text-center"
				href="https://duckduckgo.com/?q={sepettekiParola.split(
					standrt ? '-' : aralklr
				)[1]}&t=newext&atb=v410-1&iax=images&ia=images"
				target="_blank"
				rel="noopener noreferrer"
				><Button variant="secondary">
					<ScanSearch class="mr-2 h-4 w-4" />
					İnternette Arat!
				</Button>
			</a>
		</div>
	{/if}

	{#if direncAlertAlaniAcik}
		<div class="mx-auto max-w-md" transition:fade={{ delay: 250, duration: 300 }}>
			<h4 class="mx-auto scroll-m-20 text-xl font-semibold tracking-tight">
				{sepettekiParola}
			</h4>
			<p class="text-sm text-muted-foreground">saldırıya ne kadar dayanabilecek?</p>
			<Table.Root>
				<Table.Caption>Şifre Kırıcılarla Kırılma Süreleri</Table.Caption>
				<Table.Body>
					<Table.Row>
						<Table.Cell class="font-medium">Saniyede 10 denemeyle</Table.Cell>

						<Table.Cell class="text-right">{ceviri(crackTimes[1])}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell class="font-medium">Saniyede 10 bin denemeyle:</Table.Cell>

						<Table.Cell class="text-right">{ceviri(crackTimes[2])}</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell class="font-medium">Saniyede 10 milyar denemeyle (çevrimdışı)</Table.Cell>

						<Table.Cell class="text-right">{ceviri(crackTimes[3])}</Table.Cell>
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</div>
	{/if}

	{#if kopyalaAlertAlaniAcik}
		<div class="mx-auto max-w-md" transition:fade={{ delay: 250, duration: 300 }}>
			<Alert.Root>
				<ClipboardCheck class="h-4 w-4" />
				<Alert.Title><ThumbsUp /></Alert.Title>
				<Alert.Description
					>Ezberlenecek parolanız: <span class="font-bold">{sepettekiParola}</span> panoya kopyalandı</Alert.Description
				>
			</Alert.Root>
		</div>
	{/if}
</div>

<style>
	.satir {
		@apply mx-auto flex items-center justify-center pt-4;
	}
	h2 {
		@apply text-lg font-semibold;
	}
</style>
