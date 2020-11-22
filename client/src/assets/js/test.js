let selection = textField.document.getSelection()
let anchorNode = selection.anchorNode;
let parentElement = anchorNode.parentElement
let range = selection.getRangeAt(0)
let fragment = range.extractContents()