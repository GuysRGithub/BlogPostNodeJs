
declare var textField: Window

export interface ExecCommandStyle {
    style: string,
    value: string,
    initial: (element: HTMLElement | null) => Promise<boolean>
}

export async function execCommandStyle(action: ExecCommandStyle, containers: string) {
    const selection: Selection | null = await getSelection();
    console.log("selection", selection)
    if (!selection) return;
    // String selectioned
    const anchorNode: Node | null = selection.anchorNode;
    console.log("anchorNode", anchorNode)

    if (!anchorNode) {
        return;
    }

    let container: HTMLElement | null = anchorNode.nodeType !== Node.TEXT_NODE
    && anchorNode.nodeType !== Node.COMMENT_NODE ? (anchorNode as HTMLElement) : anchorNode.parentElement;
    console.log("container", container)

    if (container == null) return

    const sameSelection: boolean = container && container.innerText === selection.toString() || false
    console.log("sameSelection", sameSelection)

    const bodyText = textField.document.getElementsByTagName("body")[0].innerText
    const bodyHtml = textField.document.getElementsByTagName("body")[0].innerHTML

    console.log("Is Body?", container == textField.document.body, container, textField.document.body)
    if (container == textField.document.body) {
        container = textField.document.createElement("div")
    }

    console.log("FUck container", container)

    if (sameSelection &&
        !isContainer(containers, container) &&
        container.style[action.style] !== undefined &&
        bodyHtml != bodyText
    ) {
        console.log("Update Selection")
        await updateSelection(container, action, containers)
        return;
    }

    console.log("Replace Selection")
    await replaceSelection(container, action, selection, containers)
}

async function getSelection(): Promise<Selection | null> {
    if (textField && textField.document.getSelection) {
        return textField.document.getSelection();
    } else if (window && window.getSelection) {
        return window.getSelection();
    } else if (document && document.getSelection) {
        return document.getSelection();
    } else if (document && (document as any).selection) {
        return (document as any).selection.createRange().text;
    }
    console.log(textField.document.getSelection())
    return null;
}


async function updateSelection(container: HTMLElement | null, action: ExecCommandStyle, containers: string) {
    if (container == null) return

    // @ts-ignore
    container.style[action.style] = await getStyleValue(container, action, containers);

    await cleanChildren(action, container)
}

async function getStyleValue(container: HTMLElement, action: ExecCommandStyle, containers: string): Promise<string> {

    if (!container) {
        return action.value;
    }

    if (await action.initial(container)) {
        return 'initial';
    }
    const style: Node | null = await findStyleNode(container, action.style, containers);

    if (await action.initial(style as HTMLElement)) {
        return 'initial';
    }

    return action.value;
}

// Recursively iterates till it either find an element with the same
// style or the container
async function findStyleNode(node: Node,
                             style: string,
                             containers: string): Promise<Node | null> {
    // Just in case
    if (node.nodeName.toUpperCase() === 'HTML' ||
        node.nodeName.toUpperCase() === 'BODY') {
        return null;
    }

    if (!node.parentNode) {
        return null;
    }

    if (isContainer(containers, node)) {
        return null;
    }

    // @ts-ignore
    const hasStyle: boolean =
        (node as HTMLElement).style[style] !== null &&
        (node as HTMLElement).style[style] !== undefined &&
        (node as HTMLElement).style[style] !== '';

    if (hasStyle) {
        return node;
    }

    return await findStyleNode(node.parentNode, style, containers);
}


async function cleanChildren(action: ExecCommandStyle,
                             span: HTMLSpanElement) {
    if (!span.hasChildNodes()) {
        return;
    }

    // Clean direct (> *) children with same style
    const children: HTMLElement[] =
        Array.from(span.children)
            .filter((element: Element) => {
                return (element as HTMLElement).style[action.style] !== undefined &&
                    (element as HTMLElement).style[action.style] !== '';
            }) as HTMLElement[];

    if (children && children.length > 0) {
        children.forEach((element: HTMLElement) => {
            // @ts-ignore
            element.style[action.style] = '';

            if (element.getAttribute('style') === '' ||
                element.style === null) {
                element.removeAttribute('style');
            }
        });
    }

    // Direct children (> *) may have children (*) to be clean too
    const cleanChildrenChildren: Promise<void>[] =
        Array.from(span.children).map((element: Element) => {
            return cleanChildren(action, (element as HTMLElement));
        });

    if (!cleanChildrenChildren || cleanChildrenChildren.length <= 0) {
        return;
    }

    await Promise.all(cleanChildrenChildren);
}


