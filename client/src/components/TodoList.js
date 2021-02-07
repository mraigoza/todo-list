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

        this.updateList()
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    //Check if it's a number
    isNumeric(value) {
        return /^\d+$/.test(value);
    }
    //Add function
    handleSubmit(event) {
        if (this.state.value !== ""){
            //if number then delete that index from json file, else add it
            if (this.isNumeric(this.state.value)){
                post("/delete", [this.state.value, "delete task"])
                .then(resp => {
                    console.log(resp);
                }).catch(err =>{
                    console.log("Error occured:", err);
                })
            } else {
                post("/insert", [this.state.items.length, this.state.value])
                .then(resp => {
                    console.log(resp);
                }).catch(err =>{
                    console.log("Error occured:", err);
                })
            }

            get("/read")
            .then(resp => {
                this.state.items = resp
                console.log(resp);
                console.log("Got a good response")
            }).catch(err => {
                console.log(err);
                console.log("Got an error")
            })
        } else {
            alert('No task was submitted.');
            event.preventDefault();
        }
        console.log(this.state.items);
        // event.preventDefault();
    }

    //Delete function

    updateList(){
        console.log("Updating List!!")
        get("/read")
        .then(resp => {
            this.setState({items: resp});
            console.log(resp);
            console.log("Got a good response")
        }).catch(err => {
            console.log(err);
            console.log("Got an error")
        })
    }

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
