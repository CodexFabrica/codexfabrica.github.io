function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    updateDarkModeIcon(isDark);
}

function updateDarkModeIcon(isDark) {
    const btn = document.getElementById('darkModeBtn');
    if (btn) {
        if (isDark) {
            // Show Moon when Dark
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
        } else {
            // Show Sun when Light
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
        }
    }
}

function toggleDropdown(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('logoDropdown');
    const btn = document.getElementById('dropdownBtn');
    const isShowing = dropdown.classList.toggle('show');
    if (btn) {
        btn.classList.toggle('active', isShowing);
    }
}

// Close dropdown when clicking outside
window.onclick = function (event) {
    if (!event.target.matches('.dropdown-btn') && !event.target.closest('.dropdown-btn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        const btn = document.getElementById('dropdownBtn');
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                if (btn) btn.classList.remove('active');
            }
        }
    }
}

function initializeCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre');

    codeBlocks.forEach((block) => {
        // Only add if not already present
        if (block.querySelector('.copy-btn')) return;

        // Create container for relative positioning if needed
        block.style.position = 'relative';

        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.type = 'button';
        button.ariaLabel = 'Copy code to clipboard';
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

        block.appendChild(button);

        button.addEventListener('click', async () => {
            const code = block.querySelector('code');
            const text = code ? code.innerText : block.innerText;

            try {
                await navigator.clipboard.writeText(text);

                // Visual feedback
                button.classList.add('copied');
                button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>`;

                setTimeout(() => {
                    button.classList.remove('copied');
                    button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;
                }, 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
    }
    updateDarkModeIcon(savedDarkMode);

    const darkModeBtn = document.getElementById('darkModeBtn');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', toggleDarkMode);
    }

    const dropdownBtn = document.getElementById('dropdownBtn');
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', toggleDropdown);
    }

    initializeCopyButtons();
    initializeDownloadDropdowns();
});

function initializeDownloadDropdowns() {
    const dropdowns = document.querySelectorAll('.download-dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.download-dropdown-toggle');
        const menu = dropdown.querySelector('.download-dropdown-menu');
        const repo = dropdown.getAttribute('data-repo');
        const releasesList = dropdown.querySelector('.releases-list');
        let fetched = false;

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Close other open download dropdowns
            document.querySelectorAll('.download-dropdown-menu.show').forEach(openMenu => {
                if (openMenu !== menu) {
                    openMenu.classList.remove('show');
                    openMenu.closest('.download-dropdown').querySelector('.download-dropdown-toggle').classList.remove('active');
                }
            });

            const isOpen = menu.classList.toggle('show');
            toggle.classList.toggle('active', isOpen);

            if (!fetched && repo) {
                fetchReleases(repo, releasesList);
                fetched = true;
            }
        });
    });

    // Close download dropdown when clicking outside
    window.addEventListener('click', (e) => {
        if (!e.target.closest('.download-dropdown')) {
            document.querySelectorAll('.download-dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
                menu.closest('.download-dropdown').querySelector('.download-dropdown-toggle').classList.remove('active');
            });
        }
    });
}

async function fetchReleases(repo, container) {
    try {
        const response = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=4`);
        if (!response.ok) throw new Error('Failed to fetch');

        const releases = await response.json();

        if (releases.length === 0) {
            container.innerHTML = '<div class="release-item">No releases found</div>';
            return;
        }

        container.innerHTML = '';
        releases.forEach(release => {
            const date = new Date(release.published_at).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });

            const item = document.createElement('a');
            item.href = release.html_url;
            item.target = '_blank';
            item.className = 'release-item';
            item.innerHTML = `
                <span class="release-version">${release.tag_name} ${release.prerelease ? '(Pre-release)' : ''}</span>
                <span class="release-date">${date}</span>
            `;
            container.appendChild(item);
        });
    } catch (error) {
        console.error('Error fetching releases:', error);
        container.innerHTML = '<div class="release-item">Error loading releases</div>';
    }
}

