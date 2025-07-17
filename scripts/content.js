
const baseUrl = 'https://api.jikan.moe/v4';

// Fetch popular manga
async function fetchPopularManga() {
    const res = await fetch(`${baseUrl}/top/manga`);
    const data = await res.json();
    return data.data; // Array of manga
}

// Fetch latest manga updates
async function fetchLatestManga() {
  const res = await fetch(`${baseUrl}/manga?status=publishing`);
  const data = await res.json();
  return data.data;
}



// Fetch manga by genre (genreId is a number, e.g. 1 for Action)
async function fetchMangaByGenre(genreId) {
    const res = await fetch(`${baseUrl}/manga?genres=${genreId}`);
    const data = await res.json();
    return data.data;
}

async function owlCarousel() {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        rtl: false,
        loop:true,
        margin:10,
        smartSpeed: 800,
        autoplay:true,
        autoplayTimeout:1500,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },            
            960:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });
    owl.on('mousewheel', '.owl-stage', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const d = e.originalEvent.deltaY;
        if (d > 0) {
            $(this).closest('.owl-carousel').trigger('next.owl.carousel');
        } else {
            $(this).closest('.owl-carousel').trigger('prev.owl.carousel');
        }
    });
}

//display content in the popular manga section
const popularDiv = document.getElementById('popular-manga');
fetchPopularManga().then(mangaList => {
    popularDiv.innerHTML = `
        <div class="owl-carousel owl-theme">
            ${mangaList.slice(0, 20).map(manga => `
                <div class="item d-flex flex-column">
                    <img src="${manga.images.jpg.image_url}" class="rounded-end-4" alt="${manga.title}" style="width: 150px;">
                    <p class="fw-bold text-start">${manga.title}</p>
                </div>
            `).join('')}
        </div>
    `;
    owlCarousel();
});
//display content in the latest manga section
const latestDiv = document.getElementById('latest-manga');
fetchLatestManga().then(mangaList => {
    latestDiv.innerHTML = `
        <div class="owl-carousel owl-theme">
            ${mangaList.slice(0, 10).map(manga => `
                <div class="item">
                    <img src="${manga.images.jpg.image_url}" class="rounded-end-4" alt="${manga.title}" style="width: 150px;">
                </div>
            `).join('')}
        </div>
    `;
    owlCarousel();
});
