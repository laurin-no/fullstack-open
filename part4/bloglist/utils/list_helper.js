const _ = require('lodash')

const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((prev, cur) => prev + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
    const fav = blogs.reduce((prev, cur) => prev.likes > cur.likes ? prev : cur, [])

    return {
        title: fav.title,
        author: fav.author,
        likes: fav.likes
    }
}

const findTopAuthor = (blogs, indicator, calculator) =>
    _.chain(blogs)
        .groupBy('author')
        .map((items, author) => ({author, [indicator]: calculator(items)}))
        .orderBy(indicator, 'desc')
        .head()
        .value()

const mostBlogs = (blogs) =>
    findTopAuthor(blogs, 'blogs', (items) => items.length)

const mostLikes = (blogs) =>
    findTopAuthor(blogs, 'likes', (items) => _.sumBy(items, 'likes'))

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}