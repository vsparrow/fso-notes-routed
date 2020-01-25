import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,
	   Route, Link, Redirect, withRouter} from 'react-router-dom' 
import {Table, Form, Button, Alert, Navbar, Nav} from 'react-bootstrap'

const notes = [
	{
	  id: 1,
	  content: 'HTML on helppoa',
	  important: true,
	  user: 'Matti Luukkainen'
	},
	{
	  id: 2,
	  content: 'Selain pystyy suorittamaan vain javascriptiä',
	  important: false,
	  user: 'Matti Luukkainen'
	},
	{
	  id: 3,
	  content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
	  important: true,
	  user: 'Arto Hellas'
	}
]

const users =  ['Matti Luukkainen', 'Juha Tauriainen', 'Arto Hellas']


const Home = ()=>(<div><h2>TKTL notes app</h2></div>)
const Users = ()=>(<div><h2>Users</h2><ul>{users.map(u=><li key={u}>{u}</li>)}</ul></div>)
/////////////////////////////////////
const LoginNoHistory = (props)=>{
	const onSubmit=(e)=>{e.preventDefault();props.onLogin('Ironman');props.history.push('/')}
	return(
		<div>
			<h2>login</h2>
			<Form onSubmit={onSubmit}>
				<Form.Group>
					<Form.Label>username:</Form.Label>
					<Form.Control type="text" name="username"/>
					<Form.Label>password:</Form.Label>
					<Form.Control type="password" />
					<Button type="submit" variant="primary">login</Button>
				</Form.Group>
			</Form>
		</div>
	)
	//preBootstrp
	// return(
	// 	<div>
	// 		<h2>login</h2>
	// 		<form onSubmit={onSubmit}>
	// 			<div>username: <input/></div>
	// 			<div>password <input type='password'/></div>
	// 			<button type="submit">login</button>
	// 		</form>
	// 	</div>
	// )
}
const Login = withRouter(LoginNoHistory)
/////////////////////////////////////
const Note = ({note}) =>(
	<div>
		<h2>{note.content}</h2>
		<div>{note.user}</div>
		<div><strong>{note.important ? 'important' : ''}</strong></div>
	</div>
)
/////////////////////////////////////
//prebootstrap notes
// const Notes = props => (
// 	<div>
// 		<h2>Notes</h2>
// 		<ul>{props.notes.map(note =>
// 			<li key={note.id}>
// 				<Link to={`/notes/${note.id}`}>{note.content}</Link>
// 			</li>							
// 		)}</ul>
// 	</div>
// )
const Notes = props => (
	<div>
		<h2>Notes</h2>
		<Table striped>
			<tbody>
				{props.notes.map(note=><tr key={note.id}><td><Link to={`/notes/${note.id}`}>{note.content}</Link></td><td>{note.user}</td></tr>)}
			</tbody>
		</Table>
	</div>
)
/////////////////////////////////////
const Navigation = ({padding,user}) => (
	<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
		<Navbar.Toggle aria-controls = "responsive-navbar-nav"/>
		<Navbar.Collapse id="responsive-navbar-nav">
		<Nav className="mr-auto">
			<Nav.Link href="#" as="span"><Link style={padding} to="/">home</Link></Nav.Link>
			<Nav.Link href="#" as="span"><Link style={padding} to="/notes">notes</Link></Nav.Link>
			<Nav.Link href="#" as="span"><Link style={padding} to="/users">users</Link></Nav.Link>
			<Nav.Link href="#" as="span">{user ? <em>{user} logged in</em>:<Link to="/login">login</Link>}</Nav.Link>
		</Nav>
		</Navbar.Collapse>
	</Navbar>

)

//prebootstrap navigation
// <div>
// 	<Link style={padding} to='/'>home</Link>
// 	<Link style={padding} to='/notes'>notes</Link>
// 	<Link style={padding} to='/users'>users</Link>
// 	{user ? <em>{user} logged in</em> : <Link to="/login">login</Link>}
// </div>
/////////////////////////////////////

const App = ()=>{
	const [user,setUser] = useState(null)
	const [message, setMessage] = useState(null)
	const padding = {padding: 5}
	//helper
	const noteById = id => notes.find(note => note.id === Number(id))
	const login = (user) => {setUser(user); setMessage(`welcome ${user}`); setTimeout(()=>{setMessage(null)},5000)}

	return (
		<div className="container">
			<Router>
				<div>
					{(message && <Alert variant="success">{message}</Alert>)}
					<Navigation padding={padding} user={user}/>

					<Route exact path ="/" render={()=><Home />}/>
					<Route exact path="/notes" render={()=><Notes notes={notes}/>}/>
					<Route exact path="/notes/:id" render={({match})=>
						<Note note={noteById(match.params.id)}/>
					}/>
					<Route path="/login" render={()=><Login onLogin={login}/> }/>
					<Route path="/users" render={()=> user? <Users /> : <Redirect to="/login"/>}/>
					<div><br/><em>Note app, Department of Computer Science 2019</em></div>
				</div>
			</Router>
		</div>
	)
}//App

ReactDOM.render(<App />, document.getElementById('root'))

