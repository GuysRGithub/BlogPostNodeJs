import {getSrcFromPostContent, removePostImageFromPostContent} from "../helpers/data_process_helper";

interface Post {
    _id: string,
    title: string,
    author: any,
    content: string,
    createdAt: string
}

export type PostsResponse = {
    success: boolean,
    doc: Array<Post>,
}

export type PostResponse = {
    success: boolean,
    doc: Post,
}