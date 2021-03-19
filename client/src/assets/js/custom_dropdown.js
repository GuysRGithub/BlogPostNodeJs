import {instanceOf} from "prop-types";

window.addEventListener("load", function () {

    let dropdowns = document.getElementsByClassName("custom-dropdown")
    // let options = document.querySelector("#options")
    if (dropdowns == null) return;

    for (let i = 0; i < dropdowns.length; i++) {
        const dropdown = dropdowns[i]

        console.log("Dropdown", dropdown)
        // if (dropdown == null || dropdown instanceof HTMLElement) return

        dropdown.addEventListener('click', function (e) {
            dropdown.classList.toggle("show")
            console.log("Dropdown", dropdown)
        })

        window.addEventListener("click", function (e) {
            if (e == null) return
            console.log("Target", e.target)
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("show")
            }
        })
    }

    // dropdown.addEventListener("focusout", function (e) {
    //     console.log("Un focus.............................................", e.target)
    //     dropdown.classList.remove("show")
    // })
})

