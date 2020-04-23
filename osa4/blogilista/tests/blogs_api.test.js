const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

describe('When the database is always initialized first...', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    console.log('Database cleared');

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
    console.log('Database initialized');
  });

  test('All blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('The blog object includes a field called "id" which is defined', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });

  describe('viewing a specific blog', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.getAllBlogs();
      const blogToView = blogsAtStart[1];

      const responseBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(responseBlog.body).toEqual(blogToView);
    });
  });

  describe('Addition of a blog', () => {
    test('Succeeds with a staus 201 and valid blog content', async () => {
      const newBlog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const allBlogs = await helper.getAllBlogs();
      expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1);

      const titles = allBlogs.map(blog => blog.title);
      expect(titles).toContain('React patterns');
    });

    test('With an undefined likes value sets the value to zero', async () => {
      const newBlog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/',
        likes: null
      };

      const response = await api.post('/api/blogs').send(newBlog);
      expect(response.body.id).toContain(0);
    });

    test('With no title field nor url field returns an error code 400', async () => {
      const newBlog = {
        title: '',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/',
        likes: null
      };

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400);
    });
  });

  describe('Deletion of a blog', () => {
    test('succeeds with status code 204 when id is valid', async () => {
      const blogsAtStart = await helper.getAllBlogs();
      const deleteBlog = blogsAtStart[1];

      await api
        .delete(`/api/blogs/${deleteBlog.id}`)
        .expect(204);

      const blogsAtEnd = await helper.getAllBlogs();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length -1);

      const titles = blogsAtEnd.map(b => b.title);
      expect(titles).not.toContain(deleteBlog.title);
    });
  });

  describe('Editing a blog by updating the number of likes', () => {
    test('succeeds with the updated blog data returned', async () => {
      const blogsAtStart = await helper.getAllBlogs();
      const updateBlog = {
        title: blogsAtStart[1].title,
        author: blogsAtStart[1].author,
        url: blogsAtStart[1].url,
        likes: 82
      };

      const updatedBlog = await api.put(`/api/blogs/${blogsAtStart[1].id}`).send(updateBlog);
      expect(updatedBlog.body.likes).toEqual(updateBlog.likes);
    });
  });

});

afterAll(() => {
  mongoose.connection.close();
});

