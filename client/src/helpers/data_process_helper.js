exports.getSrcFromPostContent = (content) => {
    const srcReg = /<img\s+src=["'](.+?)["'](?:.+?)>/
    let match = content.match(srcReg)
    if (match == null) return null
    return match[1]
}

exports.removePostImageFromPostContent = (content) => {
    return content.replace(/<figure.*>.*?<\/figure>/ig, "")
}