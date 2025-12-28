document.addEventListener('DOMContentLoaded', () => {
    // Check for admin flag in URL or localStorage (for persistence across reloads if we were using a server, but here just for initial entry)
    // We'll trigger admin mode via a secret keyboard shortcut: Ctrl + Shift + E

    let isAdminMode = false;

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'ק')) {
            e.preventDefault();
            toggleAdminMode();
        }
    });

    function toggleAdminMode() {
        isAdminMode = !isAdminMode;
        if (isAdminMode) {
            enableEditMode();
            showAdminToolbar();
        } else {
            disableEditMode();
            hideAdminToolbar();
        }
    }

    function enableEditMode() {
        document.body.classList.add('admin-mode');

        // Make text elements editable
        const textElements = document.querySelectorAll('h1, h2, h3, p, span, a:not(.btn-gold):not(.btn-outline):not(.btn-black), cite, li, .concept-number');
        textElements.forEach(el => {
            el.contentEditable = 'true';
            el.classList.add('editable-text');
        });

        // Make images editable (click to change URL)
        const images = document.querySelectorAll('img, .hero');
        images.forEach(img => {
            img.classList.add('editable-image');
            img.addEventListener('click', handleImageEdit);
        });

        // Handle background images specifically for Hero
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('click', (e) => {
                if (e.target === hero || e.target.classList.contains('hero-overlay')) {
                    handleBgImageEdit(hero);
                }
            });
        }
    }

    function disableEditMode() {
        document.body.classList.remove('admin-mode');

        const textElements = document.querySelectorAll('[contenteditable="true"]');
        textElements.forEach(el => {
            el.contentEditable = 'false';
            el.classList.remove('editable-text');
        });

        const images = document.querySelectorAll('.editable-image');
        images.forEach(img => {
            img.classList.remove('editable-image');
            img.removeEventListener('click', handleImageEdit);
        });
    }

    function handleImageEdit(e) {
        e.preventDefault();
        const img = e.target;
        const currentSrc = img.src;
        const newSrc = prompt('הכנס כתובת תמונה חדשה (URL):', currentSrc);
        if (newSrc && newSrc !== currentSrc) {
            img.src = newSrc;
        }
    }

    function handleBgImageEdit(element) {
        const newSrc = prompt('הכנס כתובת תמונה חדשה לרקע (URL):');
        if (newSrc) {
            element.style.backgroundImage = `url('${newSrc}')`;
            element.style.backgroundSize = 'cover';
            element.style.backgroundPosition = 'center';
            alert('שים לב: שינוי תמונת רקע עשוי לדרוש התאמות נוספות.');
        }
    }

    function showAdminToolbar() {
        if (document.querySelector('.admin-toolbar')) return;

        const toolbar = document.createElement('div');
        toolbar.className = 'admin-toolbar';
        toolbar.innerHTML = `
            <div class="admin-controls">
                <span>מצב עריכה</span>
                <button onclick="saveChanges()" class="btn-save">שמור וייצא לאתר</button>
                <button onclick="location.reload()" class="btn-cancel">ביטול</button>
            </div>
        `;
        document.body.appendChild(toolbar);
    }

    function hideAdminToolbar() {
        const toolbar = document.querySelector('.admin-toolbar');
        if (toolbar) toolbar.remove();
    }

    window.saveChanges = function () {
        disableEditMode();
        hideAdminToolbar();

        const clone = document.documentElement.cloneNode(true);
        const htmlContent = "<!DOCTYPE html>\n" + clone.outerHTML;
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('הקובץ ירד למחשב שלך.\nכדי לראות את השינויים באתר, עליך להחליף את הקובץ index.html הקיים בתיקייה בקובץ החדש שירד.');

        toggleAdminMode();
    };
});
