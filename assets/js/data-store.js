/**
 * MutilStore - Client-side Reactive State Store for Mutiara Ilmu Static Demo
 * Powered by localStorage with automatic fallback to sample data
 */
(function() {
    const STORAGE_KEY = 'mutil_static_state_v1';

    const DEFAULT_DATA = {
        currentRole: 'siswa', // 'siswa', 'pembina', 'admin'
        activeEkskulId: '1', // Pembina aktif untuk ART MEDIA
        currentUser: {
            id: 'usr_1',
            username: 'fadhil_siswa',
            nama_lengkap: 'Muhammad Fadhil Al-Ghifari',
            nis: '22231001',
            kelas: 'XII RPL 1',
            jenis_kelamin: 'Laki-Laki',
            alamat: 'Jl. Perintis Kemerdekaan KM 9, Makassar',
            email: 'fadhil@siswa.mutil.sch.id',
            no_hp: '081234567890',
            foto: 'assets/images/blankuser.jpg',
            pendaftaran: {
                ekskul_1: '1', // ART MEDIA
                status_1: 'diterima',
                alasan_1: 'Tertarik mendalami desain visual grafis, videografi, dan editing konten kreatif sekolah.',
                ekskul_2: '3', // FUTSAL
                status_2: 'pending',
                alasan_2: 'Ingin menjaga kebugaran jasmani dan berkompetisi di turnamen futsal antar sekolah.'
            }
        },
        ekskuls: [
            {
                id: '1',
                nama_ekskul: 'ART MEDIA',
                pembina: 'Budi Santoso, S.Kom',
                status: 'aktif',
                kuota: 30,
                link_group: 'https://chat.whatsapp.com/demo-artmedia-2026',
                hari: 'Hari Rabu, Pukul 16:00 WITA',
                visi: 'Menjadi wadah kreatif yang mendukung siswa SMK dalam mengembangkan potensi seni media melalui inovasi dan teknologi.',
                misi: 'Mendorong kreativitas siswa dalam menghasilkan karya seni media yang orisinal dan inovatif.',
                gambar: 'images/artmedia.jpg'
            },
            {
                id: '2',
                nama_ekskul: 'ENGLISH CLUB (EMAIL)',
                pembina: 'Sarah Putri, S.Pd',
                status: 'aktif',
                kuota: 30,
                link_group: 'https://chat.whatsapp.com/demo-email-club',
                hari: 'Selasa dan Rabu, Pukul 16:00 WITA',
                visi: 'Menciptakan lingkungan berbahasa Inggris yang interaktif dan mengembangkan keterampilan berbahasa internasional siswa.',
                misi: 'Memfasilitasi pembelajaran bahasa Inggris melalui kegiatan menarik seperti Storytelling, Speech, dan English Area.',
                gambar: 'images/Email.png'
            },
            {
                id: '3',
                nama_ekskul: 'FUTSAL',
                pembina: 'Ahmad Hidayat, S.Pd',
                status: 'aktif',
                kuota: 35,
                link_group: 'https://chat.whatsapp.com/demo-futsal-mutil',
                hari: 'Kamis & Sabtu, Pukul 15:30 WITA',
                visi: 'Membentuk tim futsal yang tangguh, sportif, dan mampu berprestasi di tingkat regional maupun nasional.',
                misi: 'Melatih kemampuan fisik, teknik dasar, dan kekompakan tim dalam kejuaraan.',
                gambar: 'images/futsal.jpg'
            },
            {
                id: '4',
                nama_ekskul: 'PASKIBRA',
                pembina: 'Hendra Wijaya, S.Pd',
                status: 'aktif',
                kuota: 30,
                link_group: 'https://chat.whatsapp.com/demo-paskibra-mutil',
                hari: 'Senin & Kamis, Pukul 15:30 WITA',
                visi: 'Menjadi pasukan pengibar bendera yang disiplin, patriotik, dan menjunjung tinggi nilai-nilai nasionalisme.',
                misi: 'Membina kedisiplinan baris-berbaris dan rasa cinta tanah air.',
                gambar: 'images/paskib.jpg'
            },
            {
                id: '5',
                nama_ekskul: 'PMR',
                pembina: 'Siti Rahmawati, S.Tr.Kes',
                status: 'aktif',
                kuota: 40,
                link_group: 'https://chat.whatsapp.com/demo-pmr-mutil',
                hari: 'Jumat, Pukul 14:00 WITA',
                visi: 'Menjadi generasi muda yang peduli, tanggap, dan berperan aktif dalam memberikan pertolongan pertama serta meningkatkan kesehatan masyarakat.',
                misi: 'Melatih tanggap darurat medis dasar dan kepedulian sosial.',
                gambar: 'images/pmr.png'
            },
            {
                id: '6',
                nama_ekskul: 'PRAMUKA',
                pembina: 'Ridwan Kamil, S.Pd',
                status: 'aktif',
                kuota: 50,
                link_group: 'https://chat.whatsapp.com/demo-pramuka-mutil',
                hari: 'Sabtu, Pukul 08:00 WITA',
                visi: 'Membentuk generasi muda yang berkarakter, mandiri, peduli, dan bertanggung jawab sesuai kode kehormatan Pramuka.',
                misi: 'Mengembangkan kemandirian kepanduan dan ketangkasan alam terbuka.',
                gambar: 'images/pramuka.jpg'
            },
            {
                id: '7',
                nama_ekskul: 'SANGGAR SENI',
                pembina: 'Nurul Aini, S.Sn',
                status: 'aktif',
                kuota: 25,
                link_group: 'https://chat.whatsapp.com/demo-sanggar-seni',
                hari: 'Rabu & Jumat, Pukul 15:30 WITA',
                visi: 'Menjadi pusat pengembangan dan pelestarian seni yang menghubungkan budaya, inovatif, kreatif, yang berkelanjutan.',
                misi: 'Melestarikan tarian tradisional, musik etnik daerah, dan seni teater.',
                gambar: 'images/sanggar.jpg'
            },
            {
                id: '8',
                nama_ekskul: 'TAKRAW',
                pembina: 'Ilham Pratama, S.Pd',
                status: 'nonaktif',
                kuota: 20,
                link_group: 'https://chat.whatsapp.com/demo-takraw-mutil',
                hari: 'Selasa & Kamis, Pukul 16:00 WITA',
                visi: 'Mengembangkan bakat dan prestasi dalam olahraga sepak takraw serta melestarikan olahraga tradisional Indonesia.',
                misi: 'Melatih teknik smash, block, dan servik takraw profesional.',
                gambar: 'images/takraw.png'
            },
            {
                id: '9',
                nama_ekskul: 'ROHIS IKHWAN',
                pembina: 'Ust. Syahrul, S.Pd.I',
                status: 'aktif',
                kuota: 40,
                link_group: 'https://chat.whatsapp.com/demo-rohis-ikhwan',
                hari: 'Jumat, Pukul 13:00 WITA',
                visi: 'Membina aqidah yang lurus dan akhlakul karimah di kalangan siswa ikhwan.',
                misi: 'Mengadakan kajian keislaman dan tadabbur Qur\'an.',
                gambar: 'images/blob.png'
            },
            {
                id: '10',
                nama_ekskul: 'ROHIS AKHWAT',
                pembina: 'Usth. Fatimah, S.Pd.I',
                status: 'aktif',
                kuota: 40,
                link_group: 'https://chat.whatsapp.com/demo-rohis-akhwat',
                hari: 'Jumat, Pukul 13:00 WITA',
                visi: 'Menjadi wadah pembinaan muslimah yang cerdas dan istiqamah.',
                misi: 'Membekali keterampilan fiqih wanita dan mentoring keputrian.',
                gambar: 'images/blob.png'
            },
            {
                id: '11',
                nama_ekskul: 'ROHKRIS',
                pembina: 'Daniel Manurung, S.Th',
                status: 'aktif',
                kuota: 25,
                link_group: 'https://chat.whatsapp.com/demo-rohkris',
                hari: 'Jumat, Pukul 12:00 WITA',
                visi: 'Membangun persekutuan siswa Kristen yang teguh dalam iman dan kasih.',
                misi: 'Ibadah rutin dan kegiatan sosial kemanusiaan.',
                gambar: 'images/blob.png'
            },
            {
                id: '12',
                nama_ekskul: 'EKSIS MI',
                pembina: 'Dian Maharani, S.Sos',
                status: 'aktif',
                kuota: 25,
                link_group: 'https://chat.whatsapp.com/demo-eksis-mi',
                hari: 'Selasa & Rabu, Pukul 16:00 WITA',
                visi: 'Menjadi wadah menuangkan pemikiran serta berekspresi dalam literasi dan jurnalistik.',
                misi: 'Melatih kemampuan content creator, jurnalisme sekolah, dan kepenulisan kreatif.',
                gambar: 'images/Eksis MI.jpg'
            }
        ],
        admins: [
            { id: '1', username: 'admin_artmedia', email: 'artmedia@mutiarailmu.sch.id', id_ekskul: '1', nama_ekskul: 'ART MEDIA' },
            { id: '2', username: 'admin_futsal', email: 'futsal@mutiarailmu.sch.id', id_ekskul: '3', nama_ekskul: 'FUTSAL' },
            { id: '3', username: 'admin_pmr', email: 'pmr@mutiarailmu.sch.id', id_ekskul: '5', nama_ekskul: 'PMR' },
            { id: '4', username: 'admin_paskib', email: 'paskibra@mutiarailmu.sch.id', id_ekskul: '4', nama_ekskul: 'PASKIBRA' },
            { id: '5', username: 'admin_pramuka', email: 'pramuka@mutiarailmu.sch.id', id_ekskul: '6', nama_ekskul: 'PRAMUKA' },
            { id: '6', username: 'admin_sanggar', email: 'sanggar@mutiarailmu.sch.id', id_ekskul: '7', nama_ekskul: 'SANGGAR SENI' },
            { id: '7', username: 'admin_email', email: 'english@mutiarailmu.sch.id', id_ekskul: '2', nama_ekskul: 'ENGLISH CLUB (EMAIL)' },
            { id: '8', username: 'admin_eksis', email: 'eksis@mutiarailmu.sch.id', id_ekskul: '12', nama_ekskul: 'EKSIS MI' }
        ],
        pendaftar: [
            {
                id: 'pen_1',
                id_ekskul: '1', // ART MEDIA
                id_user: 'usr_1',
                nama_lengkap: 'Muhammad Fadhil Al-Ghifari',
                nis: '22231001',
                kelas: 'XII RPL 1',
                jenis_kelamin: 'Laki-Laki',
                alamat: 'Jl. Perintis Kemerdekaan KM 9, Makassar',
                no_hp: '081234567890',
                foto: 'assets/images/blankuser.jpg',
                alasan: 'Tertarik mendalami desain visual grafis, videografi, dan editing konten kreatif sekolah.',
                status: 'diterima',
                pilihan_ke: 1
            },
            {
                id: 'pen_2',
                id_ekskul: '1', // ART MEDIA
                id_user: 'usr_2',
                nama_lengkap: 'Siti Nurhaliza Putri',
                nis: '22231002',
                kelas: 'XI TKJ 2',
                jenis_kelamin: 'Perempuan',
                alamat: 'Jl. Urip Sumoharjo No. 45, Makassar',
                no_hp: '085244112233',
                foto: 'assets/images/siswa/68286c52c5854_20250417_095546.jpg',
                alasan: 'Ingin belajar fotografi untuk dokumentasi kegiatan jurusan dan media promosi.',
                status: 'pending',
                pilihan_ke: 1
            },
            {
                id: 'pen_3',
                id_ekskul: '1', // ART MEDIA
                id_user: 'usr_3',
                nama_lengkap: 'Andi Pratama Kusuma',
                nis: '22231003',
                kelas: 'X RPL 2',
                jenis_kelamin: 'Laki-Laki',
                alamat: 'Jl. Sultan Alauddin No. 12, Makassar',
                no_hp: '087811998877',
                foto: 'assets/images/blankuser.jpg',
                alasan: 'Memiliki minat di animasi 2D/3D dan pembuatan asset game digital.',
                status: 'pending',
                pilihan_ke: 2
            },
            {
                id: 'pen_4',
                id_ekskul: '1', // ART MEDIA
                id_user: 'usr_4',
                nama_lengkap: 'Rahmat Hidayatullah',
                nis: '22231004',
                kelas: 'XII TKJ 1',
                jenis_kelamin: 'Laki-Laki',
                alamat: 'Jl. Daya Raya Blok B No. 3, Makassar',
                no_hp: '081377889900',
                foto: 'assets/images/blankuser.jpg',
                alasan: 'Tidak dapat mengikuti jadwal rutin hari Rabu karena bentrok praktikum.',
                status: 'ditolak',
                pilihan_ke: 1
            },
            {
                id: 'pen_5',
                id_ekskul: '1', // ART MEDIA
                id_user: 'usr_5',
                nama_lengkap: 'Dewi Lestari Ayu',
                nis: '22231005',
                kelas: 'XI MM 1',
                jenis_kelamin: 'Perempuan',
                alamat: 'Jl. Tamalanrea Indah No. 8, Makassar',
                no_hp: '089612345678',
                foto: 'assets/images/siswa/68286c52c5854_20250417_095546.jpg',
                alasan: 'Ingin berprestasi di lomba videografi dokumenter tingkat SMK se-Sulawesi.',
                status: 'diterima',
                pilihan_ke: 1
            },
            {
                id: 'pen_6',
                id_ekskul: '1', // ART MEDIA
                id_user: 'usr_6',
                nama_lengkap: 'Bagas Aditya Saputra',
                nis: '22231006',
                kelas: 'X TKJ 1',
                jenis_kelamin: 'Laki-Laki',
                alamat: 'Jl. Racing Centre No. 10, Makassar',
                no_hp: '082155667788',
                foto: 'assets/images/siswa/68039ac16d940.jpg',
                alasan: 'Ingin memperdalam keahlian audio mixing dan podcast sekolah.',
                status: 'diterima',
                pilihan_ke: 1
            },
            {
                id: 'pen_7',
                id_ekskul: '3', // FUTSAL
                id_user: 'usr_1',
                nama_lengkap: 'Muhammad Fadhil Al-Ghifari',
                nis: '22231001',
                kelas: 'XII RPL 1',
                jenis_kelamin: 'Laki-Laki',
                alamat: 'Jl. Perintis Kemerdekaan KM 9, Makassar',
                no_hp: '081234567890',
                foto: 'assets/images/blankuser.jpg',
                alasan: 'Ingin menjaga kebugaran jasmani dan berkompetisi di turnamen futsal antar sekolah.',
                status: 'pending',
                pilihan_ke: 2
            }
        ],
        users: [
            { id: 'usr_1', username: 'fadhil_siswa', email: 'fadhil@siswa.mutil.sch.id', nama_lengkap: 'Muhammad Fadhil Al-Ghifari', nis: '22231001', kelas: 'XII RPL 1', no_hp: '081234567890', alamat: 'Jl. Perintis Kemerdekaan KM 9, Makassar', jenis_kelamin: 'Laki-Laki' },
            { id: 'usr_2', username: 'siti_nurhaliza', email: 'siti@siswa.mutil.sch.id', nama_lengkap: 'Siti Nurhaliza Putri', nis: '22231002', kelas: 'XI TKJ 2', no_hp: '085244112233', alamat: 'Jl. Urip Sumoharjo No. 45, Makassar', jenis_kelamin: 'Perempuan' },
            { id: 'usr_3', username: 'andi_pratama', email: 'andi@siswa.mutil.sch.id', nama_lengkap: 'Andi Pratama Kusuma', nis: '22231003', kelas: 'X RPL 2', no_hp: '087811998877', alamat: 'Jl. Sultan Alauddin No. 12, Makassar', jenis_kelamin: 'Laki-Laki' },
            { id: 'usr_4', username: 'rahmat_hidayat', email: 'rahmat@siswa.mutil.sch.id', nama_lengkap: 'Rahmat Hidayatullah', nis: '22231004', kelas: 'XII TKJ 1', no_hp: '081377889900', alamat: 'Jl. Daya Raya Blok B No. 3, Makassar', jenis_kelamin: 'Laki-Laki' },
            { id: 'usr_5', username: 'dewi_lestari', email: 'dewi@siswa.mutil.sch.id', nama_lengkap: 'Dewi Lestari Ayu', nis: '22231005', kelas: 'XI MM 1', no_hp: '089612345678', alamat: 'Jl. Tamalanrea Indah No. 8, Makassar', jenis_kelamin: 'Perempuan' },
            { id: 'usr_6', username: 'bagas_aditya', email: 'bagas@siswa.mutil.sch.id', nama_lengkap: 'Bagas Aditya Saputra', nis: '22231006', kelas: 'X TKJ 1', no_hp: '082155667788', alamat: 'Jl. Racing Centre No. 10, Makassar', jenis_kelamin: 'Laki-Laki' },
            { id: 'usr_7', username: 'nur_aisyah', email: 'aisyah@siswa.mutil.sch.id', nama_lengkap: 'Nur Aisyah Humaira', nis: '22231007', kelas: 'X RPL 1', no_hp: '081299887766', alamat: 'Jl. Toddopuli Raya No. 15, Makassar', jenis_kelamin: 'Perempuan' }
        ]
    };

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                // Auto-migrate old default Arman photo to blankuser if stored in localStorage
                if (parsed && parsed.currentUser && parsed.currentUser.foto === 'assets/images/siswa/68282d975fabf_arman.jpg') {
                    parsed.currentUser.foto = 'assets/images/blankuser.jpg';
                    if (Array.isArray(parsed.pendaftaran)) {
                        parsed.pendaftaran.forEach(p => {
                            if (p.id_user === 'usr_1' && p.foto === 'assets/images/siswa/68282d975fabf_arman.jpg') {
                                p.foto = 'assets/images/blankuser.jpg';
                            }
                        });
                    }
                    saveState(parsed);
                }
                return parsed;
            }
        } catch (e) {
            console.warn('LocalStorage unavailable, using in-memory state');
        }
        return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }

    function saveState(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Failed to persist to localStorage');
        }
    }

    let state = loadState();

    window.MutilStore = {
        getState: function() {
            return state;
        },
        resetData: function() {
            state = JSON.parse(JSON.stringify(DEFAULT_DATA));
            saveState(state);
            return state;
        },
        getCurrentUser: function() {
            return state.currentUser;
        },
        updateCurrentUser: function(newData) {
            state.currentUser = Object.assign({}, state.currentUser, newData);
            // also sync in users table
            const userIdx = state.users.findIndex(u => u.id === state.currentUser.id);
            if (userIdx !== -1) {
                state.users[userIdx] = Object.assign({}, state.users[userIdx], newData);
            }
            saveState(state);
            return state.currentUser;
        },
        registerEkskul: function(ekskul1Id, alasan1, ekskul2Id, alasan2) {
            state.currentUser.pendaftaran = {
                ekskul_1: ekskul1Id,
                status_1: 'pending',
                alasan_1: alasan1 || 'Tertarik mengikuti kegiatan ekstrakurikuler.',
                ekskul_2: ekskul2Id || null,
                status_2: ekskul2Id ? 'pending' : null,
                alasan_2: alasan2 || (ekskul2Id ? 'Tertarik mengikuti kegiatan ekstrakurikuler.' : '')
            };
            
            // Add or update applicant for ekskul 1
            if (ekskul1Id) {
                const exIdx = state.pendaftar.findIndex(p => p.id_user === state.currentUser.id && p.id_ekskul === ekskul1Id);
                const item = {
                    id: exIdx !== -1 ? state.pendaftar[exIdx].id : 'pen_' + Date.now() + '_1',
                    id_ekskul: ekskul1Id,
                    id_user: state.currentUser.id,
                    nama_lengkap: state.currentUser.nama_lengkap,
                    nis: state.currentUser.nis,
                    kelas: state.currentUser.kelas,
                    jenis_kelamin: state.currentUser.jenis_kelamin,
                    alamat: state.currentUser.alamat,
                    no_hp: state.currentUser.no_hp,
                    foto: state.currentUser.foto,
                    alasan: alasan1,
                    status: 'pending',
                    pilihan_ke: 1
                };
                if (exIdx !== -1) state.pendaftar[exIdx] = item;
                else state.pendaftar.push(item);
            }

            // Add or update applicant for ekskul 2
            if (ekskul2Id) {
                const exIdx2 = state.pendaftar.findIndex(p => p.id_user === state.currentUser.id && p.id_ekskul === ekskul2Id);
                const item2 = {
                    id: exIdx2 !== -1 ? state.pendaftar[exIdx2].id : 'pen_' + Date.now() + '_2',
                    id_ekskul: ekskul2Id,
                    id_user: state.currentUser.id,
                    nama_lengkap: state.currentUser.nama_lengkap,
                    nis: state.currentUser.nis,
                    kelas: state.currentUser.kelas,
                    jenis_kelamin: state.currentUser.jenis_kelamin,
                    alamat: state.currentUser.alamat,
                    no_hp: state.currentUser.no_hp,
                    foto: state.currentUser.foto,
                    alasan: alasan2,
                    status: 'pending',
                    pilihan_ke: 2
                };
                if (exIdx2 !== -1) state.pendaftar[exIdx2] = item2;
                else state.pendaftar.push(item2);
            }

            saveState(state);
            return state.currentUser.pendaftaran;
        },
        getEkskuls: function() {
            return state.ekskuls;
        },
        getEkskulById: function(id) {
            return state.ekskuls.find(e => String(e.id) === String(id));
        },
        toggleEkskulStatus: function(id) {
            const ekskul = this.getEkskulById(id);
            if (ekskul) {
                ekskul.status = ekskul.status === 'aktif' ? 'nonaktif' : 'aktif';
                saveState(state);
                return ekskul.status;
            }
            return null;
        },
        updateWaLink: function(id, newLink) {
            const ekskul = this.getEkskulById(id);
            if (ekskul) {
                ekskul.link_group = newLink;
                saveState(state);
                return true;
            }
            return false;
        },
        addEkskul: function(nama, pembina, hari, kuota) {
            const newId = String(state.ekskuls.length + 1);
            const item = {
                id: newId,
                nama_ekskul: nama,
                pembina: pembina || 'Pembina Baru',
                status: 'aktif',
                kuota: parseInt(kuota) || 30,
                link_group: 'https://chat.whatsapp.com/demo-baru',
                hari: hari || 'Hari Sabtu, 09:00 WITA',
                visi: 'Mengembangkan bakat siswa dalam bidang ' + nama + '.',
                misi: 'Membimbing dan memfasilitasi latihan rutin berkesinambungan.',
                gambar: 'images/blob.png'
            };
            state.ekskuls.push(item);
            saveState(state);
            return item;
        },
        editEkskul: function(id, nama) {
            const item = this.getEkskulById(id);
            if (item) {
                item.nama_ekskul = nama;
                saveState(state);
                return true;
            }
            return false;
        },
        deleteEkskul: function(id) {
            state.ekskuls = state.ekskuls.filter(e => String(e.id) !== String(id));
            saveState(state);
        },
        getAdmins: function() {
            return state.admins;
        },
        addAdmin: function(username, email, idEkskul) {
            const ekskul = this.getEkskulById(idEkskul);
            const item = {
                id: String(state.admins.length + 1),
                username: username,
                email: email,
                id_ekskul: idEkskul,
                nama_ekskul: ekskul ? ekskul.nama_ekskul : '-'
            };
            state.admins.push(item);
            saveState(state);
            return item;
        },
        editAdmin: function(id, username, email, idEkskul) {
            const admin = state.admins.find(a => String(a.id) === String(id));
            if (admin) {
                admin.username = username;
                if (email) admin.email = email;
                if (idEkskul) {
                    admin.id_ekskul = idEkskul;
                    const ekskul = this.getEkskulById(idEkskul);
                    admin.nama_ekskul = ekskul ? ekskul.nama_ekskul : '-';
                }
                saveState(state);
                return true;
            }
            return false;
        },
        deleteAdmin: function(id) {
            state.admins = state.admins.filter(a => String(a.id) !== String(id));
            saveState(state);
        },
        getUsers: function() {
            return state.users;
        },
        deleteUser: function(id) {
            state.users = state.users.filter(u => String(u.id) !== String(id));
            state.pendaftar = state.pendaftar.filter(p => String(p.id_user) !== String(id));
            saveState(state);
        },
        getPendaftarByEkskul: function(idEkskul, statusFilter) {
            return state.pendaftar.filter(p => {
                if (String(p.id_ekskul) !== String(idEkskul)) return false;
                if (statusFilter && Array.isArray(statusFilter)) {
                    return statusFilter.includes(p.status);
                } else if (statusFilter) {
                    return p.status === statusFilter;
                }
                return true;
            });
        },
        updateApplicantStatus: function(id, newStatus) {
            const app = state.pendaftar.find(p => String(p.id) === String(id));
            if (app) {
                app.status = newStatus;
                // If it belongs to current user, sync currentUser
                if (app.id_user === state.currentUser.id) {
                    if (state.currentUser.pendaftaran) {
                        if (state.currentUser.pendaftaran.ekskul_1 === app.id_ekskul) {
                            state.currentUser.pendaftaran.status_1 = newStatus;
                        }
                        if (state.currentUser.pendaftaran.ekskul_2 === app.id_ekskul) {
                            state.currentUser.pendaftaran.status_2 = newStatus;
                        }
                    }
                }
                saveState(state);
                return true;
            }
            return false;
        }
    };
})();
