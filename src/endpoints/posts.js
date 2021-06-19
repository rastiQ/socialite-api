import { Post } from '../models/post.js'

export const getPost = (postID) => {
    return new Promise((resolve, reject) => {
        Post.findOne({_id: postID}).then(post => {
            if(post) resolve(post)
            else reject('no_post_found')
        })
    })
}

export const createPost = (content) => {

}

export const deletePost = (postID) => {

}