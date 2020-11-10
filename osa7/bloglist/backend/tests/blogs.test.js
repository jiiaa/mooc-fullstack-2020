const listHelper = require('../utils/list_helper');

test('Dummy returns one (1).', () => {
  const blogs = [];
  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});


describe('Total likes', () => {
  test('of the list of one blog is the value of that blogs likes', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(7);
  });

  test('of the list of many blogs is the sum of all likes', () => {
    expect(listHelper.totalLikes(listWithManyBlogs)).toBe(86);
  });
});

describe('Blog with most likes', () => {
  test('out of the list of many blogs', () => {
    const correctResult = {
      title: listWithManyBlogs[0].title,
      author: listWithManyBlogs[0].author,
      likes: listWithManyBlogs[0].likes
    };
    expect(listHelper.favouriteBlog(listWithManyBlogs)).toEqual(correctResult);
  });
});

describe('Author with most...', () => {
  test('blogs out of the list of many blogs', () => {
    const correctResult = {
      author: 'Robert C. Martin',
      blogs: 3
    };
    const response = listHelper.mostBlogs(listWithManyBlogs);
    expect(response).toEqual(correctResult);
  });

  test('likes in all of her/his blogs', () => {
    const correctResult = {
      author: 'Edsger W. Dijkstra',
      likes: 37
    };
    const response = listHelper.mostLikes(listWithManyBlogs);
    expect(response).toEqual(correctResult);
  });
});

const listWithOneBlog = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  }
];

const listWithManyBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 25,
    __v: 0
  },
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422a851b54a676234d27f7',
    title: 'React and fat arrow',
    author: 'Michael Chan',
    url: 'https://reactfatarrow.com/',
    likes: 20,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];
