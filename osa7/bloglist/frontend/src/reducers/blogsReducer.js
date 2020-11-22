import blogService from '../services/blogs';

const byLikes = (a, b) => b.likes - a.likes;

const blogsReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_BLOGS':
      const blogs = action.blogs;
      return blogs.sort(byLikes);
    case 'ADD_BLOG':
      return state.concat(action.addedBlog).sort(byLikes);
    case 'LIKE_BLOG':
      const likedBlog = action.data;
      return state.map(a => a.id === likedBlog.id ? likedBlog : a).sort(byLikes);
    case 'COMMENT_BLOG':
      const commentedBlog = action.data;
      return state.map(b => b.id === commentedBlog.id ? commentedBlog : b).sort(byLikes);
    case 'DEL_BLOG':
      const id = action.id;
      return state.filter(a => a.id !== id );
    default:
      return state;
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  };
};

export const addBlog = (newBlog) => {
  return async dispatch => {
    const addedBlog = await blogService.addBlog(newBlog);
    dispatch({
      type: 'ADD_BLOG',
      addedBlog
    });
  };
};

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = {...blog, votes: blog.votes + 1 };
    const data = await blogService.addLikes(likedBlog);
    dispatch({
      type: 'LIKE_BLOG',
      data
    });
  };
};

export const commentBlog = (id, comment) => {
  return async dispatch => {
    const commentedBlog = await blogService.addComment(id, comment);
    dispatch({
      type: 'COMMENT_BLOG',
      data: commentedBlog
    });
  };
};

export const removeBlog = (id) =>{
  return async dispatch => {
    const data = await blogService.deleteBlog(id);
    dispatch({
      type: 'DEL_BLOG',
      id
    });
    return data;
  };
};

export default blogsReducer;