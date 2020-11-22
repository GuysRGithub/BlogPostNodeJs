import {execCommandStyle, ExecCommandStyle} from "./editor";


document.getElementById("test-bold")?.addEventListener("click", function ()   {
    let action: ExecCommandStyle = {
        style: 'color',
        value: "",
        initial: (element: HTMLElement | null) => new Promise<boolean>(((resolve) => {
            if (element?.style["color"]) {
                resolve(true)
            } else {
                resolve(false)
            }
        }))
    }

    let x = execCommandStyle(action, "div")
    console.log(x)
    console.log("Test Exec cmd")

})