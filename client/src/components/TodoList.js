import {Component} from 'react'
import {get, post} from "../api"

//Renders todo-list and your add / delete functions should be contained here
class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            items: []
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    //Add function
    handleSubmit(event) {
        if (this.state.value !== ""){
            //alert('A task was submitted: ' + this.state.value);
            //event.preventDefault();
            var newItem = {
				text: this.state.value,
                // key: Date.now()
                key: this.state.items.length
            };
            // get("/index")
            // .then(resp => {
            //     console.log(resp);
            // }).catch(err => {
            //     console.log(err);
            // })

            // post("/insert", {"task1" : "get food"})
            post("/insert", ["task1", "get food"])
            .then(resp => {
                console.log(resp);
            }).catch(err =>{
                console.log("Error occured:", err);
            })

            this.state.items.push(newItem);
        } else {
            alert('No task was submitted.');
            event.preventDefault();
        }
        console.log(this.state.items);
        event.preventDefault();
    }

    //Delete function

    render() {
        return (
            <div>
                <h1>Marco Raigoza's Todo-list</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        New Task:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <ul className="list-group">
                    {this.state.items.map(item => (
                        <li key={item.key} className="list-group-item">{item.text}</li>
                    ))}
                </ul>
            </div>
        ) 
    }
}

export default TodoList