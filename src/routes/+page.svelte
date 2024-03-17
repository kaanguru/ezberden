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
		ShoppingBasket,
		Trash2,
		ClipboardCopy,
		Info
	} from 'lucide-svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Table from '$lib/components/ui/table';
	import { Slider } from '$lib/components/ui/slider';
	import { toast } from 'svelte-sonner';
	import { parolaUret } from 'ezberlenen-parola';
	import zxcvbn from 'zxcvbn';
	import { goto } from '$app/navigation';

	let kelmSays = 3;
	let standrt = false;
	let aralklr = ' ';
	let kopyalaAlertAlaniAcik = false;
	let direncAlertAlaniAcik = false;
	let fotoAlertAlaniAcik = false;
	let crackTimes: string[] = [];
	let active = false;
	$: secenekler = { kelimeSayisi: kelmSays, standart: standrt, araliklar: aralklr };
	$: uretilenParola = parolaUret(secenekler);
	$: sepettekiParolalar = [];
	$: parolaOznesi =
		sepettekiParolalar.length > 0
			? sepettekiParolalar[sepettekiParolalar.length - 1].split(standrt ? '-' : aralklr)[1]
			: '';

	function yenidenUret() {
		direncAlertAlaniAcik = false;
		fotoAlertAlaniAcik = false;
		uretilenParola = parolaUret(secenekler);
	}
	async function sepeteKopyala() {
		const sepettekiSon =
			sepettekiParolalar.length == 0
				? uretilenParola
				: sepettekiParolalar[sepettekiParolalar.length - 1];

		if (sepettekiSon !== uretilenParola || sepettekiParolalar.length == 0) {
			sepettekiParolalar = [...sepettekiParolalar, uretilenParola];
		}

		clipboardaKopyala(sepettekiSon);
		toast.success(sepettekiSon, {
			description: 'panoya kopyalandı'
		});
	}

	async function fotoAlaniGoster() {
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
		const kalite = zxcvbn(sepettekiParolalar[sepettekiParolalar.length - 1]);
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

	async function clipboardaKopyala(parol: string) {
		await navigator.clipboard.writeText(parol);
	}

	function sepeteTiklama(p: string) {
		clipboardaKopyala(p);
		active = true;
		toast.success('panoya kopyalandı', {
			description: `${p}`
		});
	}

	function sepettenCikar(parol) {
		// Find the index of "parol" in sepettekiParolalar
		const index = sepettekiParolalar.indexOf(parol);
		// Remove it from the array
		if (index !== -1) {
			sepettekiParolalar = sepettekiParolalar.filter((p) => p !== parol);
		}
	}
</script>

{#if sepettekiParolalar.length > 0}
	<div id="basket">
		<ShoppingBasket size={22} class="end-45 absolute top-1 z-10 text-accent" />
		<ul>
			{#each sepettekiParolalar as parola}
				<li>
					<button on:click={() => sepeteTiklama(parola)} class="mt-2 pr-1 hover:text-accent">
						<ClipboardCopy size={20} />
					</button>
					{parola}
					<button on:click={() => sepettenCikar(parola)} class="pl-2 pt-1 hover:text-destructive">
						<Trash2 size={16} />
					</button>
				</li>
			{/each}
		</ul>
	</div>
{/if}
<div class="container mx-auto justify-center">
	<div class="satir font-mono">
		<input
			id="kelimeSayisi"
			class="text-weight-bold mr-1 max-w-12 rounded-lg bg-secondary px-2 py-2 text-center dark:bg-primary"
			type="number"
			max={5}
			min={2}
			bind:value={kelmSays}
		/>
		<span class="mx-1">kelimelik,</span>
		<Checkbox
			id="standartlar-checkbox"
			class="mx-1 bg-secondary dark:bg-primary"
			aria-label="standartlara uygun"
			bind:checked={standrt}
		/>
		<span>standart</span>
	</div>
	{#if !standrt}
		<div class="satir font-mono">
			aralarında
			<Input
				id="araliklar"
				class="mx-2 max-w-8 bg-secondary dark:bg-primary"
				type="text"
				bind:value={aralklr}
				maxlength={2}
			/>
			olan <br />
		</div>
	{/if}
	<h2 class="satir my-5">kolay ezberlenecek bir parola</h2>
	<div class="satir">
		<div id="parola-alan" aria-label="üretilen parola">
			{uretilenParola}
		</div>
	</div>
	<div class="anaDugmeler">
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Button id="yeniden-uret" size="lg" on:click={yenidenUret} aria-label="yeniden üret">
					<RefreshCw />
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Beğenemedin mi? Yenile</p>
			</Tooltip.Content>
		</Tooltip.Root>

		<Tooltip.Root>
			<Tooltip.Trigger>
				<Button size="lg" on:click={sepeteKopyala} aria-label="sepete kopyala">
					<img
						class="hidden dark:block dark:bg-primary"
						src="/img/reminder-blue.png"
						width="32"
						alt="Copy to clipboard"
					/>
					<img
						class="block dark:hidden dark:bg-primary"
						src="/img/reminder-orange.png"
						width="32"
						alt="Copy to clipboard"
					/>
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>Beğendiysen kopyala</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</div>
	{#if sepettekiParolalar.length > 0 && parolaOznesi !== undefined}
		<div class="satir b mb-4">
			<!-- foto -->
			<Tooltip.Root>
				<Tooltip.Trigger>
					<Button
						variant="outline"
						size="icon"
						on:click={fotoAlaniGoster}
						aria-label="Esinlenebileceğin Fotoğraf ara"
						class="mx-2"
					>
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
					<Button
						variant="outline"
						size="icon"
						on:click={direncAlaniGoster}
						aria-label="Direnç alanı göster"
						class="mx-2"
					>
						<Timer />
					</Button>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Direnç Kontrolü</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
	{/if}

	{#if fotoAlertAlaniAcik && parolaOznesi !== undefined}
		<div class="satir max-w-md" transition:fade={{ delay: 250, duration: 300 }}>
			<p class="mx-auto leading-7 [&:not(:first-child)]:mt-6">
				Şifreyi hatırlamak için <span class="font-bold">
					{parolaOznesi}
				</span> kelimesini çağrıştıracak bir fotoğraf bulabilirsiniz.
			</p>
			<a
				class="text-center"
				href="https://duckduckgo.com/?q={parolaOznesi}&t=newext&atb=v410-1&iax=images&ia=images"
				target="_blank"
				rel="noopener noreferrer"
				><Button variant="secondary">
					<ScanSearch class="mr-2 h-4 w-4" />
					{parolaOznesi} Ara
				</Button>
			</a>
		</div>
	{/if}

	{#if direncAlertAlaniAcik}
		<div class="mx-auto max-w-md" transition:fade={{ delay: 250, duration: 300 }}>
			<h4 class="mx-auto scroll-m-20 text-xl font-semibold tracking-tight">
				{sepettekiParolalar[sepettekiParolalar.length - 1]}
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
						<Table.Cell class="font-medium">Saniyede 10 milyon denemeyle (çevrimdışı)</Table.Cell>

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
					>Ezberlenecek parolanız: <span class="font-bold"
						>{sepettekiParolalar[sepettekiParolalar.length - 1]}</span
					> panoya kopyalandı</Alert.Description
				>
			</Alert.Root>
		</div>
	{/if}
</div>

<style>
	#basket {
		@apply absolute right-0 top-0 rounded-lg border md:w-1/3;
		@apply border-gray-200 text-right text-sm;
	}
	#basket > ul {
		@apply cursor-pointer font-bold text-secondary-foreground;
	}
	#basket > ul > li:first-child {
		@apply rounded-tl-lg;
	}
	#basket > ul > li {
		@apply border-b border-gray-200 bg-blue-50 px-4 py-2;
		@apply hover:bg-gray-100 hover:text-black;
		@apply focus:text-accent focus:outline-none focus:ring-2 focus:ring-accent;
	}
	#basket > ul li:last-child {
		@apply block w-full border-b border-gray-200 bg-primary px-4 py-2 text-primary-foreground;
		@apply rounded-bl-lg;
	}

	.satir {
		@apply mx-auto flex items-center justify-center  pt-4;
	}
	h2 {
		@apply text-lg font-semibold;
	}
	.anaDugmeler {
		@apply mx-auto my-8 flex max-w-60 justify-between;
	}
	.font-mono {
		font-family: 'Courier Prime', monospace;
		font-weight: 400;
		font-style: normal;
	}
	#parola-alan {
		@apply my-3 bg-primary p-2 text-center text-xl text-primary-foreground;
	}
</style>
