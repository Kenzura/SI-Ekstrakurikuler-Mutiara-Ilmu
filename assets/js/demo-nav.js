/**
 * Demo Navigator for GitHub Pages static preview
 * Automatically renders a floating dock to easily test all 14+ views & roles
 */
(function() {
    function initDemoDock() {
        if (document.getElementById('mutil-demo-dock')) return;

        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        
        // Define all views
        const views = {
            public: [
                { title: 'Landing Page (Beranda)', file: 'index.html', icon: 'fa-globe' },
                { title: 'Login Multi-Role', file: 'login.html', icon: 'fa-right-to-bracket' },
                { title: 'Registrasi Siswa', file: 'register.html', icon: 'fa-user-plus' }
            ],
            siswa: [
                { title: 'Dashboard Siswa', file: 'siswa-dashboard.html', icon: 'fa-house' },
                { title: 'Biodata & Data Diri', file: 'siswa-datadiri.html', icon: 'fa-id-card' },
                { title: 'Pilih Ekstrakurikuler', file: 'siswa-daftarekskul.html', icon: 'fa-clipboard-list' },
                { title: 'Status Pendaftaran', file: 'siswa-status.html', icon: 'fa-hourglass-half' },
                { title: 'Cetak Bukti Pendaftaran', file: 'cetak-bukti.html', icon: 'fa-print' }
            ],
            pembina: [
                { title: 'Dashboard Pembina', file: 'pembina-dashboard.html', icon: 'fa-chart-pie' },
                { title: 'Data Pendaftar (Pending/Tolak)', file: 'pembina-pendaftar.html', icon: 'fa-user-check' },
                { title: 'Data Pendaftar Diterima', file: 'pembina-diterima.html', icon: 'fa-users' },
                { title: 'Cetak Laporan Semua Pendaftar', file: 'cetak-laporan-pendaftar.html', icon: 'fa-file-lines' },
                { title: 'Cetak Laporan Siswa Diterima', file: 'cetak-laporan-diterima.html', icon: 'fa-file-pdf' }
            ],
            admin: [
                { title: 'Dashboard Super Admin', file: 'admin-dashboard.html', icon: 'fa-gauge-high' },
                { title: 'Kelola Ekstrakurikuler', file: 'admin-ekskul.html', icon: 'fa-list-check' },
                { title: 'Kelola Admin / Pembina', file: 'admin-kelola.html', icon: 'fa-user-shield' },
                { title: 'Kelola Pengguna / Siswa', file: 'admin-pengguna.html', icon: 'fa-users-gear' }
            ]
        };

        // Determine current role based on filename
        let activeRole = 'public';
        if (currentPath.startsWith('siswa-') || currentPath === 'cetak-bukti.html') {
            activeRole = 'siswa';
        } else if (currentPath.startsWith('pembina-') || currentPath.startsWith('cetak-laporan-')) {
            activeRole = 'pembina';
        } else if (currentPath.startsWith('admin-')) {
            activeRole = 'admin';
        }

        // Build HTML
        const dockEl = document.createElement('div');
        dockEl.id = 'mutil-demo-dock';

        const roleLabels = {
            public: '🌐 Publik',
            siswa: '🎓 Siswa',
            pembina: '🛡️ Pembina',
            admin: '👑 Super Admin'
        };

        dockEl.innerHTML = `
            <div class="demo-dock-pill" id="demoPill">
                <span>⚡ Demo Mode:</span>
                <span class="demo-dock-badge">${roleLabels[activeRole]}</span>
                <i class="fas fa-chevron-up"></i>
            </div>
            <div class="demo-dock-card" id="demoCard">
                <div class="demo-dock-header" id="demoHeader">
                    <div class="demo-dock-title">
                        <i class="fas fa-layer-group"></i> Mutil Demo Hub
                        <span class="demo-dock-badge">${roleLabels[activeRole]}</span>
                    </div>
                    <button class="demo-dock-toggle-btn" id="btnMinimizeDock" title="Minimize">
                        <i class="fas fa-minus"></i>
                    </button>
                </div>
                <div class="demo-dock-body">
                    <div class="demo-dock-section-title">Pilih Role Preview</div>
                    <div class="demo-role-grid">
                        <a href="index.html" class="demo-role-btn ${activeRole === 'public' ? 'active' : ''}">🌐 Publik</a>
                        <a href="siswa-dashboard.html" class="demo-role-btn ${activeRole === 'siswa' ? 'active' : ''}">🎓 Siswa</a>
                        <a href="pembina-dashboard.html" class="demo-role-btn ${activeRole === 'pembina' ? 'active' : ''}">🛡️ Pembina</a>
                        <a href="admin-dashboard.html" class="demo-role-btn ${activeRole === 'admin' ? 'active' : ''}">👑 Super Admin</a>
                    </div>

                    <div class="demo-dock-section-title">Halaman di Kategori Ini</div>
                    <div class="demo-links-list">
                        ${views[activeRole].map(v => `
                            <a href="${v.file}" class="demo-link-item ${currentPath === v.file ? 'current' : ''}">
                                <span><i class="fas ${v.icon} me-2"></i> ${v.title}</span>
                                ${currentPath === v.file ? '<i class="fas fa-circle-check text-success"></i>' : '<i class="fas fa-arrow-right opacity-50"></i>'}
                            </a>
                        `).join('')}
                    </div>

                    <div class="demo-dock-section-title">Lompat Cepat ke Halaman Lain</div>
                    <div class="demo-links-list">
                        ${activeRole !== 'siswa' ? `<a href="siswa-dashboard.html" class="demo-link-item"><span><i class="fas fa-graduation-cap me-2"></i> Panel Siswa</span> <i class="fas fa-chevron-right"></i></a>` : ''}
                        ${activeRole !== 'pembina' ? `<a href="pembina-dashboard.html" class="demo-link-item"><span><i class="fas fa-shield me-2"></i> Panel Pembina Ekskul</span> <i class="fas fa-chevron-right"></i></a>` : ''}
                        ${activeRole !== 'admin' ? `<a href="admin-dashboard.html" class="demo-link-item"><span><i class="fas fa-crown me-2"></i> Panel Super Admin</span> <i class="fas fa-chevron-right"></i></a>` : ''}
                        ${activeRole !== 'public' ? `<a href="index.html" class="demo-link-item"><span><i class="fas fa-globe me-2"></i> Landing Page Publik</span> <i class="fas fa-chevron-right"></i></a>` : ''}
                    </div>
                </div>
                <div class="demo-dock-footer">
                    <button class="demo-btn-reset" id="btnResetDemoData">
                        <i class="fas fa-rotate-left"></i> Reset Demo Data
                    </button>
                    <span style="font-size:11px; opacity:0.6;">GitHub Pages Ready</span>
                </div>
            </div>
        `;

        document.body.appendChild(dockEl);

        // Toast container
        if (!document.getElementById('mutil-toast-container')) {
            const toastContainer = document.createElement('div');
            toastContainer.id = 'mutil-toast-container';
            document.body.appendChild(toastContainer);
        }

        // Setup minimize/expand toggle
        const card = document.getElementById('demoCard');
        const pill = document.getElementById('demoPill');
        const btnMin = document.getElementById('btnMinimizeDock');

        const isMinimized = localStorage.getItem('mutil_demo_minimized') === 'true';
        if (isMinimized) {
            card.style.display = 'none';
            pill.style.display = 'flex';
        } else {
            card.style.display = 'block';
            pill.style.display = 'none';
        }

        btnMin.addEventListener('click', (e) => {
            e.stopPropagation();
            card.style.display = 'none';
            pill.style.display = 'flex';
            localStorage.setItem('mutil_demo_minimized', 'true');
        });

        pill.addEventListener('click', () => {
            pill.style.display = 'none';
            card.style.display = 'block';
            localStorage.setItem('mutil_demo_minimized', 'false');
        });

        // Reset data listener
        document.getElementById('btnResetDemoData').addEventListener('click', () => {
            if (confirm('Reset semua data demo pendaftaran, ekskul, dan siswa ke kondisi awal?')) {
                if (window.MutilStore) {
                    window.MutilStore.resetData();
                    window.showMutilToast('Data demo berhasil di-reset ke kondisi default!');
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                }
            }
        });
    }

    window.showMutilToast = function(message, type = 'success') {
        const container = document.getElementById('mutil-toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'mutil-toast';
        toast.innerHTML = `<i class="fas fa-circle-check text-white"></i> <span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-10px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3200);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDemoDock);
    } else {
        initDemoDock();
    }
})();