function isContainer(containers: string, element: Node | null): boolean {
    if (element == null) return false
    const containerTypes: string[] = containers.toLowerCase().split(',');
    // @ts-ignore
    return element && element.nodeName && containerTypes.indexOf(element.nodeName.toLowerCase()) > -1;
}

async function replaceSelection(container: HTMLElement,
                                action: ExecCommandStyle,
                                selection: Selection,
                                containers: string) {
    const range: Range = selection.getRangeAt(0);
    const fragment: DocumentFragment = range.extractContents();

    console.log('range', range)
    const startSelection = range.startOffset
    const endSelection = range.endOffset

    if (startSelection == endSelection) {
        const bodyText = textField.document.getElementsByTagName("body")[0].innerText
        const bodyHtml = textField.document.getElementsByTagName("body")[0].innerHTML
        console.log("True", bodyHtml != bodyText)

        if (bodyText != bodyHtml) {
            if (container.style['text-decoration'] === "underline") {
                container.style['text-decoration'] = "inherit"
            } else {
                container.style['text-decoration'] = "underline"
            }
            console.log("Container After", container)
        } else {
            console.log("True Fuck")

            const div = document.createElement("div")
            const style = await getStyleValue(container, action, containers)
            console.log("styl", style)
            div.style[action.style] = style
            console.log("div", div)
            div.setAttribute("contentEditable", "true")
            // @ts-ignore
            div.innerText = selection.anchorNode?.data
            div.appendChild(fragment)
            range.insertNode(div)

            const newRange = document.createRange()
            // var sel = window.getSelection()
            // @ts-ignore
            newRange.setStart(div.childNodes[0], 2)
            newRange.collapse(true)

            selection.removeAllRanges()
            selection.addRange(newRange)

            setTimeout(function() {
                textField.focus();
            }, 0);
        }

        return
    }

    console.log("fragment", fragment)
    const span: HTMLElement =
        await createSpan(container, action, containers);
    console.log("Span", span);
    span.appendChild(fragment);
    // textField.document.body.appendChild(container)
    // container.appendChild(fragment);
    // container.appendChild(span);
    // let fuck = document.createElement("div")
    // container.appendChild(fuck)
    // console.log("Container", container)

    await cleanChildren(action, span);
    await flattenChildren(action, span);

    range.insertNode(span);
    selection.selectAllChildren(span);
}

async function createSpan(container: HTMLElement,
                          action: ExecCommandStyle,
                          containers: string): Promise<HTMLElement> {
    let span: HTMLElement = document.createElement('span');
    let style = await getStyleValue(container, action, containers);

    span.style[action.style] = style
    span.setAttribute("contentEditable", "true")
    span.innerText = " "

    console.log("Style", style)
    container.appendChild(span)

    return span;
}

async function flattenChildren(action: ExecCommandStyle,
                               span: HTMLSpanElement) {
    if (!span.hasChildNodes()) {
        return;
    }

    // Flatten direct (> *) children with no style
    const children: HTMLElement[] =
        Array.from(span.children).filter((element: Element) => {
            const style: string | null = (element as HTMLElement).getAttribute('style');
            return !style || style === '';
        }) as HTMLElement[];

    if (children && children.length > 0) {
        children.forEach((element: HTMLElement) => {
            const styledChildren: NodeListOf<HTMLElement> =
                element.querySelectorAll('[style]');
            if (!styledChildren || styledChildren.length === 0) {
                const text: Text =
                    document.createTextNode(element.textContent || '');
                element.parentElement?.replaceChild(text, element);
            }
        });

        return;
    }

    // Direct children (> *) may have children (*) to flatten too
    const flattenChildrenChildren: Promise<void>[] =
        Array.from(span.children).map((element: Element) => {
            return flattenChildren(action, element as HTMLElement);
        });

    if (!flattenChildrenChildren ||
        flattenChildrenChildren.length <= 0) {
        return;
    }

    await Promise.all(flattenChildrenChildren);
}