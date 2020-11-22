window.addEventListener("scroll", function () {

    let header = document.querySelector("#header-nav")
    if (header == null) return
    if (window.pageYOffset > header.offsetTop) {
        header.classList.add("sticky")
    } else {
        header.classList.remove("sticky")
    }

})
