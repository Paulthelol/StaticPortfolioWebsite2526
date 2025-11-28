// Project Data Store
const projectData = {
    pulseout: {
        title: "Social Music Platform (PulseOut)",
        // Sample filler image: "https://placehold.co/800x600?text=Mobile+View"
        images: [
            "images/PulseoutProjectImage.jpeg",
            "images/PulseoutProjectSongPageImage.jpeg",
        ],
        description: `PulseOut is a comprehensive social media application designed specifically for music lovers. It solves the problem of disjointed music sharing by allowing users to post reviews, rate albums, and follow friends' listening habits in real-time. 
                
                The system leverages the Spotify API to pull accurate metadata for millions of songs and artists. The backend handles complex relationships between users, songs, and comments using a normalized PostgreSQL schema.`,
        techStack: ["React", "Next.js", "Tailwind CSS", "PostgreSQL", "Spotify API"],
        links: [
            { text: "View Source Code", url: "https://github.com/Paulthelol/pulseout", icon: "github" },
            { text: "Live Demo", url: "https://pulseout.vercel.app/", icon: "external" }
        ]
    },
    iot: {
        title: "IoT Irrigation Control System",
        images: [
            "images/PivotIrrigationControlSystem.jpg",
            "images/BetzenIrrigationManagerStaticScreenshots.png",
            "https://placehold.co/800x600?text=Soil+Sensor+Data"
        ],
        description: `This embedded systems project reduces water waste and improves workflow efficiency in agricultural settings. Using Particle Boron boards, the system monitors center pivot irrigation systems and allows farmers to remotely manage pivot irrigation and ground well systems via a static web interface.`,
        techStack: ["C++", "Particle IoT", "HTML5", "CSS3", "Embedded Systems"],
        links: [
            { text: "Particle Boron Board", url: "https://docs.particle.io/boron/", icon: "doc" }
        ]
    }
};

// Carousel State
let currentSlide = 0;
let totalSlides = 0;
let startX = 0;

function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalDescription').innerText = data.description;

    // --- BUILD CAROUSEL ---
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');

    // Reset
    track.innerHTML = '';
    dotsContainer.innerHTML = '';
    currentSlide = 0;
    totalSlides = data.images.length;

    // Create Images
    data.images.forEach((imgSrc, index) => {
        const imgDiv = document.createElement('div');
        imgDiv.className = "min-w-full h-full";

        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = `Slide ${index + 1}`;
        img.className = "w-full h-full object-cover";
        img.onerror = function () { this.src = 'https://placehold.co/800x600?text=Image+Not+Found'; };

        imgDiv.appendChild(img);
        track.appendChild(imgDiv);

        // Create Dots
        const dot = document.createElement('button');
        dot.className = `w-3 h-3 rounded-full transition-all duration-300 ${index === 0 ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'}`;
        dot.onclick = () => goToSlide(index);
        dotsContainer.appendChild(dot);
    });

    // Hide arrows/dots if only 1 image
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (totalSlides <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
        dotsContainer.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
        dotsContainer.style.display = 'flex';
    }

    // Update Slide Position (Reset to 0)
    updateCarousel();

    // --- BUILD TAGS & LINKS ---
    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = '';
    data.techStack.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded shadow-sm';
        span.innerText = tech;
        techContainer.appendChild(span);
    });

    const linkContainer = document.getElementById('modalLinks');
    linkContainer.innerHTML = '';
    data.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = "_blank";
        a.className = 'text-cyan-600 hover:text-white hover:bg-cyan-600 border border-cyan-600 px-4 py-2 rounded transition duration-200 text-sm font-bold text-center flex items-center justify-center gap-2';

        let iconSvg = '';
        if (link.icon === 'github') {
            iconSvg = '<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.05-.015-2.055-3.33.72-4.035-1.605-4.035-1.605-.54-1.38-1.335-1.755-1.335-1.755-1.085-.735.09-.72.09-.72 1.2.075 1.83 1.23 1.83 1.23 1.065 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.285 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>';
        } else {
            iconSvg = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>';
        }
        a.innerHTML = `<span>${link.text}</span> ${iconSvg}`;
        linkContainer.appendChild(a);
    });

    // Show Modal
    document.getElementById('projectModal').classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    // Move track
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    const dots = document.getElementById('carouselDots').children;
    Array.from(dots).forEach((dot, index) => {
        if (index === currentSlide) {
            dot.className = "w-3 h-3 rounded-full transition-all duration-300 bg-white scale-110";
        } else {
            dot.className = "w-3 h-3 rounded-full transition-all duration-300 bg-white/50 hover:bg-white/80";
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// TOUCH / SWIPE SUPPORT
const track = document.getElementById('carouselTrack');
track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

track.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
        nextSlide(); // Swiped Left -> Next
    } else if (startX < endX - 50) {
        prevSlide(); // Swiped Right -> Prev
    }
});

function closeModal() {
    document.getElementById('projectModal').classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

document.addEventListener('keydown', function (event) {
    if (event.key === "Escape") closeModal();
    if (document.getElementById('projectModal').classList.contains('hidden')) return;
    if (event.key === "ArrowRight") nextSlide();
    if (event.key === "ArrowLeft") prevSlide();
});