const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes;
  };
  return blogs.reduce(reducer, 0);
};

const favouriteBlog = (blogs) => {
  const max = blogs.reduce((iMax, element, i, arr) => element.likes > arr[iMax].likes ? i : iMax, 0);
  const response = {
    title: blogs[max].title,
    author: blogs[max].author,
    likes: blogs[max].likes
  };
  return response;
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
};
