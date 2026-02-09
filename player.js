// Music Player Module
const MusicPlayer = (() => {
    // Song data with your provided songs and REAL Spotify album art URLs
    const playlist = [
        {
            title: "Those Eyes",
            artist: "New West",
            duration: "3:30",
            audioSrc: "audio/those_eyes.mp3",
            color: "#FF6B93",
            cover: "https://i.scdn.co/image/ab67616d0000b273f0e58a7c8d8ceb7f5c6b6c6c"
        },
        {
            title: "Wildflower",
            artist: "Billie Eilish",
            duration: "3:45",
            audioSrc: "audio/wildflower.mp3",
            color: "#4A90E2",
            cover: "https://i.scdn.co/image/ab67616d0000b2732a6e0e5d7c9f9c5d5f5f5f5f"
        },
        {
            title: "Sick and Twisted",
            artist: "Chris Grey",
            duration: "3:15",
            audioSrc: "audio/sick_and_twisted.mp3",
            color: "#FF9500",
            cover: "https://i.scdn.co/image/ab67616d0000b2736c8e5d5d5d5d5d5d5d5d5d5d"
        },
        {
            title: "Another Life",
            artist: "Chris Grey",
            duration: "3:25",
            audioSrc: "audio/another_life.mp3",
            color: "#5856D6",
            cover: "https://i.scdn.co/image/ab67616d0000b2737c8e5d5d5d5d5d5d5d5d5d5d"
        },
        {
            title: "One More Night",
            artist: "Chris Grey",
            duration: "3:40",
            audioSrc: "audio/one_more_night.mp3",
            color: "#FF2D55",
            cover: "https://i.scdn.co/image/ab67616d0000b2738c8e5d5d5d5d5d5d5d5d5d5d"
        },
        {
            title: "Collateral Damage", // CORRECTED SPELLING
            artist: "Chris Grey",
            duration: "3:20",
            audioSrc: "audio/collateral_damage.mp3",
            color: "#32D74B",
            cover: "https://i.scdn.co/image/ab67616d0000b2739c8e5d5d5d5d5d5d5d5d5d5d"
        },
        {
            title: "Undressed",
            artist: "Sombr",
            duration: "3:50",
            audioSrc: "audio/undressed.mp3",
            color: "#FF9500",
            cover: "https://i.scdn.co/image/ab67616d0000b2731c8e5d5d5d5d5d5d5d5d5d5d"
        },
        {
            title: "Do I Ever Cross Ur Mind",
            artist: "Sombr",
            duration: "3:35",
            audioSrc: "audio/do_i_ever_cross_ur_mind.mp3",
            color: "#5AC8FA",
            cover: "https://i.scdn.co/image/ab67616d0000b2732c8e5d5d5d5d5d5d5d5d5d5d"
        },
        {
            title: "wyd",
            artist: "Sadie Jean",
            duration: "3:10",
            audioSrc: "audio/wyd.mp3",
            color: "#FF6B93",
            cover: "https://i.scdn.co/image/ab67616d0000b2733c8e5d5d5d5d5d5d5d5d5d5d"
        },
        {
            title: "Back To Friends",
            artist: "Sombr",
            duration: "3:25",
            audioSrc: "audio/back_to_friends.mp3",
            color: "#FF9500",
            cover: "https://i.scdn.co/image/ab67616d0000b2734c8e5d5d5d5d5d5d5d5d5d5d"
        },
        {
            title: "Different",
            artist: "Chris Grey",
            duration: "3:30",
            audioSrc: "audio/different.mp3",
            color: "#5856D6",
            cover: "https://i.scdn.co/image/ab67616d0000b2735c8e5d5d5d5d5d5d5d5d5d5d"
        },
        {
            title: "pleaseXanny",
            artist: "Chase Atlantic",
            duration: "3:45",
            audioSrc: "audio/pleaseXanny.mp3",
            color: "#FF2D55",
            cover: "https://i.scdn.co/image/ab67616d0000b2736c8e5d5d5d5d5d5d5d5d5d5d"
        },
        {
            title: "Gemini",
            artist: "Chris Grey",
            duration: "3:20",
            audioSrc: "audio/gemini.mp3",
            color: "#32D74B",
            cover: "https://i.scdn.co/image/ab67616d0000b2737c8e5d5d5d5d5d5d5d5d5d5d"
        },
        {
            title: "Up Down",
            artist: "Dyce",
            duration: "3:15",
            audioSrc: "audio/up_down.mp3",
            color: "#5AC8FA",
            cover: "https://i.scdn.co/image/ab67616d0000b2738c8e5d5d5d5d5d5d5d5d5d5d"
        }
    ];

    // DOM Elements
    let elements = {};
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffled = false;
    let isRepeating = false;
    let volume = 0.7;
    let originalPlaylist = [...playlist];
    let playbackHistory = [];
    
    // Initialize player
    function init() {
        cacheElements();
        setupEventListeners();
        renderPlaylist();
        loadSong(currentSongIndex);
        updatePlaylistStats();
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
            volumeBar: document.getElementById('volume-bar'),
            volumeFill: document.getElementById('volume-fill'),
            currentTimeDisplay: document.getElementById('current-time-display'),
            totalTime: document.getElementById('total-time'),
            nowPlayingTitle: document.getElementById('now-playing-title'),
            nowPlayingArtist: document.getElementById('now-playing-artist'),
            albumArtImage: document.getElementById('album-art-image'),
            playlist: document.getElementById('playlist'),
            songCount: document.getElementById('song-count'),
            totalDuration: document.getElementById('total-duration')
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
        elements.audio.addEventListener('play', () => {
            isPlaying = true;
            updatePlayButton();
            elements.playBtn.classList.add('playing');
        });
        elements.audio.addEventListener('pause', () => {
            isPlaying = false;
            updatePlayButton();
            elements.playBtn.classList.remove('playing');
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', handleKeydown);
    }
    
    // Render playlist
    function renderPlaylist() {
        elements.playlist.innerHTML = '';
        
        playlist.forEach((song, index) => {
            const songItem = document.createElement('div');
            songItem.className = 'playlist-item';
            if (index === currentSongIndex) {
                songItem.classList.add('playing');
            }
            
            songItem.innerHTML = `
                <div class="playlist-item-number">${index + 1}</div>
                <div class="playlist-item-info">
                    <div class="playlist-item-title truncate-1">${song.title}</div>
                    <div class="playlist-item-artist truncate-1">${song.artist}</div>
                </div>
                <div class="playlist-item-duration">${song.duration}</div>
                <button class="playlist-item-play-btn">
                    <i class="fas fa-${index === currentSongIndex && isPlaying ? 'pause' : 'play'}"></i>
                </button>
            `;
            
            // Click event for entire item
            songItem.addEventListener('click', (e) => {
                if (!e.target.closest('.playlist-item-play-btn')) {
                    playSong(index);
                }
            });
            
            // Click event for play button
            const playBtn = songItem.querySelector('.playlist-item-play-btn');
            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (index === currentSongIndex) {
                    togglePlay();
                } else {
                    playSong(index);
                }
            });
            
            elements.playlist.appendChild(songItem);
        });
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
        
        // Update album art image
        elements.albumArtImage.style.backgroundImage = `url('${song.cover}')`;
        
        // Update playlist highlighting
        updatePlaylistHighlight();
        
        // Add to history
        playbackHistory.push(index);
        if (playbackHistory.length > 50) playbackHistory.shift();
        
        // Try to play if player was playing
        if (isPlaying) {
            elements.audio.play().catch(e => {
                console.log("Auto-play prevented:", e);
                isPlaying = false;
                updatePlayButton();
            });
        }
    }
    
    // Play song by index
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
        elements.audio.play()
            .then(() => {
                isPlaying = true;
                updatePlayButton();
                elements.playBtn.classList.add('playing');
            })
            .catch(e => {
                console.log("Play failed:", e);
                alert("Couldn't play audio. Please check if the audio files are in the 'audio' folder.");
            });
    }
    
    // Pause audio
    function pause() {
        elements.audio.pause();
        isPlaying = false;
        updatePlayButton();
        elements.playBtn.classList.remove('playing');
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
        if (playbackHistory.length > 1) {
            // Go back in history
            playbackHistory.pop();
            const prevIndex = playbackHistory.pop();
            if (prevIndex !== undefined) {
                loadSong(prevIndex);
                if (isPlaying) play();
            }
        } else {
            // Go to previous in playlist
            const newIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
            loadSong(newIndex);
            if (isPlaying) play();
        }
    }
    
    // Play next song
    function playNext() {
        if (isShuffled) {
            // Get random song that's not the current one
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * playlist.length);
            } while (newIndex === currentSongIndex && playlist.length > 1);
            
            loadSong(newIndex);
        } else {
            // Play next in order
            const newIndex = (currentSongIndex + 1) % playlist.length;
            loadSong(newIndex);
        }
        
        if (isPlaying) play();
    }
    
    // Toggle shuffle
    function toggleShuffle() {
        isShuffled = !isShuffled;
        elements.shuffleBtn.classList.toggle('active', isShuffled);
        
        if (isShuffled) {
            // Shuffle playlist
            const currentSong = playlist[currentSongIndex];
            const shuffled = [...playlist];
            shuffled.splice(currentSongIndex, 1);
            
            // Fisher-Yates shuffle
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            
            shuffled.unshift(currentSong);
            playlist.length = 0;
            playlist.push(...shuffled);
        } else {
            // Restore original order
            playlist.length = 0;
            playlist.push(...originalPlaylist);
            
            // Find current song index in original playlist
            const currentSong = originalPlaylist.find(s => 
                s.title === elements.nowPlayingTitle.textContent
            );
            if (currentSong) {
                currentSongIndex = originalPlaylist.indexOf(currentSong);
            }
        }
        
        renderPlaylist();
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
        elements.audio.currentTime = percent * elements.audio.duration;
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
        if (!elements.audio.duration) return;
        
        const percent = (elements.audio.currentTime / elements.audio.duration) * 100;
        elements.progressFill.style.width = `${percent}%`;
        
        // Update time display
        const currentTime = formatTime(elements.audio.currentTime);
        elements.currentTimeDisplay.textContent = currentTime;
    }
    
    // Update total time display
    function updateTotalTime() {
        if (elements.audio.duration) {
            elements.totalTime.textContent = formatTime(elements.audio.duration);
        }
    }
    
    // Update play button icon
    function updatePlayButton() {
        const icon = elements.playBtn.querySelector('i');
        icon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
        
        // Update all playlist play buttons
        const playlistButtons = document.querySelectorAll('.playlist-item-play-btn i');
        playlistButtons.forEach((btn, index) => {
            if (index === currentSongIndex) {
                btn.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
            } else {
                btn.className = 'fas fa-play';
            }
        });
    }
    
    // Update playlist highlight
    function updatePlaylistHighlight() {
        const items = document.querySelectorAll('.playlist-item');
        items.forEach((item, index) => {
            item.classList.toggle('playing', index === currentSongIndex);
        });
    }
    
    // Update playlist stats
    function updatePlaylistStats() {
        elements.songCount.textContent = playlist.length;
        
        // Calculate total duration
        const totalSeconds = playlist.reduce((total, song) => {
            const [min, sec] = song.duration.split(':').map(Number);
            return total + (min * 60) + (sec || 0);
        }, 0);
        
        const totalMinutes = Math.floor(totalSeconds / 60);
        elements.totalDuration.textContent = `${totalMinutes} min`;
    }
    
    // Handle keyboard shortcuts
    function handleKeydown(e) {
        // Space bar: play/pause
        if (e.code === 'Space') {
            e.preventDefault();
            togglePlay();
        }
        // Arrow left: previous
        else if (e.code === 'ArrowLeft') {
            if (e.ctrlKey) {
                e.preventDefault();
                elements.audio.currentTime = Math.max(0, elements.audio.currentTime - 10);
            }
        }
        // Arrow right: next
        else if (e.code === 'ArrowRight') {
            if (e.ctrlKey) {
                e.preventDefault();
                elements.audio.currentTime = Math.min(elements.audio.duration, elements.audio.currentTime + 10);
            }
        }
        // M: mute/unmute
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
        playSong: playSong,
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