export function getSrcFromPostContent(content: string) {
    const srcReg = /<img\s+src=["'](.+?)["'].+?>/
    let match = content.match(srcReg)
    if (match == null) return null
    return match[1]
}

export function extractFirstText(content: string) {
    const ps = new DOMParser().parseFromString(content, 'text/html').querySelectorAll("p")
    for (let p of ps as any) {
        if (p.textContent.length > 120) {
            return p.textContent
        }
    }

    return ""
}

export function extractAllText(content: string) {
    const result: string[] = []
    new DOMParser().parseFromString(content, 'text/html').querySelectorAll("p").forEach(p => {
        result.push(p.textContent ?? "")
    })
    return result
}

export function removePostImageFromPostContent(content: string) {
    return content.replace(/<figure.*>.*?<\/figure>/ig, "")
}

export function extractAttributes(htmlText: string) {
    let regex = new RegExp('[\\s\\r\\t\\n]*([a-z0-9\\-_]+)[\\s\\r\\t\\n]*=[\\s\\r\\t\\n]*([\'"])((?:\\\\\\2|(?!\\2).)*)\\2', 'ig');
    let attributes = {};
    let match;
    while ((match = regex.exec(htmlText))) {
        attributes[match[1]] = match[3];
    }

    return attributes
}

export function getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const camelize = (string: string) => string.replace(/-([a-z])/gi, (s, group) => group.toUpperCase());

// 1ˢᵗ step logic which calls the 2ⁿᵈ step logic
export function style2object(style: string | null) {
    if (style == null) return ""
    return style.split(';').filter(s => s.length)
        .reduce((a, b) => {
            const keyValue = b.split(':');
            a[camelize(keyValue[0]).trim()] = keyValue[1].trim();
            return a;
        }, {});
}