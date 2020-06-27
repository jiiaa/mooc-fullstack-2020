describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Root User',
      username: 'root',
      password: 'erittainsalainen'
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    const userOther = {
      name: 'Other User',
      username: 'other',
      password: 'eisalainen'
    };
    cy.request('POST', 'http://localhost:3003/api/users', userOther);
    cy.visit('http://localhost:3000')
  });

  it('Login form is shown', function() {
    cy.get('#username');
    cy.get('#password');
    cy.contains('Login');
  });

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root');
      cy.get('#password').type('erittainsalainen');
      cy.get('#login-button').click();
      cy.contains('Root User logged in.');
    });

    it('fails with woring credectials', function() {
      cy.get('#username').type('root');
      cy.get('#password').type('eisalainen');
      cy.get('#login-button').click();
      
      cy.get('.notification')
        .should('contain', 'Bad credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)');

      cy.get('html').should('not.contain', 'Root User logged in.');
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'erittainsalainen' });
    });

    it('a new blog can be created', function() {
      cy.contains('Add Blog').click();
      cy.get('#title').type('Cypress tests are fun');
      cy.get('#author').type('Cypress Bot');
      cy.get('#linkUrl').type('cypress.io');
      cy.get('#AddBlog').click();
      cy.contains('Cypress tests are fun by Cypress Bot');
    });

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.addBlog({
          title: 'Blog added with Cypress POST',
          author: 'Cypress Bot',
          url: 'blogs.cypress.io'
        })
      })

      it('a blog can be liked', function() {
        cy.contains('Show Details').click();
        cy.contains('Likes: 0');
        cy.contains('Like').click();
        cy.contains('Likes: 1');


      })

      it('a blog can be deleted by the right user', function() {
        cy.contains('Blog added with Cypress POST');
        cy.contains('Show Details').click();
        cy.contains('Delete Blog').click();
        cy.get('.notification')
          .should('contain', 'Blog was deleted.')
          .and('have.css', 'color', 'rgb(255, 0, 0)');
        cy.get('.blog-section').should('not.exist');
      })
    })

    describe('when a blog exists', function() {
      beforeEach(function() {
        cy.addBlog({
          title: 'You cannot delete other blogs',
          author: 'John Doe',
          url: 'noname.com'
        })
        cy.login({ username: 'other', password: 'eisalainen' });
      })
      it('only the owner can delete it', function() {
        cy.contains('You cannot delete other blogs');
        cy.contains('Show Details').click();
        cy.get('.hide-by-default').should('not.contain', 'Delete Blog');
      })
    })

    describe('and several blogs exists', function() {
      beforeEach(function() {
        cy.addBlog({
          title: 'A blog one',
          author: 'Author One',
          url: 'blog.one.com'
        })
        cy.addBlog({
          title: 'A blog two',
          author: 'Author Two',
          url: 'blog.two.com'
        })
        cy.addBlog({
          title: 'A blog three',
          author: 'Author Three',
          url: 'blog.three.com'
        })
      })

      it('those are arranged in order of # of ilkes', function() {
        cy.get('.blog-section').contains('A blog two').parent().find('button').click();
        cy.get('.blog-section').contains('A blog two').parent().parent().find('button').contains('Like').click().click();
        cy.get('.blog-section').contains('A blog two').parent().find('button').click();
        cy.get('.blog-section').contains('A blog one').parent().find('button').click();
        cy.get('.blog-section').contains('A blog one').parent().parent().find('button').contains('Like').click().click().click();
        cy.get('.blog-section').contains('A blog one').parent().find('button').click();
        cy.get('.blog-title').then( titles => {
          cy.wrap(titles[0]).should('contain', 'A blog three');
          cy.wrap(titles[1]).contains('A blog two');
        })
      })
    })
  })
});
