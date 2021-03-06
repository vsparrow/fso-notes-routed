import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router,
	   Route, Link, Redirect, withRouter} from 'react-router-dom' 
import { Navbar, Nav} from 'react-bootstrap'
import {Container, Table, Form, Button, Message, Menu} from 'semantic-ui-react'


const notes = [
	{ id: 1, content: 'HTML on helppoa', important: true, user: 'Matti Luukkainen'},
	{ id: 2, content: 'Selain pystyy suorittamaan vain javascriptiä', important: false, user: 'Matti Luukkainen'},
	{ id: 3, content: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST', important: true, user: 'Arto Hellas'}
]
const users =  ['Matti Luukkainen', 'Juha Tauriainen', 'Arto Hellas']

/////////////////////////////////////
const Home = ()=>(<div><h2>TKTL notes app</h2></div>)
/////////////////////////////////////
const Users = ()=>(<div><h2>Users</h2><ul>{users.map(u=><li key={u}>{u}</li>)}</ul></div>)
/////////////////////////////////////
const LoginNoHistory = (props)=>{
	const onSubmit=(e)=>{e.preventDefault();props.onLogin('Ironman');props.history.push('/')}
	return(
		<div>
			<h2>login</h2>
			<Form onSubmit={onSubmit}>
				<Form.Field>
					<label>username:</label>
					<input name="username"/>
				</Form.Field>
				<Form.Field>
					<label>password:</label>
					<input type="password" />
					<Button type="submit">login</Button>
				</Form.Field>
			</Form>
		</div>
	)
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

const Notes = props => (
	<div>
		<h2>Notes</h2>
		<Table striped celled>
			<Table.Body>
				{props.notes.map(note=>
					<Table.Row key={note.id}>
						<Table.Cell>
							<Link to={`/notes/${note.id}`}>{note.content}</Link>
						</Table.Cell>
						<Table.Cell>{note.user}</Table.Cell>
					</Table.Row>
				)}
			</Table.Body>
		</Table>
	</div>
)
/////////////////////////////////////
const Navigation = ({padding,user}) => (
	<Menu inverted>
		<Menu.Item link><Link to="/">home</Link></Menu.Item>
		<Menu.Item><Link to="/notes">notes</Link></Menu.Item>
		<Menu.Item><Link to="/users">users</Link></Menu.Item>
		<Menu.Item>
			{user ? <em>{user} logged in</em> :<Link to="/login">login</Link>}
		</Menu.Item>
	</Menu>
)	
// (
// 	<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
// 		<Navbar.Toggle aria-controls = "responsive-navbar-nav"/>
// 		<Navbar.Collapse id="responsive-navbar-nav">
// 		<Nav className="mr-auto">
// 			<Nav.Link href="#" as="span"><Link style={padding} to="/">home</Link></Nav.Link>
// 			<Nav.Link href="#" as="span"><Link style={padding} to="/notes">notes</Link></Nav.Link>
// 			<Nav.Link href="#" as="span"><Link style={padding} to="/users">users</Link></Nav.Link>
// 			<Nav.Link href="#" as="span">{user ? <em>{user} logged in</em>:<Link to="/login">login</Link>}</Nav.Link>
// 		</Nav>
// 		</Navbar.Collapse>
// 	</Navbar>
// )

/////////////////////////////////////

const App = ()=>{
	const [user,setUser] = useState(null)
	const [message, setMessage] = useState(null)
	const padding = {padding: 5}
	//helper
	const noteById = id => notes.find(note => note.id === Number(id))
	const login = (user) => {setUser(user); setMessage(`welcome ${user}`); setTimeout(()=>{setMessage(null)},5000)}

	return (
		<Container>
			<Router>
				<div>
					{(message && <Message success>{message}</Message>)}
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
		</Container>
	)
}//App

ReactDOM.render(<App />, document.getElementById('root'))

