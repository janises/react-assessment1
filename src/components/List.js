import React, {Component} from 'react';
import Task from './Task';

export default class List extends Component {
    constructor() {
        super();
        this.state = {
            list: [{item:"breakfast", key:0, isChecked: 'incomplete', isComplete: false}, {item:"lunch", key:1, isChecked: 'incomplete', isComplete: false}, {item:"dinner", key:2, isChecked:'incomplete', isComplete: false}],
            completedTasks: [],
            newTask: "",
            isDisabled: true,
            key:3,
        }
        this.handleInput = this.handleInput.bind(this);
        this.addTask = this.addTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
        this.deleteCompletedTask = this.deleteCompletedTask.bind(this);
    }

    handleInput(event) {
        event.preventDefault();
        this.setState({
            newTask: event.target.value,
            isDisabled: false
        })
       
    }

    addTask() {
        this.setState({
            list: this.state.list.concat({item: this.state.newTask, key: this.state.key, isChecked: 'incomplete', isComplete: false}),
            newTask: "",
            isDisabled: true,
            key: this.state.key+1
        })
       
    }

    completeTask(e){
        let tasks = this.state.list.filter(task=> {
            if(e.key === task.key) {
                task.isChecked = 'completed-item';
                task.isComplete = true;
            }
            return task;
        })

        this.setState({
            list: tasks,
            completedTasks: this.state.completedTasks.concat(e)
        })
          
        console.log(tasks)
    }
s
    deleteTask(e) {
      let remainingTasks = this.state.list.filter(task=> {
          return task.key !== e.key;
      });
      this.setState({
        list: remainingTasks
      })   
    }

    deleteCompletedTask(e) {
        let remainingTasks = this.state.completedTasks.filter(task => {
            return task.key !== e.key;
        });
        this.setState({
            completedTasks: remainingTasks
        })
    }
    
    render(){
       const divStyle = {
        paddingRight: 10
       };

        return (
            <div className="container">

                <input value={this.state.newTask} placeholder="task" type='text' onChange={(e)=> this.handleInput(e)}/> 
                <button onClick={this.addTask} disabled={this.state.isDisabled}> Add Task </button>
                <div className="list">
                    <h3>Tasks </h3>
                    
                        {
                            this.state.list.length > 0 ? (
                                this.state.list.map((item)=> {
                                    //if isComplete, className="completed-item" else className="incomplete"
                                    return <Task style={divStyle} isChecked={item.isChecked} index={item.key} taskItem={item} delete={this.deleteTask} isComplete={item.isComplete} complete={this.completeTask}/>
                                     
                                })
                            ) : null
                        }
                    
                </div>
                <div className="completed">
                    <h3>Completed Tasks</h3>
                    <div>
                        {
                            this.state.completedTasks.length > 0 ? (
                            this.state.completedTasks.map((item)=> {
                                return (
                                    <div className="complete">
                                        <div key={item.key} style={divStyle}>{item.item}</div>
                                        <button onClick={(e)=>this.deleteCompletedTask(item)}>Delete</button>
                                    </div>)
                            })) : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}