window.addEventListener("load", function () {
    let dropdown = document.querySelector("#dropdown")
    // let options = document.querySelector("#options")

    if (dropdown == null) return

    dropdown.addEventListener('click', function (e) {
        dropdown.classList.toggle("show")
    })

    window.addEventListener("click", function (e) {
        if (e == null) return
        console.log("Target", e.target)
        if (!dropdown.contains(e.target)){
            dropdown.classList.remove("show")
        }
    })

    // dropdown.addEventListener("focusout", function (e) {
    //     console.log("Un focus.............................................", e.target)
    //     dropdown.classList.remove("show")
    // })
})

