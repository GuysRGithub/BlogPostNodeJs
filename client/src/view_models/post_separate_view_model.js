import {getSrcFromPostContent, removePostImageFromPostContent} from "../helpers/data_process_helper.js";

class PostSeparateViewModel {
    constructor(post) {
        this._id = post._id;
        this.title = post.title;
        this.author = post.author;
        this.content = removePostImageFromPostContent(post.content);
        this.src = getSrcFromPostContent(post.content);
        this.createdAt = post.createdAt;
    }
}

export default PostSeparateViewModel