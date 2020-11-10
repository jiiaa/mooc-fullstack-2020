const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');
const Blog = require('../models/blog');

describe('When there is initially one user at the database', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const pwHash = await bcrypt.hash('salasana', 10);
    const user = new User({
      username: 'root',
      name: 'root user',
      pwHash
    });

    await user.save();
  });

  test('Adding a new user with a fresh username succeeds', async () => {
    const usersAtStart = await helper.getAllUsers();

    const newUser = {
      username: 'akuankka',
      name: 'Aku Ankka',
      password: 'salainen'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.getAllUsers();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test('Adding a new user with the same username fails with proper error message', async () => {
    const repeatUser = {
      username: 'root',
      name: 'User Root',
      password: 'secret'
    };

    const result = await api
      .post('/api/users')
      .send(repeatUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');
  });

  test('Adding a new user with a username less than 3 characters fails', async () => {
    const invalidUser = {
      username: 'ab',
      name: 'too short username',
      password: 'secret'
    };

    const result = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Username or password is shorter than 3 characters');
  });

  test('Adding a new user with a password less than 3 characters fails', async () => {
    const invalidUser = {
      username: 'testuser',
      name: 'test user',
      password: 'a1'
    };

    const result = await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('Username or password is shorter than 3 characters');
  });
});

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
    test('Succeeds with a status 201 and valid blog content', async () => {
      const allUsers = await helper.getAllUsers();
      const oneUser = allUsers[0];
      const token = await helper.getToken('root');

      const newBlog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        userId: oneUser.id
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}` )
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const allBlogs = await helper.getAllBlogs();
      expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1);

      const titles = allBlogs.map(blog => blog.title);
      expect(titles).toContain('React patterns');
    });

    test('without a token fails with a status 401', async () => {
      const allUsers = await helper.getAllUsers();
      const oneUser = allUsers[0];

      const newBlog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        userId: oneUser.id
      };

      const response = await api
        .post('/api/blogs')
        .set('Authorization', 'bearer' )
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/);

      expect(response.body.error).toContain('Invalid token');
    });

    test('With an undefined likes value sets the value to zero', async () => {
      const allUsers = await helper.getAllUsers();
      const oneUser = allUsers[0];
      const token = await helper.getToken('root');

      const newBlog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/',
        likes: null,
        userId: oneUser.id
      };

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}` )
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      expect(response.body.id).toContain(0);
    });

    test('With no title field returns an error code 400', async () => {
      const allUsers = await helper.getAllUsers();
      const oneUser = allUsers[0];
      const token = await helper.getToken('root');

      const newBlog = {
        title: '',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/',
        likes: null,
        userId: oneUser.id
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}` )
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

    test('With no url field returns an error code 400', async () => {
      const allUsers = await helper.getAllUsers();
      const oneUser = allUsers[0];
      const token = await helper.getToken('root');

      const newBlog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: '',
        likes: null,
        userId: oneUser.id
      };

      await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}` )
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/);
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

