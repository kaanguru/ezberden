<script lang="ts">
	import { BrainCircuit, Youtube } from 'lucide-svelte';
</script>

<div class="mx-auto justify-center md:container">
	<div class="flex flex-col">
		<div>
			<div class="text-center text-lg font-semibold">
				Güvenli ve kullanımı kolay unutulmayan şifreler oluşturun
			</div>

			<p>
				İnsan beyni, karmaşık bir ağ sistemi gibi işlev görür. Bu ağda, her bir bilgi, diğer
				bilgilerle bağlantılıdır. Bir bilgiyi hatırlamak için beyin, o bilgiye bağlı diğer bilgilere
				de erişir. Bu nedenle, bilgileri birbirleriyle ilişkilendirerek hatırlamak daha kolaydır.
			</p>
			<p class="text-xl text-muted-foreground">
				Hayal ettiğimiz sıradışı hikayeler, bilgileri birbirleriyle ilişkilendirmenin etkili bir
				yoludur.
			</p>
			<p>
				Sıradışı hikayelerin işe yaramasının sebebi, beynimizin duygularla ve imgelerle yüklü
				bilgileri daha iyi hatırlamasıdır. Sıra dışı hikayeler, beynimizin dikkatini çeker ve
				duygusal bir tepki uyandırır. Bu da, bilgilerin daha güçlü bir şekilde kodlanmasını ve daha
				kolay hatırlanmasını sağlar.
			</p>

			<h2>
				<BrainCircuit class="h-23 w-23 mx-auto my-5 text-4xl font-bold" />
			</h2>
			<h2>Neden daha güvenli?</h2>
			<div class="ornek">
				<h4>Gergin-deniz-aslani-geliyor</h4>
				<img
					alt="Static Badge"
					src="https://img.shields.io/badge/G%C3%BC%C3%A7_Puan%C4%B1-5-green"
				/>
				<p>Kaba kuvvet (bruteforce) ve Sözlük saldırıları ile kırılması neredeyse imkânsızdır.</p>
				<img src="/img/kacan-deniz-aslani.webp" alt="Gergin-deniz-aslani-geliyor" />
				<small class="text-sm font-medium leading-none">
					Gergin-deniz-aslani-gidiyor Kırılması için gereken süre</small
				>
				<ul>
					<li>saatte 100 deneme: yüzyıllar</li>
					<li>saniyede 10 deneme: yüzyıllar</li>
					<li>saniyede 10 bin deneme: yüzyıllar</li>
					<li>saniyede 10 milyar deneme: yüzyıllar</li>
				</ul>
				<p>
					Sadece "gergin" bir "deniz aslanının" nasıl "gideceğini" hayal edin. Aklınıza ilk iki
					kullanımda yerleşecek.
				</p>
			</div>
			<h3>Sıradan Parola Örnekleri</h3>
			<div class="ornek">
				<h4>Galatasaray</h4>
				<img alt="Static Badge" src="https://img.shields.io/badge/G%C3%BC%C3%A7_Puan%C4%B1-1-red" />
				<p>
					Kırılmış şifre veritabanlarında en sık görülen şifreler: Tutulan takımlar , küfürler ve
					sevgili isimleri.
				</p>
				<p class="text-sm text-muted-foreground">
					Galatasaray Uyarı: Bu çok yaygın bir paroladır. Türkiye'deki erkeklerin tuttukları
					takımları parola olarak kullanma alışkanlığı vardır. Bu çok kötü bir fikirdir.
				</p>
			</div>
			<div class="ornek">
				<h4>G4l4t4s4r4y</h4>
				<img alt="Static Badge" src="https://img.shields.io/badge/G%C3%BC%C3%A7_Puan%C4%B1-2-red" />
				<p>A harfini 4 ile değiştirmeniz pek işe yaramıyor.</p>
				<img src="/img/g4l4t4s4r4y.webp" alt="g4l4t4s4r4y" />
				<p>
					Kırılması için gereken süre, şifrenizi kırmak için saldırganların ne kadar istekli
					olduklarına göre değişir.
				</p>

				<ul>
					<li>saatte 100 deneme: 8 gün</li>
					<li>saniyede 10 deneme: 34 dakika</li>
					<li>saniyede 10 bin deneme: 2 saniye</li>
					<li>saniyede 10 milyar deneme: bir saniyeden az</li>
				</ul>
			</div>
		</div>
		<div class="ornek">
			<h4>64l4t454r4y</h4>
			<img alt="Static Badge" src="https://img.shields.io/badge/G%C3%BC%C3%A7_Puan%C4%B1-2-red" />
			<p>daha fazla sayı koymanız sonucu değiştirmiyor.</p>
		</div>
		<div class="ornek">
			<h4>6Sc3ecnZ</h4>
			<img
				alt="Static Badge"
				src="https://img.shields.io/badge/G%C3%BC%C3%A7_Puan%C4%B1-3-yellow"
			/>
			<p>
				Eğer şifrenizin daha karışık olması için, bir şifre üretici kullanmanın iyi bir fikir
				olduğunu düşünüyorsunuz.
			</p>
			<small class="text-sm font-medium leading-none"
				>6Sc3ecnZ parolasının Kırılması için gereken süre</small
			>
			<ul>
				<li>saatte 100 deneme: yüzyıllar</li>
				<li>saniyede 10 deneme: 4 ay</li>
				<li>saniyede 10 bin deneme: 3 saat</li>
				<li>saniyede 10 milyar deneme: bir saniyeden az</li>
			</ul>
		</div>
		<div class="ornek">
			<h4>XPH7S@Vq</h4>
			<img
				alt="Static Badge"
				src="https://img.shields.io/badge/G%C3%BC%C3%A7_Puan%C4%B1-3-yellow"
			/>
			<p>
				Sadece kopyala yapıştır ile kullanabileceğiniz bir şifre. İnsan yazacak şifreler için çok
				karışık.
			</p>
			<small class="text-sm font-medium leading-none">XPH7S@Vq" Kırılması için gereken süre</small>
			<ul>
				<li>saatte 100 deneme: yüzyıllar</li>
				<li>saniyede 10 deneme: 4 ay</li>
				<li>saniyede 10 bin deneme: 3 saat</li>
				<li>saniyede 10 milyar deneme: bir saniyeden az</li>
			</ul>
		</div>
		<div>
			<p class="text-xl text-muted-foreground">
				Ezberlenen parolalar kullanım kolaylığı ve güvenliği yüksek olduğu için farklıdır.
			</p>
		</div>
	</div>
	<div class="bilgi">
		<h2>Konu ile ilgili kaynaklar</h2>

		<div class="flex flex-col lg:flex-row">
			<div class=" pr-2">
				<h3>Videolar</h3>
				<ul>
					<li class="text-primary">
						<Youtube />
						<a href="https://youtu.be/p7yN5vm0rK8" target="_blank" referrerpolicy="no-referrer"
							>How to Build Sherlock's Mind Palace? The Method of Loci
						</a>
					</li>
					<li>
						<Youtube />
						<a
							href="https://www.youtube.com/watch?v=yOgAbKJGrTA"
							target="_blank"
							referrerpolicy="no-referrer"
						>
							How memories form and how we lose them - Catharine Young
						</a>
					</li>
				</ul>
				<ul>
					<BrainCircuit />
					<li>İnsan beyni, bilgileri birbirleriyle ilişkilendirerek hatırlar.</li>
					<li>
						Hayal ettiğimiz sıradışı hikayeler, bilgileri birbirleriyle ilişkilendirmenin etkili bir
						yoludur.
					</li>
					<li>Sıradışı hikayeler, beynimizin dikkatini çeker ve duygusal bir tepki uyandırır.</li>
					<li>
						Bu da, bilgilerin daha güçlü bir şekilde kodlanmasını ve daha kolay hatırlanmasını
						sağlar.
					</li>
				</ul>
			</div>
			<div>
				<img src="/img/zihin-sarayi2.webp" alt="zihin sarayı" />
			</div>
		</div>
	</div>
</div>

<style>
	.ornek {
		@apply m-3 rounded-lg border-2 border-gray-200 p-2 shadow-lg;
	}
	ul {
		@apply my-6 ml-6 list-none [&>li]:mt-2;
		font-family: 'Courier Prime', monospace;
		font-weight: 400;
		font-style: normal;
	}
	li {
		@apply my-3;
	}
</style>
