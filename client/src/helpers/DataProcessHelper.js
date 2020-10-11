exports.getSrcFromPostContent = (content) => {
    const srcReg = /<img\s+src=["'](.+?)["'](?:.+?)>/
    console.log(content)
    let match = content.match(srcReg)
    if (match == null) return ""
    return match[1]
}

exports.removePostImageFromPostContent = (content) => {
    return content.replace(/<figure.*>.*?<\/figure>/ig, "")
}