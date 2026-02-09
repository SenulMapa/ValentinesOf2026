// SIMPLIFIED MUSIC PLAYER - No Playlist Section, Just Vinyl
const MusicPlayer = (() => {
    // Song data
    const playlist = [
        {
            title: "Those Eyes",
            artist: "New West",
            duration: "3:32",
            audioSrc: "audio/those_eyes.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b273f0e58a7c8d8ceb7f5c6b6c6c"
        },
        {
            title: "Wildflower",
            artist: "Billie Eilish",
            duration: "3:04",
            audioSrc: "audio/wildflower.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b273ff9ca10b55ce82ae553c8228"
        },
        {
            title: "Sick and Twisted",
            artist: "Chris Grey",
            duration: "3:15",
            audioSrc: "audio/sick_and_twisted.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b2736bb9b4f7660b5e5b5f5f5f5f5"
        },
        {
            title: "Another Life",
            artist: "Chris Grey",
            duration: "3:25",
            audioSrc: "audio/another_life.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b273789c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "One More Night",
            artist: "Chris Grey",
            duration: "3:40",
            audioSrc: "audio/one_more_night.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b273889c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "Collateral Damage",
            artist: "Chris Grey",
            duration: "3:20",
            audioSrc: "audio/collateral_damage.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b273989c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "Undressed",
            artist: "Sombr",
            duration: "3:50",
            audioSrc: "audio/undressed.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b273189c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "Do I Ever Cross Ur Mind",
            artist: "Sombr",
            duration: "3:35",
            audioSrc: "audio/do_i_ever_cross_ur_mind.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b273289c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "wyd",
            artist: "Sadie Jean",
            duration: "3:10",
            audioSrc: "audio/wyd.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b273389c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "Back To Friends",
            artist: "Sombr",
            duration: "3:25",
            audioSrc: "audio/back_to_friends.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b273489c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "Different",
            artist: "Chris Grey",
            duration: "3:30",
            audioSrc: "audio/different.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b273589c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "pleaseXanny",
            artist: "Chase Atlantic",
            duration: "3:45",
            audioSrc: "audio/pleaseXanny.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b273689c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "Gemini",
            artist: "Chris Grey",
            duration: "3:20",
            audioSrc: "audio/gemini.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b273789c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "Up Down",
            artist: "Dyce",
            duration: "3:15",
            audioSrc: "audio/up_down.mp3",
            cover: "https://i.scdn.co/image/ab67616d0000b273889c9f4f7660b5e5b5f5f5f5f"
        }
    ];

    // DOM Elements
    let elements = {};
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffled = false;
    let isRepeating = false;
    let volume = 0.7;

    // Initialize player
    function init() {
        cacheElements();
        setupEventListeners();
        createVinylEffect();
        loadSong(currentSongIndex);
        setupResponsiveDesign();
        
        console.log("🎵 Music Player Initialized");
    }

    // Cache DOM elements
    function cacheElements() {
        elements = {
            audio: document.getElementById('audio-player'),
            playBtn: document.getElementById('play-btn'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),
            shuffleBtn: document.getElementById('shuffle-btn'),
            repeatBtn: document.getElementById('repeat-btn'),
            progressBar: document.getElementById('progress-bar'),
            progressFill: document.getElementById('progress-fill'),
            progressHandle: document.getElementById('progress-handle'),
            volumeBar: document.getElementById('volume-bar'),
            volumeFill: document.getElementById('volume-fill'),
            currentTime: document.getElementById('current-time'),
            totalTime: document.getElementById('total-time'),
            headerTime: document.getElementById('header-time'),
            nowPlayingTitle: document.getElementById('now-playing-title'),
            nowPlayingArtist: document.getElementById('now-playing-artist'),
            albumArt: document.getElementById('album-art'),
            albumArtImage: document.getElementById('album-art-image'),
            albumArtWrapper: document.querySelector('.album-art-wrapper'),
            playerMain: document.querySelector('.player-main')
        };

        // Set initial volume
        elements.audio.volume = volume;
        elements.volumeFill.style.width = `${volume * 100}%`;
    }

    // Setup event listeners
    function setupEventListeners() {
        // Play/Pause
        elements.playBtn.addEventListener('click', togglePlay);
        
        // Previous/Next
        elements.prevBtn.addEventListener('click', playPrevious);
        elements.nextBtn.addEventListener('click', playNext);
        
        // Shuffle/Repeat
        elements.shuffleBtn.addEventListener('click', toggleShuffle);
        elements.repeatBtn.addEventListener('click', toggleRepeat);
        
        // Progress bar
        elements.progressBar.addEventListener('click', seek);
        elements.progressBar.addEventListener('touchstart', handleTouchSeek);
        
        // Volume control
        elements.volumeBar.addEventListener('click', setVolume);
        elements.volumeBar.addEventListener('touchstart', handleTouchVolume);
        
        // Audio events
        elements.audio.addEventListener('timeupdate', updateProgress);
        elements.audio.addEventListener('loadedmetadata', updateTotalTime);
        elements.audio.addEventListener('ended', handleSongEnd);
        elements.audio.addEventListener('play', onPlay);
        elements.audio.addEventListener('pause', onPause);
        elements.audio.addEventListener('loadeddata', onAudioLoaded);
        elements.audio.addEventListener('error', onAudioError);
        
        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeydown);
        
        // Responsive design
        window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);
    }

    // Setup responsive design
    function setupResponsiveDesign() {
        // Make sure everything fits on mobile
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.height = '100%';
        
        if (elements.playerMain) {
            elements.playerMain.style.overflow = 'hidden';
            elements.playerMain.style.height = 'calc(100vh - 70px)';
        }
        
        // Initial resize handling
        handleResize();
    }

    // Handle window resize
    function handleResize() {
        if (!elements.albumArtWrapper) return;
        
        const isLandscape = window.innerHeight < window.innerWidth;
        const screenHeight = window.innerHeight;
        
        if (isLandscape) {
            // Landscape mode - smaller album art
            const newSize = Math.min(180, screenHeight * 0.3);
            elements.albumArtWrapper.style.width = `${newSize}px`;
            elements.albumArtWrapper.style.height = `${newSize}px`;
            
            const vinylDisc = document.querySelector('.vinyl-disc');
            if (vinylDisc) {
                vinylDisc.style.width = `${newSize + 40}px`;
                vinylDisc.style.height = `${newSize + 40}px`;
            }
        } else {
            // Portrait mode - adjust based on screen height
            if (screenHeight < 700) {
                elements.albumArtWrapper.style.width = '220px';
                elements.albumArtWrapper.style.height = '220px';
                
                const vinylDisc = document.querySelector('.vinyl-disc');
                if (vinylDisc) {
                    vinylDisc.style.width = '260px';
                    vinylDisc.style.height = '260px';
                }
            } else {
                elements.albumArtWrapper.style.width = '280px';
                elements.albumArtWrapper.style.height = '280px';
            }
        }
    }

    // Create vinyl effect
    function createVinylEffect() {
        // Remove any existing vinyl
        const existingVinyl = elements.albumArtWrapper.querySelector('.vinyl-disc');
        if (existingVinyl) existingVinyl.remove();
        
        // Create vinyl disc
        const vinylDisc = document.createElement('div');
        vinylDisc.className = 'vinyl-disc';
        
        // Create vinyl center
        const vinylCenter = document.createElement('div');
        vinylCenter.className = 'vinyl-center';
        
        // Create vinyl label
        const vinylLabel = document.createElement('div');
        vinylLabel.className = 'vinyl-label';
        vinylLabel.textContent = getVinylText();
        
        // Assemble vinyl
        vinylDisc.appendChild(vinylCenter);
        vinylDisc.appendChild(vinylLabel);
        
        // Add vinyl to wrapper
        elements.albumArtWrapper.appendChild(vinylDisc);
        
        // Create album hole
        const albumHole = document.createElement('div');
        albumHole.className = 'album-hole';
        elements.albumArt.appendChild(albumHole);
        
        // Make album art circular
        elements.albumArt.style.borderRadius = '50%';
        elements.albumArtImage.style.borderRadius = '50%';
        
        // Store reference
        elements.vinylDisc = vinylDisc;
        elements.vinylLabel = vinylLabel;
    }

    // Get vinyl label text
    function getVinylText() {
        const song = playlist[currentSongIndex];
        if (!song) return 'LOVE';
        
        // Get first 3-4 characters of title
        const title = song.title.replace(/[^a-zA-Z0-9]/g, '');
        if (title.length >= 3) {
            return title.substring(0, 4).toUpperCase();
        }
        return 'LOVE';
    }

    // Update vinyl label
    function updateVinylLabel() {
        if (!elements.vinylLabel) return;
        elements.vinylLabel.textContent = getVinylText();
    }

    // Audio event handlers
    function onPlay() {
        isPlaying = true;
        updatePlayButton();
        elements.albumArt.classList.add('playing');
        elements.playBtn.classList.add('playing');
    }

    function onPause() {
        isPlaying = false;
        updatePlayButton();
        elements.albumArt.classList.remove('playing');
        elements.playBtn.classList.remove('playing');
    }

    function onAudioLoaded() {
        const currentSong = playlist[currentSongIndex];
        showAlbumArt(currentSong);
    }

    function onAudioError(e) {
        console.error("Audio error:", e);
        const currentSong = playlist[currentSongIndex];
        showAlbumArt(currentSong);
    }

    // Show album art
    function showAlbumArt(song) {
        if (song.cover && (song.cover.startsWith('http') || song.cover.startsWith('/'))) {
            elements.albumArtImage.src = song.cover;
            elements.albumArtImage.style.display = 'block';
            
            elements.albumArtImage.onerror = () => {
                showDefaultAlbumArt();
            };
        } else {
            showDefaultAlbumArt();
        }
        
        // Remove loading state
        elements.albumArt.classList.remove('loading');
    }

    // Show default album art (gradient)
    function showDefaultAlbumArt() {
        elements.albumArtImage.style.display = 'none';
        
        const hash = playlist[currentSongIndex].title.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        
        const hue = Math.abs(hash % 360);
        const gradient = `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${(hue + 30) % 360}, 70%, 50%))`;
        
        elements.albumArt.style.background = gradient;
        elements.albumArt.classList.remove('loading');
    }

    // Load and play a song
    function loadSong(index) {
        if (index < 0 || index >= playlist.length) return;
        
        const song = playlist[index];
        currentSongIndex = index;
        
        // Update audio source
        elements.audio.src = song.audioSrc;
        
        // Update UI
        elements.nowPlayingTitle.textContent = song.title;
        elements.nowPlayingArtist.textContent = song.artist;
        
        // Update vinyl
        updateVinylLabel();
        
        // Show loading state for album art
        elements.albumArtImage.style.display = 'none';
        elements.albumArt.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
        elements.albumArt.classList.add('loading');
        
        // Load metadata
        elements.audio.load();
    }

    // Play song
    function playSong(index) {
        if (index === currentSongIndex && isPlaying) {
            pause();
        } else {
            if (index !== currentSongIndex) {
                loadSong(index);
            }
            play();
        }
    }

    // Play audio
    function play() {
        const playPromise = elements.audio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log("▶️ Playback started");
                })
                .catch(e => {
                    console.log("Play failed:", e);
                    isPlaying = false;
                    updatePlayButton();
                });
        }
    }

    // Pause audio
    function pause() {
        elements.audio.pause();
    }

    // Toggle play/pause
    function togglePlay() {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }

    // Play previous song
    function playPrevious() {
        const newIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(newIndex);
        if (isPlaying) play();
    }

    // Play next song
    function playNext() {
        if (isShuffled) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * playlist.length);
            } while (newIndex === currentSongIndex && playlist.length > 1);
            
            loadSong(newIndex);
        } else {
            const newIndex = (currentSongIndex + 1) % playlist.length;
            loadSong(newIndex);
        }
        
        if (isPlaying) play();
    }

    // Toggle shuffle
    function toggleShuffle() {
        isShuffled = !isShuffled;
        elements.shuffleBtn.classList.toggle('active', isShuffled);
    }

    // Toggle repeat
    function toggleRepeat() {
        isRepeating = !isRepeating;
        elements.repeatBtn.classList.toggle('active', isRepeating);
    }

    // Handle song end
    function handleSongEnd() {
        if (isRepeating) {
            elements.audio.currentTime = 0;
            play();
        } else {
            playNext();
        }
    }

    // Seek in audio
    function seek(e) {
        const rect = elements.progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        const newTime = percent * elements.audio.duration;
        
        if (!isNaN(newTime)) {
            elements.audio.currentTime = newTime;
            updateProgress();
        }
    }

    // Touch seek for mobile
    function handleTouchSeek(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = elements.progressBar.getBoundingClientRect();
        const percent = (touch.clientX - rect.left) / rect.width;
        const newTime = percent * elements.audio.duration;
        
        if (!isNaN(newTime)) {
            elements.audio.currentTime = newTime;
            updateProgress();
        }
    }

    // Set volume
    function setVolume(e) {
        const rect = elements.volumeBar.getBoundingClientRect();
        volume = (e.clientX - rect.left) / rect.width;
        volume = Math.max(0, Math.min(1, volume));
        
        elements.audio.volume = volume;
        elements.volumeFill.style.width = `${volume * 100}%`;
    }

    // Touch volume for mobile
    function handleTouchVolume(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = elements.volumeBar.getBoundingClientRect();
        volume = (touch.clientX - rect.left) / rect.width;
        volume = Math.max(0, Math.min(1, volume));
        
        elements.audio.volume = volume;
        elements.volumeFill.style.width = `${volume * 100}%`;
    }

    // Update progress bar
    function updateProgress() {
        if (!elements.audio.duration || isNaN(elements.audio.duration)) return;
        
        const percent = (elements.audio.currentTime / elements.audio.duration) * 100;
        elements.progressFill.style.width = `${percent}%`;
        
        const currentTime = formatTime(elements.audio.currentTime);
        elements.currentTime.textContent = currentTime;
        elements.headerTime.textContent = currentTime;
        
        const handlePos = percent;
        elements.progressHandle.style.left = `${handlePos}%`;
    }

    // Update total time display
    function updateTotalTime() {
        if (elements.audio.duration && !isNaN(elements.audio.duration)) {
            elements.totalTime.textContent = formatTime(elements.audio.duration);
        } else {
            const currentSong = playlist[currentSongIndex];
            elements.totalTime.textContent = currentSong.duration;
        }
    }

    // Update play button icon
    function updatePlayButton() {
        const icon = elements.playBtn.querySelector('i');
        icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }

    // Handle keyboard shortcuts
    function handleKeydown(e) {
        // Space bar: play/pause
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
        }
        // Arrow left: previous song
        else if (e.code === 'ArrowLeft' && e.ctrlKey) {
            e.preventDefault();
            elements.audio.currentTime = Math.max(0, elements.audio.currentTime - 10);
        }
        // Arrow right: next song
        else if (e.code === 'ArrowRight' && e.ctrlKey) {
            e.preventDefault();
            elements.audio.currentTime = Math.min(elements.audio.duration, elements.audio.currentTime + 10);
        }
        // M: mute/unmute
        else if (e.code === 'KeyM') {
            e.preventDefault();
            elements.audio.muted = !elements.audio.muted;
        }
        // Left bracket or P: previous song
        else if (e.code === 'BracketLeft' || (e.code === 'KeyP' && e.ctrlKey)) {
            e.preventDefault();
            playPrevious();
        }
        // Right bracket or N: next song
        else if (e.code === 'BracketRight' || (e.code === 'KeyN' && e.ctrlKey)) {
            e.preventDefault();
            playNext();
        }
    }

    // Helper function to format time
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Public API
    return {
        initialize: init,
        play: play,
        pause: pause,
        togglePlay: togglePlay,
        playSong: (index) => playSong(index),
        playNext: playNext,
        playPrevious: playPrevious,
        currentSong: () => playlist[currentSongIndex],
        isPlaying: () => isPlaying
    };
})();

// Initialize player when window loads
window.addEventListener('DOMContentLoaded', () => {
    window.musicPlayer = MusicPlayer;
});

// For direct initialization
window.initializeMusicPlayer = () => {
    MusicPlayer.initialize();
};