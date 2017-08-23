import React, {Component} from 'react';

export default class Task extends Component {
  
 
    render() {
        return(
            <div className="task-container">

                <div style={this.props.style} className={this.props.isChecked} key={this.props.index}> {this.props.taskItem.item}</div> 
                <button disabled={this.props.isComplete} onClick={(e)=>this.props.complete(this.props.taskItem)}>Complete</button>
                <button onClick={(e)=>this.props.delete(this.props.taskItem, this.props.list)}>Delete</button>
            </div>
            
        )
    }
}