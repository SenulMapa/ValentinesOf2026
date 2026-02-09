// Music Player Module with Album Art Handling
const MusicPlayer = (() => {
    // Song data with YouTube links as fallback
    const playlist = [
        {
            title: "Those Eyes",
            artist: "New West",
            duration: "3:32",
            audioSrc: "https://www.youtube.com/watch?v=0lNyyB5mipw", // YouTube link as fallback
            cover: "https://i.scdn.co/image/ab67616d0000b273f0e58a7c8d8ceb7f5c6b6c6c"
        },
        {
            title: "Wildflower",
            artist: "Billie Eilish",
            duration: "3:04",
            audioSrc: "https://www.youtube.com/watch?v=RxrvNrQ2E8Q",
            cover: "https://i.scdn.co/image/ab67616d0000b273ff9ca10b55ce82ae553c8228"
        },
        {
            title: "Sick and Twisted",
            artist: "Chris Grey",
            duration: "3:15",
            audioSrc: "https://www.youtube.com/watch?v=QrR_gm6RqCo",
            cover: "https://i.scdn.co/image/ab67616d0000b2736bb9b4f7660b5e5b5f5f5f5f5"
        },
        {
            title: "Another Life",
            artist: "Chris Grey",
            duration: "3:25",
            audioSrc: "https://www.youtube.com/watch?v=sRkMp6u4Wn4",
            cover: "https://i.scdn.co/image/ab67616d0000b273789c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "One More Night",
            artist: "Chris Grey",
            duration: "3:40",
            audioSrc: "https://www.youtube.com/watch?v=Xylr1VFO7Vg",
            cover: "https://i.scdn.co/image/ab67616d0000b273889c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "Collateral Damage",
            artist: "Chris Grey",
            duration: "3:20",
            audioSrc: "https://www.youtube.com/watch?v=AvSSs8CwlpA",
            cover: "https://i.scdn.co/image/ab67616d0000b273989c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "Undressed",
            artist: "Sombr",
            duration: "3:50",
            audioSrc: "https://www.youtube.com/watch?v=DJmU-Q0hqBw",
            cover: "https://i.scdn.co/image/ab67616d0000b273189c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "Do I Ever Cross Ur Mind",
            artist: "Sombr",
            duration: "3:35",
            audioSrc: "https://www.youtube.com/watch?v=MD3WljYj9PI",
            cover: "https://i.scdn.co/image/ab67616d0000b273289c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "wyd",
            artist: "Sadie Jean",
            duration: "3:10",
            audioSrc: "https://www.youtube.com/watch?v=alqjkdLln4I",
            cover: "https://i.scdn.co/image/ab67616d0000b273389c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "Back To Friends",
            artist: "Sombr",
            duration: "3:25",
            audioSrc: "https://www.youtube.com/watch?v=Qe9o8ArYYik",
            cover: "https://i.scdn.co/image/ab67616d0000b273489c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "Different",
            artist: "Chris Grey",
            duration: "3:30",
            audioSrc: "https://www.youtube.com/watch?v=KBp2qn8Wj7I",
            cover: "https://i.scdn.co/image/ab67616d0000b273589c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "pleaseXanny",
            artist: "Chase Atlantic",
            duration: "3:45",
            audioSrc: "https://www.youtube.com/watch?v=SKClbO6R8vU",
            cover: "https://i.scdn.co/image/ab67616d0000b273689c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "Gemini",
            artist: "Chris Grey",
            duration: "3:20",
            audioSrc: "https://www.youtube.com/watch?v=lQglm4T5psQ",
            cover: "https://i.scdn.co/image/ab67616d0000b273789c9f4f7660b5e5b5f5f5f5f"
        },
        {
            title: "Up Down",
            artist: "Dyce",
            duration: "3:15",
            audioSrc: "https://www.youtube.com/watch?v=KcjF-sVgps8",
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
    let useFallbackMode = false; // Flag to use YouTube fallback

    // Initialize player
    function init() {
        cacheElements();
        setupEventListeners();
        createVinylEffect();
        setupMobileLayout();
        
        // Start with a working song (Wildflower has more reliable sources)
        currentSongIndex = 1; // Wildflower index
        loadSong(currentSongIndex);
        
        console.log("🎵 Music Player Initialized - Using YouTube Fallbacks");
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
        
        // Update header time
        if (elements.audio.duration && !isNaN(elements.audio.duration)) {
            elements.headerTime.textContent = formatTime(elements.audio.currentTime);
        }
    }

    function onPause() {
        isPlaying = false;
        updatePlayButton();
        elements.albumArt.classList.remove('playing');
        elements.playBtn.classList.remove('playing');
        stopVinylRotation();
    }

    function onAudioError(e) {
        console.log("Audio error - switching to fallback mode");
        useFallbackMode = true;
        
        const song = playlist[currentSongIndex];
        if (song) {
            // Show song info but disable audio
            elements.nowPlayingTitle.textContent = song.title;
            elements.nowPlayingArtist.textContent = song.artist + " (Tap to listen on YouTube)";
            elements.totalTime.textContent = song.duration;
            
            // Update vinyl label
            updateVinylLabel();
            
            // Show album art or fallback
            showAlbumArt(song);
        }
        
        // Disable play button since audio won't work
        elements.playBtn.style.opacity = '0.5';
        elements.playBtn.style.cursor = 'not-allowed';
        
        // Make album art clickable for YouTube
        elements.albumArt.style.cursor = 'pointer';
        elements.albumArt.title = 'Click to listen on YouTube';
        elements.albumArt.addEventListener('click', openYouTubeLink);
    }

    // Open YouTube link
    function openYouTubeLink() {
        const song = playlist[currentSongIndex];
        if (song && song.audioSrc && song.audioSrc.includes('youtube.com')) {
            window.open(song.audioSrc, '_blank');
        }
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
                showDefaultAlbumArt();
            };
        } else {
            showDefaultAlbumArt();
        }
    }

    // Show default album art (gradient)
    function showDefaultAlbumArt() {
        elements.albumArtImage.style.display = 'none';
        
        const song = playlist[currentSongIndex];
        if (!song) return;
        
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
        
        // Update UI
        elements.nowPlayingTitle.textContent = song.title;
        elements.nowPlayingArtist.textContent = song.artist;
        
        // Update vinyl
        updateVinylLabel();
        
        // Show loading state for album art
        elements.albumArt.classList.add('loading');
        elements.albumArt.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
        elements.albumArtImage.style.display = 'none';
        
        // Try to play audio (will fail if files don't exist, handled by onAudioError)
        if (!useFallbackMode) {
            elements.audio.src = `audio/${song.title.toLowerCase().replace(/\s+/g, '_')}.mp3`;
            elements.audio.load();
            
            // Reset play button
            elements.playBtn.style.opacity = '1';
            elements.playBtn.style.cursor = 'pointer';
            elements.albumArt.style.cursor = 'default';
            elements.albumArt.removeEventListener('click', openYouTubeLink);
        } else {
            // We're in fallback mode, just show the song info
            elements.nowPlayingArtist.textContent = song.artist + " (Tap album to listen)";
            elements.totalTime.textContent = song.duration;
            showAlbumArt(song);
            
            // Make album art clickable
            elements.albumArt.style.cursor = 'pointer';
            elements.albumArt.title = 'Click to listen on YouTube';
            elements.albumArt.addEventListener('click', openYouTubeLink);
        }
    }

    // Play song
    function playSong(index) {
        if (useFallbackMode) {
            // In fallback mode, just load the song info
            loadSong(index);
            const song = playlist[index];
            alert(`🎵 ${song.title} by ${song.artist}\n\nSince audio files aren't available, you can listen to this song on YouTube by tapping the album art!`);
            return;
        }
        
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
        if (useFallbackMode) {
            alert("🎵 Audio files aren't available locally.\n\nTap the album art to listen on YouTube instead!");
            return;
        }
        
        const playPromise = elements.audio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log("▶️ Playback started");
                })
                .catch(e => {
                    console.log("Play failed, switching to fallback mode:", e);
                    useFallbackMode = true;
                    onAudioError(e);
                    
                    // Show user-friendly message
                    const song = playlist[currentSongIndex];
                    if (song) {
                        alert(`🎵 Can't play "${song.title}" locally\n\nTap the album art to listen on YouTube!`);
                    }
                });
        }
    }

    // Pause audio
    function pause() {
        if (!useFallbackMode) {
            elements.audio.pause();
        }
    }

    // Toggle play/pause
    function togglePlay() {
        if (useFallbackMode) {
            const song = playlist[currentSongIndex];
            if (song) {
                alert(`🎵 ${song.title} by ${song.artist}\n\nTap the album art to listen on YouTube!`);
            }
            return;
        }
        
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
        if (isPlaying && !useFallbackMode) {
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
        
        if (isPlaying && !useFallbackMode) {
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
        if (isRepeating && !useFallbackMode) {
            elements.audio.currentTime = 0;
            play();
        } else {
            playNext();
        }
    }

    // Seek in audio
    function seek(e) {
        if (useFallbackMode) return;
        
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
        if (useFallbackMode) return;
        
        const rect = elements.volumeBar.getBoundingClientRect();
        volume = (e.clientX - rect.left) / rect.width;
        volume = Math.max(0, Math.min(1, volume));
        
        elements.audio.volume = volume;
        elements.volumeFill.style.width = `${volume * 100}%`;
    }

    // Update progress bar
    function updateProgress() {
        if (useFallbackMode || !elements.audio.duration || isNaN(elements.audio.duration)) {
            // Simulate progress in fallback mode
            if (useFallbackMode && isPlaying) {
                const song = playlist[currentSongIndex];
                if (song) {
                    const [min, sec] = song.duration.split(':').map(Number);
                    const totalSec = min * 60 + sec;
                    const elapsed = Math.min(totalSec, (Date.now() / 1000) % totalSec);
                    const percent = (elapsed / totalSec) * 100;
                    elements.progressFill.style.width = `${percent}%`;
                    elements.currentTime.textContent = formatTime(elapsed);
                    elements.headerTime.textContent = formatTime(elapsed);
                }
            }
            return;
        }
        
        const percent = (elements.audio.currentTime / elements.audio.duration) * 100;
        elements.progressFill.style.width = `${percent}%`;
        
        const currentTime = formatTime(elements.audio.currentTime);
        elements.currentTime.textContent = currentTime;
        elements.headerTime.textContent = currentTime;
    }

    // Update total time display
    function updateTotalTime() {
        if (!useFallbackMode && elements.audio.duration && !isNaN(elements.audio.duration)) {
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
        isPlaying: () => isPlaying,
        isFallbackMode: () => useFallbackMode
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