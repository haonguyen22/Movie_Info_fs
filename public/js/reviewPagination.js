async function postReviewPagination(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

async function init() {
    var id = document.getElementById("movie_id");
    var page = 1;
    if (id != null) {
        var data = { id: id.value, page: page };
        await postReviewPagination(`/movie/${id.value}`, data).then((result) => {
            var PagiHtmls = "";
            for (let j = 1; j <= result.data.pageTotal; j++) {
                if (page === j) {
                    PagiHtmls += `
                        <li class="page-item active"><button class="review__pagination page-link" type="button" name="page"
                                        value=${j}>${j}</button></li>
                                        `;
                } else {
                    PagiHtmls += `
                        <li class="page-item"><button class="review__pagination page-link" type="button" name="page"
                                        value=${j}>${j}</button></li>
                                        `;
                }
            }
            const pagination = document.querySelector(".pagination");
            pagination.innerHTML = PagiHtmls;

            var htmls = "";
            for (let i = 0; i < result.data.data.length; i++) {
                var reviewLists = document.querySelector(".review__list");
                htmls += `
                        <a class="card" style="width: 45%; text-decoration: none; color: #000;" href="/movie/{{id}}">
                            <div class="card-body">
                                <h5 class="card-title">${result.data.data[i].author}</h5>
                                <p class="card-text">Ratings: ${result.data.data[i].authorRating}/10</p>
                                <p class="card-text">${result.data.data[i].reviewText}</p>
                            </div>
                        </a>
                    `;
            }
            reviewLists.innerHTML = htmls;
        });
    }
}
async function start(page) {
    await init();
    
    var id = document.getElementById("movie_id");
    const reviewPagination = document.querySelectorAll(".review__pagination");
    for (let k = 0; k < reviewPagination.length; k++) {
        reviewPagination[k].addEventListener("click", (e) => {
            e.preventDefault();
            var getData = { id: id.value, page: reviewPagination[k].value };
            postReviewPagination(`/movie/${id.value}`, getData).then((result) => {
                var PagiHtmls = "";
                for (let j = 0; j < result.data.pageTotal; j++) {
                    if (page === j) {
                        PagiHtmls += `
                                    <li class="page-item active"><button class="review__pagination page-link" type="button" name="page"
                                                    value=${j}>${j}</button></li>
                                                    `;
                    } else {
                        PagiHtmls += `
                                    <li class="page-item"><button class="review__pagination page-link" type="button" name="page"
                                                    value=${j}>${j}</button></li>
                                                    `;
                    }
                }
                const pagination = document.querySelector(".pagination");
                pagination.innerHTML = PagiHtmls;
                htmls = "";
                for (let i = 0; i < result.data.data.length; i++) {
                    var reviewLists = document.querySelector(".review__list");
                    console.log(reviewLists);
                    htmls += `
                                    <a class="card" style="width: 45%; text-decoration: none; color: #000;" href="/movie/{{id}}">
                                        <div class="card-body">
                                            <h5 class="card-title">${result.data.data[i].author}</h5>
                                            <p class="card-text">Ratings: ${result.data.data[i].authorRating}/10</p>
                                            <p class="card-text">${result.data.data[i].reviewText}</p>
                                        </div>
                                    </a>
                                `;
                }
                reviewLists.innerHTML = htmls;
                for (let j = 0; j < result.data.pageTotal; j++) {
                    if (page === j) {
                        PagiHtmls += `
                                    <li class="page-item active"><button class="review__pagination page-link" type="button" name="page"
                                                    value=${j}>${j}</button></li>
                                                    `;
                    } else {
                        PagiHtmls += `
                                    <li class="page-item"><button class="review__pagination page-link" type="button" name="page"
                                                    value=${j}>${j}</button></li>
                                                    `;
                    }
                }
                pagination.innerHTML = PagiHtmls;
            });
        });
    }
}

start();
