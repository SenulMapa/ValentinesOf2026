// Music Player Module with Album Art Handling
const MusicPlayer = (() => {
    // Song data with local audio files
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
    let vinylInterval = null;

    // Initialize player
    function init() {
        cacheElements();
        setupEventListeners();
        createVinylEffect();
        setupMobileLayout();
        
        // Start with first song
        loadSong(currentSongIndex);
        
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
            playerMain: document.querySelector('.player-main'),
            musicScreen: document.getElementById('screen-music')
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
        
        // Volume control
        elements.volumeBar.addEventListener('click', setVolume);
        
        // Audio events
        elements.audio.addEventListener('timeupdate', updateProgress);
        elements.audio.addEventListener('loadedmetadata', updateTotalTime);
        elements.audio.addEventListener('ended', handleSongEnd);
        elements.audio.addEventListener('play', onPlay);
        elements.audio.addEventListener('pause', onPause);
        elements.audio.addEventListener('error', onAudioError);
        elements.audio.addEventListener('loadeddata', onAudioLoaded);
        
        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeydown);
        
        // Responsive design
        window.addEventListener('resize', handleResize);
    }

    // Setup mobile layout
    function setupMobileLayout() {
        // Prevent scrolling
        document.body.style.overflow = 'hidden';
        
        // Make player screen full height
        if (elements.musicScreen) {
            elements.musicScreen.style.height = '100vh';
            elements.musicScreen.style.overflow = 'hidden';
        }
        
        if (elements.playerMain) {
            elements.playerMain.style.height = 'calc(100vh - 70px)';
            elements.playerMain.style.overflow = 'hidden';
        }
    }

    // Create vinyl effect
    function createVinylEffect() {
        // Remove any existing vinyl
        const existingVinyl = elements.albumArtWrapper?.querySelector('.vinyl-disc');
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
        vinylLabel.textContent = 'LOVE';
        
        // Assemble vinyl
        vinylDisc.appendChild(vinylCenter);
        vinylDisc.appendChild(vinylLabel);
        
        // Add vinyl to wrapper
        if (elements.albumArtWrapper) {
            elements.albumArtWrapper.appendChild(vinylDisc);
        }
        
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

    // Update vinyl label
    function updateVinylLabel() {
        if (!elements.vinylLabel) return;
        const song = playlist[currentSongIndex];
        if (!song) return;
        
        // Get first 3-4 characters of title
        const cleanTitle = song.title.replace(/[^a-zA-Z0-9]/g, '');
        if (cleanTitle.length >= 3) {
            elements.vinylLabel.textContent = cleanTitle.substring(0, 4).toUpperCase();
        } else {
            elements.vinylLabel.textContent = 'LOVE';
        }
    }

    // Start vinyl rotation
    function startVinylRotation() {
        if (!elements.vinylDisc) return;
        
        updateVinylLabel();
        elements.vinylDisc.style.opacity = '1';
        
        // Stop any existing rotation
        if (vinylInterval) {
            clearInterval(vinylInterval);
        }
        
        let rotation = 0;
        vinylInterval = setInterval(() => {
            rotation = (rotation + 2) % 360;
            elements.vinylDisc.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
        }, 50);
    }

    // Stop vinyl rotation
    function stopVinylRotation() {
        if (vinylInterval) {
            clearInterval(vinylInterval);
            vinylInterval = null;
        }
        
        if (elements.vinylDisc) {
            elements.vinylDisc.style.opacity = '0';
        }
    }

    // Audio event handlers
    function onPlay() {
        isPlaying = true;
        updatePlayButton();
        elements.albumArt.classList.add('playing');
        elements.playBtn.classList.add('playing');
        startVinylRotation();
    }

    function onPause() {
        isPlaying = false;
        updatePlayButton();
        elements.albumArt.classList.remove('playing');
        elements.playBtn.classList.remove('playing');
        stopVinylRotation();
    }

    function onAudioLoaded() {
        // Show album art when audio loads
        const song = playlist[currentSongIndex];
        if (song) {
            showAlbumArt(song);
        }
    }

    function onAudioError(e) {
        console.log("Audio error for:", playlist[currentSongIndex]?.title);
        
        const song = playlist[currentSongIndex];
        if (song) {
            // Still show song info
            elements.nowPlayingTitle.textContent = song.title;
            elements.nowPlayingArtist.textContent = song.artist;
            elements.totalTime.textContent = song.duration;
            
            // Update vinyl label
            updateVinylLabel();
            
            // Show album art or fallback
            showAlbumArt(song);
        }
        
        // Remove loading state
        elements.albumArt.classList.remove('loading');
    }

    // Show album art
    function showAlbumArt(song) {
        // Remove loading state
        elements.albumArt.classList.remove('loading');
        
        // Try to load cover image
        if (song.cover) {
            elements.albumArtImage.src = song.cover;
            elements.albumArtImage.style.display = 'block';
            elements.albumArtImage.onerror = () => {
                showDefaultAlbumArt(song);
            };
        } else {
            showDefaultAlbumArt(song);
        }
    }

    // Show default album art (gradient)
    function showDefaultAlbumArt(song) {
        if (!song) return;
        
        elements.albumArtImage.style.display = 'none';
        
        // Create a unique gradient based on song title
        const hash = song.title.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        
        const hue = Math.abs(hash % 360);
        const gradient = `linear-gradient(135deg, 
            hsl(${hue}, 70%, 60%), 
            hsl(${(hue + 30) % 360}, 70%, 50%),
            hsl(${(hue + 60) % 360}, 70%, 40%)
        )`;
        
        elements.albumArt.style.background = gradient;
    }

    // Load and play a song
    function loadSong(index) {
        if (index < 0 || index >= playlist.length) return;
        
        const song = playlist[index];
        currentSongIndex = index;
        
        console.log(`Loading: ${song.title} by ${song.artist}`);
        
        // Stop current playback
        if (isPlaying) {
            pause();
        }
        
        // Update UI
        elements.nowPlayingTitle.textContent = song.title;
        elements.nowPlayingArtist.textContent = song.artist;
        elements.totalTime.textContent = song.duration;
        
        // Reset progress
        elements.progressFill.style.width = '0%';
        elements.currentTime.textContent = '0:00';
        elements.headerTime.textContent = '0:00';
        
        // Update vinyl
        updateVinylLabel();
        
        // Show loading state for album art
        elements.albumArt.classList.add('loading');
        elements.albumArt.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
        elements.albumArtImage.style.display = 'none';
        
        // Try to load audio
        elements.audio.src = song.audioSrc;
        elements.audio.load();
        
        // Reset play button state
        updatePlayButton();
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
                    
                    // Show error message to user
                    const song = playlist[currentSongIndex];
                    if (song) {
                        alert(`Cannot play "${song.title}"\n\nMake sure the audio file exists at:\n${song.audioSrc}`);
                    }
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
        if (isPlaying) {
            play();
        }
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
        
        if (isPlaying) {
            play();
        }
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

    // Set volume
    function setVolume(e) {
        const rect = elements.volumeBar.getBoundingClientRect();
        volume = (e.clientX - rect.left) / rect.width;
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
    }

    // Update total time display
    function updateTotalTime() {
        if (elements.audio.duration && !isNaN(elements.audio.duration)) {
            elements.totalTime.textContent = formatTime(elements.audio.duration);
        } else {
            const currentSong = playlist[currentSongIndex];
            if (currentSong) {
                elements.totalTime.textContent = currentSong.duration;
            }
        }
    }

    // Update play button icon
    function updatePlayButton() {
        const icon = elements.playBtn.querySelector('i');
        icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
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
            // Portrait mode
            if (screenHeight < 700) {
                elements.albumArtWrapper.style.width = '220px';
                elements.albumArtWrapper.style.height = '220px';
                
                const vinylDisc = document.querySelector('.vinyl-disc');
                if (vinylDisc) {
                    vinylDisc.style.width = '260px';
                    vinylDisc.style.height = '260px';
                }
            }
        }
    }

    // Handle keyboard shortcuts
    function handleKeydown(e) {
        // Space bar: play/pause
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
        }
        // Arrow left: previous song
        else if (e.code === 'ArrowLeft') {
            e.preventDefault();
            playPrevious();
        }
        // Arrow right: next song
        else if (e.code === 'ArrowRight') {
            e.preventDefault();
            playNext();
        }
        // S: shuffle
        else if (e.code === 'KeyS') {
            e.preventDefault();
            toggleShuffle();
        }
        // R: repeat
        else if (e.code === 'KeyR') {
            e.preventDefault();
            toggleRepeat();
        }
        // M: mute
        else if (e.code === 'KeyM') {
            e.preventDefault();
            elements.audio.muted = !elements.audio.muted;
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