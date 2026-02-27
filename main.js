import { measurementState } from './Measurements.js';

// --- Advanced UI Interactions ---

// 1. 3D Hover Tilt Process Cards
const tiltCards = document.querySelectorAll('.tilt-card');
tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xPct = x / rect.width - 0.5;
        const yPct = y / rect.height - 0.5;

        card.style.transform = `perspective(1000px) rotateY(${xPct * 15}deg) rotateX(${-yPct * 15}deg) translateZ(10px)`;

        // Parallax offset for internal effects
        const wireframe = card.querySelector('.wireframe-grid');
        if (wireframe) {
            wireframe.style.transform = `translate(${xPct * -20}px, ${yPct * -20}px)`;
        }
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)';
        const wireframe = card.querySelector('.wireframe-grid');
        if (wireframe) {
            wireframe.style.transform = '';
        }
    });
});

// --- Functional Modals & Interactions ---
const setupInteractions = () => {
    const modal = document.getElementById('dynamic-modal');
    if (!modal) return;

    const backdrop = document.getElementById('modal-backdrop');
    const content = document.getElementById('modal-content');
    const closeBtn = document.getElementById('modal-close');
    const body = document.getElementById('modal-body');

    const openModal = (title, description, icon) => {
        body.innerHTML = `
            <div class="flex flex-col items-center text-center gap-4">
                <span class="material-symbols-outlined text-primary text-6xl mb-2 drop-shadow-md">${icon}</span>
                <h2 class="text-3xl font-bold text-neutral-dark dark:text-background-light tracking-tight">${title}</h2>
                <p class="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed max-w-md">${description}</p>
                <div class="mt-8 flex gap-4 w-full">
                    <button class="flex-1 bg-primary text-neutral-dark px-6 py-4 rounded-lg font-bold hover:scale-[1.03] transition-transform shadow-lg" onclick="closeModal()">Confirm Action</button>
                    <button class="flex-1 bg-neutral-light dark:bg-neutral-800 text-neutral-dark dark:text-white px-6 py-4 rounded-lg font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors shadow-lg border border-transparent dark:border-white/5" onclick="closeModal()">Cancel</button>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        modal.classList.add('flex');
        // Trigger reflow
        void modal.offsetWidth;

        backdrop.classList.replace('opacity-0', 'opacity-100');
        content.classList.replace('opacity-0', 'opacity-100');
        content.classList.replace('scale-95', 'scale-100');
    };

    window.closeModal = () => {
        backdrop.classList.replace('opacity-100', 'opacity-0');
        content.classList.replace('opacity-100', 'opacity-0');
        content.classList.replace('scale-100', 'scale-95');

        setTimeout(() => {
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // Bind Primary Buttons
    document.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = btn.innerText.trim();
            if (text === 'Book Appointment') {
                openModal('Schedule Fitting', 'Our master tailors are available for exclusive scanning and consultation sessions. Select an available slot in our digital calendar.', 'calendar_month');
            } else if (text === 'Explore Collection') {
                openModal('The Archive', 'Access our exclusive runway pieces, detailed with complete material history and provenance.', 'auto_awesome');
            } else if (text === 'Start Customizing') {
                openModal('Digital Atelier', 'Enter the 3D customization suite. Choose your base drape, adjust measurements, and select premium digital fabrics.', 'design_services');
            } else if (text === 'Request Access') {
                e.preventDefault(); // intercept form submission
                openModal('Waitlist Joined', 'Your email has been added to our exclusive priority queue. We will notify you when a bespoke slot opens.', 'check_circle');
            }
        });
    });

    // Bind Process Cards
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const titleEl = card.querySelector('h3');
            if (!titleEl) return;
            const title = titleEl.innerText.trim();

            if (title === '3D Body Scanning') {
                // 1. The Input: LiDAR Scanning sequence
                setTimeout(() => {
                    openModal('LiDAR Scanning', '', '3d_rotation');
                    const modalBody = document.getElementById('modal-body');
                    modalBody.innerHTML = `
                        <div class="flex flex-col items-center gap-4 w-full relative">
                            <h2 class="text-2xl font-bold text-primary tracking-widest uppercase">Standard Cyborg Integration</h2>
                            <button id="unit-toggle" class="absolute top-1 right-2 text-xs font-mono bg-neutral-800 text-primary px-3 py-1 z-30 rounded border border-primary/50 hover:bg-neutral-700 shadow-md transition-colors hidden pointer-events-auto">Units: CM</button>
                            <div class="relative w-full h-64 bg-neutral-900 rounded-lg overflow-hidden border border-primary/30 flex items-center justify-center">
                                <!-- Laser Grid Background -->
                                <div class="absolute inset-0 opacity-10 animate-pulse" style="background-image: linear-gradient(#ecb613 1px, transparent 1px), linear-gradient(90deg, #ecb613 1px, transparent 1px); background-size: 20px 20px;"></div>
                                
                                <div class="text-primary font-mono text-xs absolute top-4 left-4 flex flex-col gap-1 z-10">
                                    <span>> INITIALIZING LiDAR...</span>
                                    <span id="scan-prog-1">> ACQUIRING MESH DATA...</span>
                                    <span id="scan-prog-2" class="animate-pulse">> POINTS: 2,540,192</span>
                                </div>
                                
                                <!-- 3D Wireframe Mock -->
                                <div class="w-32 h-48 border-2 border-primary/50 relative flex items-center justify-center perspective-[500px] z-10 bg-black/50 backdrop-blur-sm rounded-lg shadow-2xl">
                                    <div class="absolute inset-0 border border-primary/30 rounded-lg animate-pulse shadow-[0_0_20px_#ecb613]"></div>
                                    <span id="body-icon" class="material-symbols-outlined text-6xl text-primary animate-spin" style="animation-duration: 3s; animation-iteration-count: 1;">accessibility_new</span>
                                    
                                    <!-- Interactive Measurements Overlay -->
                                    <div id="measurements-overlay" class="absolute inset-0 z-20 pointer-events-none opacity-0 transition-opacity duration-1000">
                                        <!-- Shoulder -->
                                        <div class="measure-line w-[80%] h-[2px] top-[20%] left-[10%]"></div>
                                        <div class="measure-label" id="lbl-shoulder" style="top:-2%; left:50%; transform:translateX(-50%)"></div>
                                        
                                        <!-- Waist (Ring) -->
                                        <div class="measure-ring w-[60%] h-[30px] top-[40%] left-[20%]"></div>
                                        <div class="measure-label" id="lbl-waist" style="top:45%; left:-50%;"></div>
                                        
                                        <!-- Arm -->
                                        <div class="measure-line w-[2px] h-[35%] top-[25%] left-[85%]"></div>
                                        <div class="measure-label" id="lbl-arm" style="top:35%; left:95%;"></div>
                                        
                                        <!-- Back -->
                                        <div class="measure-line w-[2px] h-[50%] top-[20%] left-[50%] opacity-50"></div>
                                        <div class="measure-label" id="lbl-back" style="top:45%; left:55%;"></div>
                                    </div>
                                </div>
                            </div>
                            <p id="scan-status-text" class="text-neutral-400 text-sm mt-2">Constructing 3D Wireframe...</p>
                            <div class="flex gap-4 mt-4 w-full">
                                <button class="flex-1 bg-primary text-neutral-dark px-4 py-3 rounded-lg font-bold hover:scale-[1.02] transition-transform" onclick="closeModal(); window.showConfirmation();">Save Avatar Payload</button>
                            </div>
                        </div>
                    `;

                    // Handle the timing logic to "snap" the measurements at the end of the scan!
                    setTimeout(() => {
                        const overlay = document.getElementById('measurements-overlay');
                        const toggle = document.getElementById('unit-toggle');
                        const statusTxt = document.getElementById('scan-status-text');
                        const prog1 = document.getElementById('scan-prog-1');
                        const prog2 = document.getElementById('scan-prog-2');
                        const icon = document.getElementById('body-icon');

                        if (icon) {
                            icon.style.animationIterationCount = '0'; // stop spinning
                        }

                        if (prog1) prog1.innerText = '> MESH ACQUIRED & LOCKED';
                        if (prog2) {
                            prog2.classList.remove('animate-pulse');
                            prog2.innerText = '> MEASUREMENTS EXTRACTED';
                        }
                        if (statusTxt) statusTxt.innerText = "3D Wireframe constructed. High-fidelity measurements mapped onto avatar.";

                        if (overlay) overlay.classList.replace('opacity-0', 'opacity-100');
                        if (toggle) toggle.classList.remove('hidden');

                        const updateLabels = () => {
                            const lblS = document.getElementById('lbl-shoulder');
                            const lblW = document.getElementById('lbl-waist');
                            const lblA = document.getElementById('lbl-arm');
                            const lblB = document.getElementById('lbl-back');

                            if (lblS) { lblS.innerText = 'SH: ' + measurementState.getDisplayValue('shoulder'); lblS.style.transform = `translateX(-50%) scale(1.1)`; setTimeout(() => lblS.style.transform = 'translateX(-50%) scale(1)', 150); }
                            if (lblW) { lblW.innerText = 'W: ' + measurementState.getDisplayValue('waist'); lblW.style.transform = `scale(1.1)`; setTimeout(() => lblW.style.transform = 'scale(1)', 150); }
                            if (lblA) { lblA.innerText = 'A: ' + measurementState.getDisplayValue('arm'); lblA.style.transform = `scale(1.1)`; setTimeout(() => lblA.style.transform = 'scale(1)', 150); }
                            if (lblB) { lblB.innerText = 'B: ' + measurementState.getDisplayValue('back'); lblB.style.transform = `scale(1.1)`; setTimeout(() => lblB.style.transform = 'scale(1)', 150); }

                            if (toggle) toggle.innerText = 'Units: ' + measurementState.unit.toUpperCase();
                        };

                        updateLabels();

                        if (toggle) {
                            toggle.onclick = () => {
                                measurementState.toggleUnit();
                                updateLabels();
                            };
                        }
                    }, 3000); // 3 seconds matches the body-icon animate-spin CSS duration

                }, 100); // Fast open modal

            } else if (title === 'Virtual Fitting') {
                // 2. The Real-Time Sim
                openModal(title, '', 'view_in_ar');
                const modalBody = document.getElementById('modal-body');
                modalBody.innerHTML = `
                    <div class="flex flex-col items-center gap-4 w-full">
                        <h2 class="text-2xl font-bold text-primary tracking-widest uppercase">WebGL Cloth Sim</h2>
                        <p class="text-sm text-neutral-400 mb-2">Drag the garment asset onto your digital avatar to generate a stress-heat map.</p>
                        
                        <div class="relative w-full h-72 bg-neutral-900 rounded-lg overflow-hidden border border-primary/30 flex items-center justify-center" id="sim-container">
                            <!-- Target Avatar -->
                            <div id="sim-avatar" class="w-24 h-56 bg-neutral-800 rounded-full flex flex-col items-center justify-center text-neutral-600 border border-neutral-700 transition-all duration-700">
                                <span class="material-symbols-outlined text-4xl mb-1">man</span>
                                <span class="text-xs tracking-widest">AVATAR</span>
                            </div>
                            
                            <!-- Draggable Garment -->
                            <div id="sim-garment" draggable="true" class="absolute top-4 left-4 w-20 h-24 bg-primary rounded cursor-grab flex flex-col items-center justify-center text-neutral-dark font-bold shadow-lg hover:bg-primary/90 transition-colors z-20">
                                <span class="material-symbols-outlined text-3xl">apparel</span>
                            </div>
                        </div>
                        
                        <div class="flex gap-4 mt-4 w-full opacity-0 scale-95 transition-all duration-500" id="sim-results">
                            <button class="flex-1 bg-primary text-neutral-dark px-4 py-3 rounded-lg font-bold hover:scale-[1.02] transition-transform" onclick="closeModal()">Confirm Fit Accuracy</button>
                        </div>
                    </div>
                `;

                // Binding Interactive Drag and Drop
                setTimeout(() => {
                    const garment = document.getElementById('sim-garment');
                    const avatar = document.getElementById('sim-avatar');
                    const container = document.getElementById('sim-container');
                    const results = document.getElementById('sim-results');

                    garment.ondragstart = (e) => {
                        e.dataTransfer.setData('text/plain', 'garment');
                        garment.style.opacity = '0.5';
                    };
                    garment.ondragend = () => { garment.style.opacity = '1'; };

                    container.ondragover = (e) => { e.preventDefault(); };
                    container.ondrop = (e) => {
                        e.preventDefault();
                        // Hide original
                        garment.style.display = 'none';
                        // Update avatar to stress-heat map style
                        avatar.innerHTML = `
                            <span class="text-black font-black z-10 tracking-widest">FITTED</span>
                            <span class="text-xs text-black/80 z-10 mt-1">Stress Map Active</span>
                        `;
                        avatar.className = "w-32 h-64 bg-gradient-to-b from-green-500 via-yellow-400 to-red-500 rounded-[40px] flex flex-col items-center justify-center opacity-90 animate-pulse border-4 border-primary shadow-[0_0_30px_#ecb613]";

                        // Show confirmation button
                        results.classList.remove('opacity-0', 'scale-95');
                    };
                }, 100);

            } else if (title === 'Master Tailoring') {
                // 3. The Lead Gen Thread Animation
                openModal(title, '', 'gesture');
                const modalBody = document.getElementById('modal-body');
                modalBody.innerHTML = `
                    <div class="flex flex-col items-center gap-4 w-full relative">
                        <h2 class="text-2xl font-bold text-primary tracking-widest uppercase mb-4">Digital Order Form</h2>
                        
                        <div class="relative w-full bg-neutral-900 rounded-lg p-6 border border-primary/30 min-h-[220px] flex items-center justify-center overflow-hidden">
                            <!-- SVG Thread Animation -->
                            <svg class="absolute inset-0 w-full h-full pointer-events-none" style="z-index: 10;">
                                <path id="gold-thread" fill="none" stroke="#ecb613" stroke-width="3" stroke-dasharray="1500" stroke-dashoffset="1500" stroke-linecap="round" stroke-linejoin="round" d="M 10,20 Q 200,200 300,50 T 600,180" />
                                <circle id="needle-head" r="5" fill="#fff" cx="0" cy="0" style="opacity:0; transition: opacity 0.2s;" />
                            </svg>
                            
                            <!-- The Lead Gen Form -->
                            <div id="order-form" class="opacity-0 translate-y-4 transition-all duration-1000 flex flex-col gap-3 text-left w-full max-w-sm z-20 bg-black/60 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                                <div class="text-green-400 font-mono text-sm mb-2">> NODE.JS BACKEND SYNC COMPLETE</div>
                                <div class="flex justify-between border-b border-neutral-700 pb-1"><span class="text-neutral-400">Client ID </span><span class="text-white font-mono">0x4F99A1</span></div>
                                <div class="flex justify-between border-b border-neutral-700 pb-1"><span class="text-neutral-400">Measurements </span><span class="text-primary font-mono shadow-[0_0_5px_#ecb613]">LIDAR_SYNCED</span></div>
                                <div class="flex justify-between border-b border-neutral-700 pb-1"><span class="text-neutral-400">Fabric Selection </span><span class="text-white">Obsidian Drape</span></div>
                                <div class="flex justify-between pb-1"><span class="text-neutral-400">Pattern Status </span><span class="text-green-500 font-bold uppercase animate-pulse">Generated</span></div>
                            </div>
                        </div>
                        
                        <div class="flex gap-4 mt-4 w-full">
                            <button class="flex-1 bg-neutral-800 text-white px-4 py-3 rounded-lg font-bold border border-primary/30 hover:bg-neutral-700 transition-colors" onclick="closeModal()">Acknowledge Receipt</button>
                        </div>
                    </div>
                `;

                // Thread Animation trigger and Node.js mock
                setTimeout(() => {
                    const thread = document.getElementById('gold-thread');
                    const form = document.getElementById('order-form');
                    const needle = document.getElementById('needle-head');

                    // Animate thread stroke
                    thread.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.4, 0, 0.2, 1)';
                    needle.style.opacity = '1';

                    // Trigger reflow
                    void thread.offsetWidth;
                    thread.style.strokeDashoffset = '0';

                    // Show form details and log to browser console
                    setTimeout(() => {
                        form.classList.remove('opacity-0', 'translate-y-4');
                        console.log("\n=================================");
                        console.log("🧵 [Node.js Backend System Mock]");
                        console.log("Lead Generation Payload Received!");
                        console.log("Client: 0x4F99A1 | Measurements: Synced | Status: Pattern Generated");
                        console.log("=================================\n");
                    }, 1200);
                }, 100);
            }
        });
    });

    // Bind Collection Cards
    document.querySelectorAll('section .grid .group.relative').forEach(card => {
        card.addEventListener('click', () => {
            const titleEl = card.querySelector('h3');
            if (!titleEl) return;
            const title = titleEl.innerText.trim();
            openModal(title, `Loading the highly detailed interactive wireframes and material source files for the exclusive ${title} collection.`, 'view_carousel');
        });
    });



    // --- Expose interactions to global window for HTML inline buttons ---
    window.triggerScan = () => {
        openModal('LiDAR Scanning', '', '3d_rotation');
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `
            <div class="flex flex-col items-center gap-4 w-full relative">
                <h2 class="text-2xl font-bold text-primary tracking-widest uppercase">Standard Cyborg Integration</h2>
                <button id="unit-toggle" class="absolute top-1 right-2 text-xs font-mono bg-neutral-800 text-primary px-3 py-1 z-30 rounded border border-primary/50 hover:bg-neutral-700 shadow-md transition-colors hidden pointer-events-auto">Units: CM</button>
                <div class="relative w-full h-64 bg-neutral-900 rounded-lg overflow-hidden border border-primary/30 flex items-center justify-center">
                    <!-- Laser Grid Background -->
                    <div class="absolute inset-0 opacity-10 animate-pulse" style="background-image: linear-gradient(#ecb613 1px, transparent 1px), linear-gradient(90deg, #ecb613 1px, transparent 1px); background-size: 20px 20px;"></div>
                    
                    <div class="text-primary font-mono text-xs absolute top-4 left-4 flex flex-col gap-1 z-10">
                        <span>> INITIALIZING LiDAR...</span>
                        <span id="scan-prog-1">> ACQUIRING MESH DATA...</span>
                        <span id="scan-prog-2" class="animate-pulse">> POINTS: 2,540,192</span>
                    </div>
                    
                    <!-- 3D Wireframe Mock -->
                    <div class="w-32 h-48 border-2 border-primary/50 relative flex items-center justify-center perspective-[500px] z-10 bg-black/50 backdrop-blur-sm rounded-lg shadow-2xl">
                        <div class="absolute inset-0 border border-primary/30 rounded-lg animate-pulse shadow-[0_0_20px_#ecb613]"></div>
                        <span id="body-icon" class="material-symbols-outlined text-6xl text-primary animate-spin" style="animation-duration: 3s; animation-iteration-count: 1;">accessibility_new</span>
                        
                        <!-- Interactive Measurements Overlay -->
                        <div id="measurements-overlay" class="absolute inset-0 z-20 pointer-events-none opacity-0 transition-opacity duration-1000">
                            <!-- Shoulder -->
                            <div class="measure-line w-[80%] h-[2px] top-[20%] left-[10%]"></div>
                            <div class="measure-label" id="lbl-shoulder" style="top:-2%; left:50%; transform:translateX(-50%)"></div>
                            
                            <!-- Waist (Ring) -->
                            <div class="measure-ring w-[60%] h-[30px] top-[40%] left-[20%]"></div>
                            <div class="measure-label" id="lbl-waist" style="top:45%; left:-50%;"></div>
                            
                            <!-- Arm -->
                            <div class="measure-line w-[2px] h-[35%] top-[25%] left-[85%]"></div>
                            <div class="measure-label" id="lbl-arm" style="top:35%; left:95%;"></div>
                            
                            <!-- Back -->
                            <div class="measure-line w-[2px] h-[50%] top-[20%] left-[50%] opacity-50"></div>
                            <div class="measure-label" id="lbl-back" style="top:45%; left:55%;"></div>
                        </div>
                    </div>
                </div>
                <p id="scan-status-text" class="text-neutral-400 text-sm mt-2">Constructing 3D Wireframe...</p>
                <div class="flex gap-4 mt-4 w-full">
                    <button class="flex-1 bg-primary text-neutral-dark px-4 py-3 rounded-lg font-bold hover:scale-[1.02] transition-transform" onclick="closeModal(); window.showConfirmation();">Save Avatar Payload</button>
                </div>
            </div>
        `;

        // Handle the timing logic to "snap" the measurements at the end of the scan!
        setTimeout(() => {
            const overlay = document.getElementById('measurements-overlay');
            const toggle = document.getElementById('unit-toggle');
            const statusTxt = document.getElementById('scan-status-text');
            const prog1 = document.getElementById('scan-prog-1');
            const prog2 = document.getElementById('scan-prog-2');
            const icon = document.getElementById('body-icon');

            if (icon) {
                icon.style.animationIterationCount = '0'; // stop spinning
            }

            if (prog1) prog1.innerText = '> MESH ACQUIRED & LOCKED';
            if (prog2) {
                prog2.classList.remove('animate-pulse');
                prog2.innerText = '> MEASUREMENTS EXTRACTED';
            }
            if (statusTxt) statusTxt.innerText = "3D Wireframe constructed. High-fidelity measurements mapped onto avatar.";

            if (overlay) overlay.classList.replace('opacity-0', 'opacity-100');
            if (toggle) toggle.classList.remove('hidden');

            const updateLabels = () => {
                const lblS = document.getElementById('lbl-shoulder');
                const lblW = document.getElementById('lbl-waist');
                const lblA = document.getElementById('lbl-arm');
                const lblB = document.getElementById('lbl-back');

                if (lblS) { lblS.innerText = 'SH: ' + measurementState.getDisplayValue('shoulder'); lblS.style.transform = `translateX(-50%) scale(1.1)`; setTimeout(() => lblS.style.transform = 'translateX(-50%) scale(1)', 150); }
                if (lblW) { lblW.innerText = 'W: ' + measurementState.getDisplayValue('waist'); lblW.style.transform = `scale(1.1)`; setTimeout(() => lblW.style.transform = 'scale(1)', 150); }
                if (lblA) { lblA.innerText = 'A: ' + measurementState.getDisplayValue('arm'); lblA.style.transform = `scale(1.1)`; setTimeout(() => lblA.style.transform = 'scale(1)', 150); }
                if (lblB) { lblB.innerText = 'B: ' + measurementState.getDisplayValue('back'); lblB.style.transform = `scale(1.1)`; setTimeout(() => lblB.style.transform = 'scale(1)', 150); }

                if (toggle) toggle.innerText = 'Units: ' + measurementState.unit.toUpperCase();
            };

            updateLabels();

            if (toggle) {
                toggle.onclick = () => {
                    measurementState.toggleUnit();
                    updateLabels();
                };
            }
        }, 3000);
    };
};

setupInteractions();

// --- 3. The Measurement Confirmed Pop-up Logic ---
window.showConfirmation = () => {
    // 1. Get the anti-gravity modal elements
    const confirmModal = document.getElementById('confirmation-modal');
    const list = document.getElementById('measurement-list');

    // 2. Format the data from measurementState into the layout requested
    const unit = measurementState.unit;
    // Using formatting to append exact unit types instead of raw "in" or "cm" for display aesthetic
    const displayUnit = unit === 'inches' ? '"' : 'cm';
    list.innerHTML = `
        <div class="m-item"><span>Shoulder:</span> <strong>${measurementState.getDisplayValue('shoulder').replace(' in', '"').replace(' cm', 'cm')}</strong></div>
        <div class="m-item"><span>Waist:</span> <strong>${measurementState.getDisplayValue('waist').replace(' in', '"').replace(' cm', 'cm')}</strong></div>
        <div class="m-item"><span>Arm Length:</span> <strong>${measurementState.getDisplayValue('arm').replace(' in', '"').replace(' cm', 'cm')}</strong></div>
        <div class="m-item"><span>Back Length:</span> <strong>${measurementState.getDisplayValue('back').replace(' in', '"').replace(' cm', 'cm')}</strong></div>
    `;

    // 3. Trigger the modal pop!
    confirmModal.classList.replace('modal-hidden', 'modal-active');
};

// Bind actions on the new confirmation popup buttons
document.getElementById('re-measure')?.addEventListener('click', () => {
    document.getElementById('confirmation-modal').classList.replace('modal-active', 'modal-hidden');
});

document.getElementById('confirm-final')?.addEventListener('click', () => {
    document.getElementById('confirmation-modal').classList.replace('modal-active', 'modal-hidden');

    // Optional: Could trigger another thread animation sequence here!
    console.log("Measurements Stitched to Database");
});
