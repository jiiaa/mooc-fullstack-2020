import React, { useState } from 'react'
import {
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch
} from 'react-router-dom';
import useField from './hooks/index';

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/">Anecdotes</Link>
      <Link style={padding} to="/create">Create New</Link>
      <Link style={padding} to="/about">About</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote =>
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div><br/>
      <div>For more info see <a href={anecdote.info}>{anecdote.info}</a></div>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => {
  const margin = {
    marginTop: 20
  }
  return (
    <div style={margin}>
      Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

      See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
  )
}

const Notification = ({ content }) => {
  const style = {
    marginTop: 10,
    marginBottom: 10,
    border: 'solid',
    borderWidth: 1,
    borderColor: 'green',
    padding: 10,
  }

  return (
    <div style={style}>
      A new anecdote "{content}" created.
    </div>
  )
}

const CreateNew = (props) => {
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
  }

  const handleReset = e => {
    e.preventDefault();
    content.onChange(e);
    author.onChange(e);
    info.onChange(e);
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content&nbsp;
          <input {...content} />
        </div>
        <div>
          author&nbsp;
          <input {...author} />
        </div>
        <div>
          url for more info&nbsp;
          <input {...info} />
        </div>
        <button>Create</button><button onClick={handleReset}>Reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const history = useHistory();
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    },
    {
      content: 'Before software can be reusable if first has to be usable',
      author: 'Ralph Johnson',
      info: 'http://www.adrianmccarthy.com/blog/?p=15',
      votes: 0,
      id: '3'
    },
    {
      content: 'When debugging, novices insert corrective code; experts remove defective code.',
      author: 'Richard Pattis',
      info: 'http://www.sysprog.net/quotbugs.html',
      votes: 0,
      id: '4'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(anecdote.content);
    history.push('/');
    setTimeout(() => {
      setNotification('');
    }, 10000);
  }

  const match = useRouteMatch('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find(item => item.id === match.params.id)
    : null

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <Notification content={notification} />}
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>
      <Footer />
    </div>
  )
}

export default App;
