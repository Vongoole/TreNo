export const constructPagination = (posts, elementsPerPage = 4) => {

    const totPages = Math.ceil(posts.length / elementsPerPage)

    let res = []
    let pageIndex = 0
    let postIndex = 0

    for (pageIndex; pageIndex < totPages; pageIndex++) {
        res.push([...posts].slice(postIndex, postIndex + elementsPerPage))
        postIndex += elementsPerPage
    }

    return {pages: res, total: totPages}
}