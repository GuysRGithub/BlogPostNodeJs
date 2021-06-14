import {getSrcFromPostContent, removePostImageFromPostContent} from "../helpers/data_process_helper.js";
class PostViewModel {
    constructor(post) {
        const date = new Date(parseInt(post._id.toString().substring(0, 8), 16) * 1000);
        this._id = post._id;
        this.title = post.title;
        this.author = post.author;
        this.content = removePostImageFromPostContent(post.content);
        this.src = getSrcFromPostContent(post.content);
        // noinspection JSCheckFunctionSignatures
        this.createdAt = date.toString('dd MMM yyyy')
    }
}

export default PostViewModel