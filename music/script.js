const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "Music_Player";
const cd = document.querySelector(".cd");

const heading = document.querySelector("header h2");
const cdThumb = document.querySelector(".cd-thumb");
const audio = document.querySelector("#audio");

const playBtn = document.querySelector(".btn-toggle-play");
const player = document.querySelector(".player");

const progress = document.querySelector("#progress");

const next = document.querySelector(".btn-next");
const prev = document.querySelector(".btn-prev");

const random = document.querySelector(".btn-random");

const repeat = document.querySelector(".btn-repeat");

const playlist = document.querySelector(".playlist");

const app = {
    currentIndex: 0, // dùng để lay ra bài hát đầu tiên trong mảng

    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    settings: {

    },

    songs: [
        {
            name: 'Yêu Là Cưới',
            singer: 'Phát Hồ',
            path: './music/Yeu La Cuoi.mp3',
            image: './img/YeuLaCuoi.jpg',
        },

        {
            name: 'Cô Thắm Không Về',
            singer: 'Phát Hồ',
            path: './music/CoThamKhongVe.mp3',
            image: './img/CoThamKhongVe.jpg',
        },

        {
            name: 'Rồi Tới Luôn',
            singer: 'Nal',
            path: './music/Roi Toi Luon.mp3',
            image: './img/RoiToiLuon.jpg',
        },

        {
            name: 'Em Là Con Thuyền Cô Đơn',
            singer: 'Thái Học',
            path: './music/Em La Con Thuyen Co Don.mp3',
            image: './img/EmLaConThuyenCoDon.jpg',
        },

        {
            name: 'Bỏ Em Vào Ba Lô',
            singer: 'Tấn Trần',
            path: './music/Bo Em vao Balo.mp3',
            image: './img/BoEmVaoBaLo.jpg',
        },

        {
            name: 'Hạ Còn Vương Nắng',
            singer: 'DatKaa',
            path: './music/Ha Con Vuong Nang .mp3',
            image: './img/HaConVuongNang.jpg',
        },

        {
            name: 'Nếu Có Kiếp Sau',
            singer: 'Hương Ly',
            path: './music/Neu Co Kiep Sau.mp3',
            image: './img/NeuCoKiepSau.jpg',
        },

        {
            name: 'Sài Gòn Đau Lòng Quá',
            singer: 'Hứa Kim Tuyên Hoàng Duyên',
            path: './music/SaiGonDauLongQua.mp3',
            image: './img/SaiGonDauLongQua.jpg',
        },
    ],

    render:function(){
        // hiển thị ra views
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" 
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        });
        playlist.innerHTML = htmls.join('');
    },

    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get:function () {
                return this.songs[this.currentIndex];
            }
        });
    },

    // getCurrentSong: function() {
    //     return this.songs[this.currentIndex];
    // },

    handleEvents: function () {
        // xử lý sự kiện
        const _this = this; // để không bị trùng với this bên ngoài function
        const cdWidth = cd.offsetWidth

        //  Xử lý đĩa CD quay
        const cdThumbAnimate = cdThumb.animate([
            { transform: "rotate(360deg)"}
        ], {
            duration: 10000, // quay trong 10s
            iterations: Infinity // lặp lại vô hạn
        })
        cdThumbAnimate.pause(); // lần đầu chạy chương trình đĩa sẽ không quay

        // xử lý sự kiện khi kéo thanh cuộn dọc để mất đĩa CD khi kéo xuống
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;

            if (newCdWidth > 0) {
                cd.style.width = newCdWidth + "px";
                cd.style.opacity = newCdWidth / cdWidth;
            } else {
                cd.style.width = 0;
            }
        }

        //Xử lý khi bấm nút click play / pause
        playBtn.onclick = function () {
            if(_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }
        // khi bài hát bấm play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();
        }

        // khi bài hát bấm pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause();
        }

        // Khi bài hát chạy được vài giây
        audio.ontimeupdate = function () {
            if(audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100); // lấy phần trăm chạy được trên bài hát
                progress.value = progressPercent;
            }
        }

        // Khi tua bài hát 
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value; // lấy ra phần trăm đang chạy để thay đổi
            audio.currentTime = seekTime;
        }

        // Khi bấm qua bài khác
        next.onclick = function () {
            if (_this.isRandom) {
                _this.playRandom();
            } else {
                _this.next();
            }
            audio.play();
            _this.render();
            _this.scrollToActive();
        }

        // Khi bấm quay lại bài khác
        prev.onclick = function () {
            if (_this.isRandom) {
                _this.playRandom();
            } else {
                _this.prev();
            }
            audio.play();
            _this.render();
            _this.scrollToActive();
        }

        // Xử lý nút bật / tắt random
        random.onclick = function (e) {
            _this.isRandom = !_this.isRandom
            random.classList.toggle("active" , _this.isRandom); // Do đối số thứ 2 của toggle là boolean, nếu true thì nó add còn false thì nó remove
            
        }

        // Xử lý lặp lại bài hát 
        repeat.onclick = function (e) {
            _this.isRepeat = !_this.isRepeat;
            repeat.classList.toggle("active", _this.isRepeat); // Do đối số thứ 2 của toggle là boolean, nếu true thì nó add còn false thì nó remove
        }

        // Xử lý khi bài hát kết thúc
        audio.onended = function () {
            if(_this.isRepeat) { // nếu có repeat thì hát lại
                audio.play();
            } else { // nếu ko repeat thì qua bài mới
                next.click();
            }
        }

        // xử lý hành vi click vào bài hát
        playlist.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.active)");

            if(songNode || e.target.closest(".option")) { //closest trả về element : 1 là chính nó, 2 là thẻ cha, nếu ko tìm thấy element sẽ trả về null
                // Khi click vào bài hát
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }

                // Khi click vào option
                if (e.target.closest(".option")) {

                }
            }
        }
    },

    scrollToActive: function() {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            })
        },300)
    },  

    // load tên, bài hát và hình vào view
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url("${this.currentSong.image}")`;
        audio.src = this.currentSong.path;
    },

    // phương thức qua bài hát
    next: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong();
    },

    // phương thức quay lại bài hát
    prev: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    playRandom: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    start: function() {
        // Mọi thứ sẽ làm trong đây

        // Định nghĩa các thuộc tính cho object
        this.defineProperties();
        // Lắng nghe và xử lý sự kiện
        this.handleEvents();

        // Qua bài mới
        this.next();

        // Quay lại bài 
        this.prev();

        // Load bài hát đầu tiên vào view
        this.loadCurrentSong();

        // Gọi hàm hiển thị views
        this.render();
    }

}

app.start();
