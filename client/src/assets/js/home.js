import AlloyEditor from 'alloyeditor'

window.addEventListener("scroll", function () {

    let header = document.querySelector("#header")
    if (window !== null) {
        header.classList.toggle("stick", window.screenY > 0)
    }

})

AlloyEditor.editable('post-editor');
