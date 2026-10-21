export interface LingovelaQuestion {
	question: string;
	options: string[];
	answer: number;
	explanation: string;
}

export interface LingovelaChapter {
	id: string;
	title: string;
	subtitle: string;
	lesson: string[];
	examples: { spanish: string; indonesian: string }[];
	quiz: LingovelaQuestion[];
}

export interface LingovelaModule {
	id: string;
	title: string;
	description: string;
	icon: string;
	chapters: LingovelaChapter[];
}

export const lingovelaCurriculum: LingovelaModule[] = [
	{
		id: 'dasar',
		title: 'Salam & perkenalan',
		description: 'Mulai dari sapaan, bunyi bahasa Spanyol, sampai memperkenalkan diri.',
		icon: '👋',
		chapters: [
			{
				id: 'salam',
				title: 'Salam dan sapaan',
				subtitle: 'Buka percakapan dengan ramah.',
				lesson: [
					'Hola berarti “halo” dan bisa digunakan kapan saja. Untuk menyapa sesuai waktu, gunakan buenos días pada pagi hari, buenas tardes pada siang atau sore, dan buenas noches pada malam hari.',
					'Saat berpisah, puedes decir adiós atau hasta luego. Tambahkan por favor saat meminta sesuatu dan gracias untuk mengucapkan terima kasih.',
				],
				examples: [
					{ spanish: '¡Hola! ¿Qué tal?', indonesian: 'Halo! Apa kabar?' },
					{ spanish: '¡Buenos días! Hasta luego.', indonesian: 'Selamat pagi! Sampai nanti.' },
					{ spanish: 'Gracias. — De nada.', indonesian: 'Terima kasih. — Sama-sama.' },
				],
				quiz: [
					{ question: 'Sapaan apa yang umum digunakan pada pagi hari?', options: ['Buenas noches', 'Buenos días', 'Hasta luego'], answer: 1, explanation: 'Buenos días berarti “selamat pagi”.' },
					{ question: 'Apa arti hasta luego?', options: ['Sampai nanti', 'Selamat malam', 'Sama-sama'], answer: 0, explanation: 'Hasta luego adalah ungkapan untuk berpisah: “sampai nanti”.' },
					{ question: 'Bagaimana menjawab gracias dengan “sama-sama”?', options: ['Por favor', 'De nada', '¿Qué tal?'], answer: 1, explanation: 'De nada berarti “sama-sama”.' },
				],
			},
			{
				id: 'memperkenalkan-diri',
				title: 'Nama dan perkenalan',
				subtitle: 'Sebutkan nama dan kenalkan dirimu.',
				lesson: [
					'Untuk bertanya nama seseorang yang sebaya atau akrab, gunakan ¿Cómo te llamas? Jawab dengan Me llamo… atau Soy… lalu sebutkan namamu.',
					'Saat berkenalan, Mucho gusto cocok digunakan siapa saja. Encantado biasanya diucapkan laki-laki; Encantada biasanya diucapkan perempuan.',
					'Kata kerja ser berarti “adalah”. Bentuk soy dipakai untuk yo (saya), eres untuk tú (kamu), dan es untuk él, ella, atau usted.',
				],
				examples: [
					{ spanish: '¿Cómo te llamas? — Me llamo Ana.', indonesian: 'Siapa namamu? — Nama saya Ana.' },
					{ spanish: 'Soy Diego. Mucho gusto.', indonesian: 'Saya Diego. Senang berkenalan.' },
					{ spanish: 'Yo soy Elena. / Soy Elena.', indonesian: 'Saya Elena. Kata yo (saya) boleh tidak disebut.' },
				],
				quiz: [
					{ question: 'Kalimat apa yang digunakan untuk bertanya “Siapa namamu?” kepada teman?', options: ['¿Dónde vives?', '¿Cómo te llamas?', '¿Cuántos años tienes?'], answer: 1, explanation: '¿Cómo te llamas? menanyakan nama seseorang secara akrab.' },
					{ question: 'Lengkapi: Yo ___ estudiante.', options: ['eres', 'es', 'soy'], answer: 2, explanation: 'Soy adalah bentuk ser yang dipasangkan dengan yo.' },
					{ question: 'Apa yang benar tentang subjek yo dalam “Soy Elena”?', options: ['Harus selalu ditulis', 'Bisa dihilangkan karena soy sudah memberi petunjuk subjek', 'Artinya berubah jika dihilangkan'], answer: 1, explanation: 'Subjek sering tidak perlu disebut karena bentuk kata kerjanya sudah memberi petunjuk.' },
				],
			},
			{
				id: 'alfabet',
				title: 'Alfabet dan bunyi',
				subtitle: 'Kenali huruf yang khas dan cara membacanya.',
				lesson: [
					'Alfabet Spanyol menggunakan huruf Latin seperti bahasa Indonesia. Ada satu huruf khas, ñ, yang berbeda dari n dan muncul dalam kata seperti España.',
					'Bunyi c dan g dapat berubah mengikuti huruf sesudahnya, dan pengucapan beberapa huruf juga berbeda menurut wilayah. Dengarkan contoh dari penutur setempat saat berlatih.',
				'Tanda aksen seperti á atau é menunjukkan tekanan pada suku kata tertentu. Tanda ini juga dapat membedakan arti atau bentuk kata, jadi tuliskan saat diperlukan.',
				],
				examples: [
					{ spanish: 'España · español · mañana', indonesian: 'Spanyol · bahasa Spanyol · besok/pagi' },
					{ spanish: 'niño / niña', indonesian: 'anak laki-laki / anak perempuan' },
					{ spanish: '¿Cómo? · ¿Qué?', indonesian: 'Bagaimana? · Apa?' },
				],
				quiz: [
					{ question: 'Huruf khas Spanyol mana yang terdengar berbeda dari n?', options: ['ñ', 'll', 'rr'], answer: 0, explanation: 'Ñ adalah huruf tersendiri yang disebut eñe.' },
					{ question: 'Dalam kata España, huruf ñ tidak boleh diganti dengan…', options: ['e', 'n', 's'], answer: 1, explanation: 'España ditulis dengan ñ; menggantinya menjadi n mengubah ejaan dan bunyi.' },
					{ question: 'Apa fungsi tanda aksen seperti á pada sebuah kata?', options: ['Menandai tekanan atau membedakan bentuk kata', 'Menandai bahwa kata itu selalu jamak', 'Menggantikan huruf h'], answer: 0, explanation: 'Tanda aksen membantu menunjukkan tekanan dan kadang membedakan bentuk kata.' },
				],
			},
			{
				id: 'angka-usia',
				title: 'Angka dan usia',
				subtitle: 'Hitung sederhana dan ceritakan umurmu.',
				lesson: [
					'Beberapa angka dasar: cero (0), uno (1), dos (2), tres (3), cuatro (4), cinco (5), diez (10), quince (15), veinte (20), dan cien (100).',
				'Banyak angka 21 sampai 29 ditulis sebagai satu kata, seperti veintidós. Untuk angka lain seperti 32, gabungkan puluhan dan satuan: treinta y dos.',
					'Bahasa Spanyol memakai kata kerja tener (“memiliki”) untuk menyebut usia. Pertanyaannya ¿Cuántos años tienes? dijawab Tengo … años.',
				],
				examples: [
					{ spanish: '¿Cuántos años tienes? — Tengo veinte años.', indonesian: 'Berapa umurmu? — Umur saya dua puluh tahun.' },
					{ spanish: 'treinta y dos', indonesian: 'tiga puluh dua (32)' },
					{ spanish: 'Yo tengo dieciocho años.', indonesian: 'Umur saya delapan belas tahun.' },
				],
				quiz: [
					{ question: 'Bagaimana mengatakan angka 15 dalam bahasa Spanyol?', options: ['Cinco', 'Quince', 'Cincuenta'], answer: 1, explanation: 'Quince berarti lima belas.' },
					{ question: 'Apa arti treinta y dos?', options: ['Dua puluh tiga', 'Tiga puluh dua', 'Tiga belas'], answer: 1, explanation: 'Treinta adalah tiga puluh dan dos adalah dua.' },
					{ question: 'Lengkapi untuk menyebut umur: Tengo veinte ___ .', options: ['días', 'años', 'nombres'], answer: 1, explanation: 'Años berarti tahun; umur dinyatakan dengan tener años.' },
				],
			},
		],
	},
	{
		id: 'mengenal-orang',
		title: 'Mengenal diri & orang lain',
		description: 'Bertanya tentang asal, keluarga, pekerjaan, dan ciri seseorang.',
		icon: '🧑‍🤝‍🧑',
		chapters: [
			{
				id: 'asal-negara',
				title: 'Asal dan kebangsaan',
				subtitle: 'Ceritakan dari mana kamu berasal.',
				lesson: [
					'Tanyakan asal dengan ¿De dónde eres? Jawab menggunakan Soy de… diikuti nama tempat. Kata ser juga dipakai untuk menyebut kebangsaan.',
					'Banyak kata sifat kebangsaan menyesuaikan gender dan jumlah. Contohnya español/española (Spanyol), mexicano/mexicana (Meksiko), dan mexicanos/mexicanas (jamak). Nama kebangsaan ditulis dengan huruf kecil dalam bahasa Spanyol.',
					'Perhatikan variasi daerah: nama tempat dan pilihan kosakata dapat berbeda di berbagai negara berbahasa Spanyol.',
				],
				examples: [
					{ spanish: '¿De dónde eres? — Soy de Indonesia.', indonesian: 'Kamu berasal dari mana? — Saya dari Indonesia.' },
					{ spanish: 'Soy español. / Soy española.', indonesian: 'Saya orang Spanyol. (bentuk laki-laki / perempuan)' },
					{ spanish: '¿Y tú?', indonesian: 'Kalau kamu?' },
				],
				quiz: [
					{ question: 'Apa arti ¿De dónde eres?', options: ['Kamu tinggal dengan siapa?', 'Kamu berasal dari mana?', 'Kamu bekerja di mana?'], answer: 1, explanation: 'Pertanyaan ini menanyakan asal seseorang.' },
					{ question: 'Lengkapi: Soy ___ Indonesia.', options: ['de', 'en', 'a'], answer: 0, explanation: 'Soy de Indonesia berarti “Saya dari Indonesia”.' },
					{ question: 'Pasangan bentuk kata sifat yang sesuai untuk laki-laki lalu perempuan adalah…', options: ['mexicana / mexicano', 'mexicano / mexicana', 'mexicanos / mexicano'], answer: 1, explanation: 'Bentuk umum menyesuaikan gender: mexicano dan mexicana.' },
				],
			},
			{
				id: 'pekerjaan',
				title: 'Pekerjaan dan tempat kerja',
				subtitle: 'Tanyakan pekerjaan dengan sopan.',
				lesson: [
					'¿A qué te dedicas? atau ¿Cuál es tu profesión? dapat digunakan untuk menanyakan pekerjaan. Dalam percakapan sederhana, seseorang bisa menjawab Soy profesor/a.',
					'Kata kerja trabajar berarti bekerja. Bentuknya berubah sesuai subjek: trabajo (saya bekerja), trabajas (kamu bekerja), trabaja (dia bekerja).',
					'Kata benda dalam bahasa Spanyol memiliki gender gramatikal. Artikel un dan una sering berarti “seorang/sebuah”; gunakan bentuk yang cocok dengan kata benda.',
				],
				examples: [
					{ spanish: '¿A qué te dedicas? — Soy profesora.', indonesian: 'Apa pekerjaanmu? — Saya seorang guru.' },
					{ spanish: 'Trabajo en una escuela.', indonesian: 'Saya bekerja di sebuah sekolah.' },
					{ spanish: 'un médico · una médica', indonesian: 'seorang dokter laki-laki · seorang dokter perempuan' },
				],
				quiz: [
					{ question: 'Apa arti trabajar?', options: ['Belajar', 'Bekerja', 'Tinggal'], answer: 1, explanation: 'Trabajar berarti bekerja.' },
					{ question: 'Bentuk trabajar untuk yo (saya) adalah…', options: ['trabajo', 'trabajas', 'trabajan'], answer: 0, explanation: 'Yo trabajo berarti “saya bekerja”.' },
					{ question: 'Pilih frasa yang berarti “seorang guru perempuan”.', options: ['un profesor', 'una profesora', 'unos profesora'], answer: 1, explanation: 'Una adalah artikel feminin tunggal dan profesora adalah bentuk feminin.' },
				],
			},
			{
				id: 'keluarga',
				title: 'Keluarga dan kepunyaan',
				subtitle: 'Sebutkan anggota keluarga dan hubungan mereka.',
				lesson: [
					'Kosakata keluarga dasar: madre (ibu), padre (ayah), hermana (saudara perempuan), hermano (saudara laki-laki), abuelo (kakek), dan abuela (nenek).',
					'Kata kepunyaan mi berarti “-ku”, tu berarti “-mu”, dan su dapat berarti “-nya” atau “milik Anda”. Kata ini diletakkan sebelum benda.',
					'Untuk menyebut keluarga, gunakan frasa singkat seperti Mi familia es grande (“Keluarga saya besar”).',
				],
				examples: [
					{ spanish: 'Mi madre y mi padre', indonesian: 'Ibu dan ayah saya' },
					{ spanish: '¿Tienes hermanos?', indonesian: 'Apakah kamu punya saudara?' },
					{ spanish: 'Su abuela vive aquí.', indonesian: 'Neneknya tinggal di sini.' },
				],
				quiz: [
					{ question: 'Apa arti hermana?', options: ['Saudara perempuan', 'Saudara laki-laki', 'Nenek'], answer: 0, explanation: 'Hermana berarti saudara perempuan.' },
					{ question: 'Kata mana yang berarti “ibuku”?', options: ['tu madre', 'mi madre', 'su madre'], answer: 1, explanation: 'Mi berarti milik saya, sehingga mi madre berarti ibu saya.' },
					{ question: 'Abuelo berarti…', options: ['Ayah', 'Kakek', 'Paman'], answer: 1, explanation: 'Abuelo berarti kakek.' },
				],
			},
			{
				id: 'deskripsi',
				title: 'Mendeskripsikan orang',
				subtitle: 'Ceritakan ciri fisik dan sifat secara sederhana.',
				lesson: [
					'Gunakan ser untuk ciri atau sifat yang relatif tetap, seperti alto/a (tinggi), bajo/a (pendek), amable (ramah), dan simpático/a (menyenangkan).',
					'Tener digunakan untuk beberapa ciri yang “dimiliki”, misalnya tener el pelo largo (“berambut panjang”). Llevar dapat digunakan untuk sesuatu yang dikenakan, seperti lleva gafas (“memakai kacamata”).',
					'Kata sifat biasanya menyesuaikan gender dan jumlah kata benda yang dijelaskan. Hindari menilai orang dari ciri fisik; gunakan kosakata ini dengan hormat.',
				],
				examples: [
					{ spanish: 'Ella es alta y amable.', indonesian: 'Dia tinggi dan ramah.' },
					{ spanish: 'Tiene el pelo corto.', indonesian: 'Dia berambut pendek.' },
					{ spanish: 'Lleva gafas.', indonesian: 'Dia memakai kacamata.' },
				],
				quiz: [
					{ question: 'Kata kerja apa yang cocok untuk menyatakan “Dia ramah”?', options: ['ser', 'tener', 'vivir'], answer: 0, explanation: 'Ser digunakan untuk menyatakan ciri atau sifat.' },
					{ question: 'Apa arti Tiene el pelo largo?', options: ['Dia berambut panjang', 'Dia bertubuh tinggi', 'Dia memakai kacamata'], answer: 0, explanation: 'Tiene el pelo largo berarti dia memiliki rambut panjang.' },
					{ question: 'Lleva gafas berarti…', options: ['Dia membeli kacamata', 'Dia memakai kacamata', 'Dia melihat kacamata'], answer: 1, explanation: 'Llevar dapat digunakan untuk menyatakan sesuatu yang dikenakan.' },
				],
			},
		],
	},
	{
		id: 'sehari-hari',
		title: 'Bahasa Spanyol sehari-hari',
		description: 'Gunakan bahasa Spanyol untuk waktu, rumah, makanan, belanja, dan arah.',
		icon: '🧭',
		chapters: [
			{
				id: 'hari-waktu',
				title: 'Hari, tanggal, dan waktu',
				subtitle: 'Bicarakan hari ini dan tanyakan jam.',
				lesson: [
					'Hari dalam seminggu: lunes, martes, miércoles, jueves, viernes, sábado, domingo. Nama hari dan bulan ditulis dengan huruf kecil.',
					'¿Qué día es hoy? menanyakan hari. Untuk jam satu gunakan Es la una; untuk jam-jam lain gunakan Son las…',
					'Tambahkan y cuarto untuk lewat seperempat, y media untuk lewat setengah, dan menos cuarto untuk kurang seperempat.',
				],
				examples: [
					{ spanish: 'Hoy es lunes.', indonesian: 'Hari ini hari Senin.' },
					{ spanish: '¿Qué hora es? — Son las dos.', indonesian: 'Jam berapa? — Jam dua.' },
					{ spanish: 'Es la una y media.', indonesian: 'Jam setengah dua.' },
				],
				quiz: [
					{ question: 'Hari apa itu miércoles?', options: ['Rabu', 'Jumat', 'Minggu'], answer: 0, explanation: 'Miércoles berarti hari Rabu.' },
					{ question: 'Bentuk yang tepat untuk menyebut jam satu adalah…', options: ['Son las una', 'Es la una', 'Es las dos'], answer: 1, explanation: 'Jam satu menggunakan bentuk tunggal Es la una.' },
					{ question: 'Apa arti y media saat menyebut waktu?', options: ['Lewat seperempat', 'Kurang seperempat', 'Lewat setengah'], answer: 2, explanation: 'Y media berarti lewat setengah.' },
				],
			},
			{
				id: 'kata-kerja-rutin',
				title: 'Kegiatan sehari-hari',
				subtitle: 'Kenali pola kata kerja beraturan.',
				lesson: [
					'Kata kerja dasar biasanya berakhiran -ar, -er, atau -ir, seperti hablar (berbicara), comer (makan), dan vivir (tinggal).',
					'Untuk kata kerja beraturan, akhiran berubah mengikuti subjek. Contohnya yo hablo, tú hablas, ella habla; yo como, tú comes, ella come.',
					'Untuk mengatakan di mana kamu tinggal, gunakan vivir: Vivo en Yakarta. Dalam bahasa Spanyol subjek yo sering tidak disebut karena bentuk vivo sudah menunjukkan “saya”.',
				],
				examples: [
					{ spanish: 'Yo estudio español. / Estudio español.', indonesian: 'Saya belajar bahasa Spanyol.' },
					{ spanish: 'Tú comes temprano.', indonesian: 'Kamu makan lebih awal.' },
					{ spanish: 'Vivo en Bandung.', indonesian: 'Saya tinggal di Bandung.' },
				],
				quiz: [
					{ question: 'Apa akhiran kata kerja infinitif dalam hablar?', options: ['-ar', '-er', '-ir'], answer: 0, explanation: 'Hablar berakhiran -ar.' },
					{ question: 'Pilih bentuk comer untuk tú (kamu).', options: ['como', 'comes', 'comen'], answer: 1, explanation: 'Bentuknya adalah tú comes.' },
					{ question: 'Apa arti Vivo en Bandung?', options: ['Saya pergi ke Bandung', 'Saya tinggal di Bandung', 'Saya belajar di Bandung'], answer: 1, explanation: 'Vivo adalah bentuk yo dari vivir, “tinggal”.' },
				],
			},
			{
				id: 'rumah-dan-tempat',
				title: 'Rumah dan tempat',
				subtitle: 'Sebutkan lokasi dan benda di sekitarmu.',
				lesson: [
					'Kosakata rumah dasar: casa (rumah), habitación (kamar), cocina (dapur), baño (kamar mandi), dan mesa (meja).',
					'Estar digunakan untuk menyatakan lokasi atau keadaan. Hay berarti “ada/terdapat” dan tidak berubah untuk satu atau banyak benda.',
					'Kata depan seperti en (di), encima de (di atas), dan debajo de (di bawah) membantu menjelaskan posisi benda.',
				],
				examples: [
					{ spanish: 'La mesa está en la cocina.', indonesian: 'Meja itu berada di dapur.' },
					{ spanish: 'Hay dos sillas en la habitación.', indonesian: 'Ada dua kursi di kamar.' },
					{ spanish: 'El libro está encima de la mesa.', indonesian: 'Buku itu berada di atas meja.' },
				],
				quiz: [
					{ question: 'Ungkapan apa yang berarti “ada/terdapat”?', options: ['Hay', 'Soy', 'Tengo'], answer: 0, explanation: 'Hay berarti ada atau terdapat.' },
					{ question: 'Kata kerja apa yang umum digunakan untuk menyatakan lokasi benda?', options: ['ser', 'estar', 'llamarse'], answer: 1, explanation: 'Estar digunakan untuk menyatakan lokasi.' },
					{ question: 'Apa arti debajo de la mesa?', options: ['Di atas meja', 'Di samping meja', 'Di bawah meja'], answer: 2, explanation: 'Debajo de berarti di bawah.' },
				],
			},
			{
				id: 'makanan-dan-restoran',
				title: 'Makanan dan restoran',
				subtitle: 'Pesan makanan dengan ungkapan sederhana.',
				lesson: [
					'Beberapa kata dasar: agua (air), pan (roti), arroz (nasi), café (kopi), dan fruta (buah). Nama makanan dapat berbeda antarwilayah.',
					'Gunakan Quisiera… (“Saya ingin…”) atau …, por favor untuk memesan dengan sopan. Tambahkan gracias untuk berterima kasih.',
					'Untuk menyatakan suka, gunakan me gusta diikuti satu hal atau kata kerja. Untuk hal jamak, gunakan me gustan.',
				],
				examples: [
					{ spanish: 'Un café, por favor.', indonesian: 'Satu kopi, tolong.' },
					{ spanish: 'Quisiera agua, por favor.', indonesian: 'Saya ingin air, tolong.' },
					{ spanish: 'Me gusta el arroz.', indonesian: 'Saya suka nasi.' },
				],
				quiz: [
					{ question: 'Apa arti pan?', options: ['Air', 'Roti', 'Kopi'], answer: 1, explanation: 'Pan berarti roti.' },
					{ question: 'Ungkapan mana yang sopan untuk memesan?', options: ['Quisiera agua, por favor.', 'Soy agua.', 'Vivo agua.'], answer: 0, explanation: 'Quisiera… por favor adalah cara sopan untuk memesan.' },
					{ question: 'Lengkapi: Me ___ el café. (Saya suka kopi.)', options: ['llama', 'gusta', 'vivo'], answer: 1, explanation: 'Me gusta digunakan untuk menyatakan suka pada satu benda.' },
				],
			},
			{
				id: 'belanja-dan-arah',
				title: 'Belanja dan mencari arah',
				subtitle: 'Tanyakan harga, lokasi, dan jalan.',
				lesson: [
					'¿Cuánto cuesta? berarti “Berapa harganya?” Saat membeli, este/esta berarti “ini” untuk kata benda maskulin/feminin; ese/esa berarti “itu”.',
					'Untuk menanyakan lokasi, gunakan ¿Dónde está…? Untuk memberi arah, belok kiri adalah gira a la izquierda dan belok kanan adalah gira a la derecha.',
					'Nama mata uang dan istilah perjalanan berbeda di setiap negara. Saat bepergian, tanyakan mata uang setempat dan pastikan informasi harga dipahami.',
				],
				examples: [
					{ spanish: '¿Cuánto cuesta este libro?', indonesian: 'Berapa harga buku ini?' },
					{ spanish: '¿Dónde está la estación?', indonesian: 'Di mana stasiunnya?' },
					{ spanish: 'Gira a la derecha.', indonesian: 'Belok ke kanan.' },
				],
				quiz: [
					{ question: 'Bagaimana menanyakan “Berapa harganya?”', options: ['¿Qué hora es?', '¿Cuánto cuesta?', '¿De dónde eres?'], answer: 1, explanation: '¿Cuánto cuesta? menanyakan harga.' },
					{ question: 'Apa arti gira a la izquierda?', options: ['Belok ke kiri', 'Belok ke kanan', 'Jalan lurus'], answer: 0, explanation: 'A la izquierda berarti ke kiri.' },
					{ question: 'Pilih frasa untuk bertanya “Di mana stasiunnya?”', options: ['¿Cuántos años tienes?', '¿Dónde está la estación?', '¿Cómo te llamas?'], answer: 1, explanation: '¿Dónde está…? menanyakan lokasi.' },
				],
			},
		],
	},
];

export const lingovelaChapterIds = lingovelaCurriculum.flatMap((module) => module.chapters.map((chapter) => chapter.id));
