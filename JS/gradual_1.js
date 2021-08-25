console.clear();

const elApp = document.querySelector("#app");
const elBackgrounds = Array.from(document.querySelectorAll(".background"));
const elArticles = Array.from(document.querySelectorAll(".content article"));

elArticles.forEach(article => {
    article.addEventListener("click", e => {
        const index = elArticles.indexOf(article);
        const bg = elBackgrounds[index];

        // Remove all data-active
        elApp.querySelectorAll("[data-active]").forEach(el => {
            el.removeAttribute("data-active");
        });

        article.setAttribute("data-active", true);
        bg.setAttribute('data-active', true);
    });
});