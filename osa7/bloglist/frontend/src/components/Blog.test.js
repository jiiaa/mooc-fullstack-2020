import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';
import Blog from './Blog';
import AddBlog from './AddBlog';

const blog = {
  title: 'Otsikko',
  url: 'domain.fi',
  likes: 124,
  author: 'Me, myself and I',
  user: 123
};
const user = {
  id: 123
};

describe('<Blog /> ...', () => {
  let component;
  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} addLikes={mockHandler} handleDelete={mockHandler} />
    )
  });

  test('renders title and author elements', () => {
    expect(
      component.container.querySelector('.blog-title')
    ).toBeDefined();
    expect (
      component.container.querySelector('.blog-author')
    ).toBeDefined();
  });

  test('renders title and author content', () => {
    expect(
      component.container.querySelector('.blog-section')
    ).toHaveTextContent('Otsikko')
    expect(
      component.container.querySelector('.blog-section')
    ).toHaveTextContent('Me, myself and I')
  })

  test('renders the blog details hidden at start', () => {
    expect(
      component.container.querySelector('.hide-by-default')
    ).toHaveStyle('display: none');
  })

  test('clicking the Show Details button displays the blog details', async () => {
    const button = component.getByText('Show Details');
    fireEvent.click(button);

    expect(
      component.container.querySelector('.hide-by-default')
    ).not.toHaveStyle('display: none');
  });

  test('after clicking the Like button two times, the event handler is called twice', () => {
    const btn = component.getByText('Like');
    fireEvent.click(btn);
    fireEvent.click(btn);

    expect(mockHandler.mock.calls).toHaveLength(2);
  })
});

describe('<AddBlog /> ...', () => {
  let component;
  const handleAdd = jest.fn();

  beforeEach(() => {
    component = render(
      <AddBlog handleAddBlog={handleAdd} />
    )
  });

  test('calls the event handler and sends form data as parameters', () => {
    const titleInput = component.container.querySelector('#title');
    const authorInput = component.container.querySelector('#author');
    const linkUrlInput = component.container.querySelector('#linkUrl');
    const form = component.container.querySelector('form');

    fireEvent.change(titleInput, {
      target: { value: 'Uuden testiblogin otsikko' }
    });
    fireEvent.change(authorInput, {
      target: { value: 'mooc webmaster' }
    });
    fireEvent.change(linkUrlInput, {
      target: { value: 'www.domain.fi' }
    });
    fireEvent.submit(form);

    expect(handleAdd.mock.calls).toHaveLength(1)
    expect(handleAdd.mock.calls[0][0].title).toBe('Uuden testiblogin otsikko');
    expect(handleAdd.mock.calls[0][0].author).toBe('mooc webmaster');
    expect(handleAdd.mock.calls[0][0].url).toBe('www.domain.fi');
  });
})