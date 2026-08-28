<!-- MODAL REUTILIZABLE SELECTOR DE MEDIOS -->
<div id="admin-media-modal" class="admin-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 99999; background: rgba(5,6,10,0.85); backdrop-filter: blur(8px); align-items: center; justify-content: center;">
    <div class="admin-modal-dialog" style="background: #171b26; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; width: 90%; max-width: 900px; max-height: 85vh; display: flex; flex-direction: column; box-shadow: 0 20px 60px rgba(0,0,0,0.9);">
        
        <!-- Header -->
        <div style="padding: 1.25rem 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <span style="font-size: 1.4rem;">📁</span>
                <h3 style="margin: 0; font-size: 1.15rem; color: #fff;">Biblioteca de Medios</h3>
            </div>
            <button type="button" id="btn-close-media-modal" style="background: transparent; border: none; font-size: 1.5rem; color: #9ca3af; cursor: pointer;">&times;</button>
        </div>

        <!-- Toolbar: Subida y Buscador -->
        <div style="padding: 1rem 1.5rem; background: #12151f; border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; gap: 1rem; flex-wrap: wrap; justify-content: space-between; align-items: center;">
            <input type="text" id="modal-search-media" placeholder="🔍 Buscar imagen..." style="padding: 0.45rem 0.9rem; border-radius: 20px; background: #1a1e2b; border: 1px solid rgba(255,255,255,0.15); color: #fff; font-size: 0.85rem; width: 260px;">
            
            <label class="btn btn-primary btn-sm" style="cursor: pointer; margin: 0;">
                📤 Subir Nueva Imagen
                <input type="file" id="modal-upload-file" accept=".webp,.jpg,.jpeg,.png,.svg,.gif" style="display: none;">
            </label>
        </div>

        <!-- Grid de Imágenes -->
        <div style="padding: 1.5rem; overflow-y: auto; flex: 1;">
            <div id="modal-media-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 1rem;">
                <!-- Se puebla dinámicamente vía JS -->
            </div>
            <div id="modal-media-empty" style="display: none; text-align: center; padding: 3rem 1rem; color: #9ca3af;">
                No se encontraron imágenes.
            </div>
        </div>

        <!-- Footer -->
        <div style="padding: 1rem 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button type="button" class="btn btn-secondary btn-sm" id="btn-cancel-media-modal">Cerrar</button>
        </div>
    </div>
</div>

<script>
let currentMediaCallback = null;

function openMediaPicker(callback) {
    currentMediaCallback = callback;
    const modal = document.getElementById('admin-media-modal');
    if (modal) {
        modal.style.display = 'flex';
        loadMediaList();
    }
}

function closeMediaPicker() {
    const modal = document.getElementById('admin-media-modal');
    if (modal) {
        modal.style.display = 'none';
        currentMediaCallback = null;
    }
}

function loadMediaList() {
    const grid = document.getElementById('modal-media-grid');
    const empty = document.getElementById('modal-media-empty');
    if (!grid) return;

    grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 2rem; color: #9ca3af;">Cargando archivos de medios...</div>';

    fetch('api_media.php')
        .then(r => r.json())
        .then(data => {
            if (data.success && data.media.length > 0) {
                grid.innerHTML = '';
                if (empty) empty.style.display = 'none';
                
                data.media.forEach(item => {
                    const card = document.createElement('div');
                    card.className = 'modal-media-item';
                    card.setAttribute('data-filename', item.filename.toLowerCase());
                    card.style.cssText = 'background: #12151f; border: 1px solid rgba(255,255,255,0.08); border-radius: 6px; overflow: hidden; cursor: pointer; transition: transform 0.15s ease, border-color 0.15s ease; text-align: center;';
                    card.innerHTML = `
                        <div style="width: 100%; height: 95px; background: #0c0e14; overflow: hidden; display: flex; align-items: center; justify-content: center;">
                            <img src="../${item.path}" alt="${item.filename}" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
                        </div>
                        <div style="padding: 0.4rem; font-size: 0.72rem; color: #cbd5e1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${item.filename}">
                            ${item.filename}
                        </div>
                    `;

                    card.addEventListener('mouseenter', () => {
                        card.style.transform = 'scale(1.04)';
                        card.style.borderColor = '#d81124';
                    });
                    card.addEventListener('mouseleave', () => {
                        card.style.transform = 'none';
                        card.style.borderColor = 'rgba(255,255,255,0.08)';
                    });

                    card.addEventListener('click', () => {
                        if (typeof currentMediaCallback === 'function') {
                            currentMediaCallback(item.path, item.filename);
                        }
                        closeMediaPicker();
                    });

                    grid.appendChild(card);
                });
            } else {
                grid.innerHTML = '';
                if (empty) empty.style.display = 'block';
            }
        })
        .catch(err => {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 2rem; color: #f87171;">Error al cargar la biblioteca de medios.</div>';
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const btnClose = document.getElementById('btn-close-media-modal');
    const btnCancel = document.getElementById('btn-cancel-media-modal');
    const modal = document.getElementById('admin-media-modal');
    const search = document.getElementById('modal-search-media');
    const uploadInput = document.getElementById('modal-upload-file');

    if (btnClose) btnClose.addEventListener('click', closeMediaPicker);
    if (btnCancel) btnCancel.addEventListener('click', closeMediaPicker);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeMediaPicker();
        });
    }

    if (search) {
        search.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase().trim();
            document.querySelectorAll('.modal-media-item').forEach(card => {
                const name = card.getAttribute('data-filename') || '';
                card.style.display = name.includes(term) ? 'block' : 'none';
            });
        });
    }

    if (uploadInput) {
        uploadInput.addEventListener('change', () => {
            if (uploadInput.files.length === 0) return;
            const formData = new FormData();
            formData.append('file', uploadInput.files[0]);

            const grid = document.getElementById('modal-media-grid');
            if (grid) grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 2rem; color: #c5a880;">Subiendo archivo a la biblioteca...</div>';

            fetch('api_media.php', {
                method: 'POST',
                body: formData
            })
            .then(r => r.json())
            .then(res => {
                if (res.success) {
                    loadMediaList();
                } else {
                    alert(res.message || 'Error al subir la imagen');
                    loadMediaList();
                }
            })
            .catch(() => {
                alert('Error al subir el archivo.');
                loadMediaList();
            });
        });
    }
});
</script>
