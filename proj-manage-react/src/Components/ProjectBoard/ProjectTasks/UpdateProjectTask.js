import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { getProjectTask, updateProjectTask } from '../../../actions/BacklogActions';

class UpdateProjectTask extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            projSequence: "",
            summary: "",
            acceptCriteria: "",
            status: "",
            priority: "",
            dueDate: "",
            projectIdentifier: "",
            createDate: "", 
            errors:{}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this); 
    }

    componentWillReceiveProps(nextProps){
        
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
        
        const {
            id,
            projSequence,
            summary,
            acceptCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            createDate
        } = nextProps.project_task;

        this.setState({
            id,
            projSequence,
            summary,
            acceptCriteria,
            status,
            priority,
            dueDate,
            projectIdentifier,
            createDate
        });
    }

    componentDidMount(){
        const {backlog_id, ptId} = this.props.match.params;
        this.props.getProjectTask(backlog_id, ptId, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e){
        e.preventDefault();

        const updateProjTask =  {
            id: this.state.id,
            projSequence: this.state.projSequence,
            summary: this.state.summary,
            acceptCriteria: this.state.acceptCriteria,
            status: this.state.status,
            priority: this.state.priority,
            dueDate: this.state.dueDate,
            projectIdentifier: this.state.projectIdentifier,
            createDate: this.state.createDate
        }

        //axios.patch call here
        //console.log(updateProjTask);
        this.props.updateProjectTask(
            this.state.projectIdentifier, 
            this.state.projSequence,
            updateProjTask, 
            this.props.history);

    }

    render() {
        const {errors} = this.state;
        
        
        return (
            <div>
                <div className="add-PBI">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <Link to={`/projectboard/${this.state.projectIdentifier}`}className="btn btn-light">
                                    Back to Project Board
                                </Link>
                                <h4 className="display-4 text-center">Update Project Task</h4>
                                <p className="lead text-center">
                                    Project Name: {this.state.projectIdentifier} | 
                                    Project Task ID:{" "} {this.state.projSequence}</p>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input type="text" 
                                            className={classnames("form-control form-control-lg",{
                                                "is-invalid": errors.summary
                                            })}
                                         name="summary" value={this.state.summary} 
                                         onChange = {this.onChange}
                                         placeholder="Project Task summary" 
                                         />{errors.summary && (
                                                <div className="invalid-feedback">
                                                    {errors.summary}
                                                </div>
                                            )}
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control form-control-lg" 
                                         placeholder="Acceptance Criteria" 
                                            name="acceptCriteria"value={this.state.acceptCriteria}
                                            onChange={this.onChange}></textarea>
                                    </div>
                                    <h6>Due Date</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control form-control-lg" 
                                         name="dueDate" value={this.state.dueDate}
                                         onChange= {this.onChange} />
                                    </div>
                                    <div className="form-group">
                                        <select className="form-control form-control-lg" 
                                         name="priority" value={this.state.priority}
                                         onChange={this.onChange}>
                                            <option value={0}>Select Priority</option>
                                            <option value={1}>High</option>
                                            <option value={2}>Medium</option>
                                            <option value={3}>Low</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <select className="form-control form-control-lg" name="status"
                                         value={this.state.status} onChange={this.onChange}>
                                            <option value="">Select Status</option>
                                            <option value="TO_DO">TO DO</option>
                                            <option value="IN_PROGRESS">IN PROGRESS</option>
                                            <option value="DONE">DONE</option>
                                        </select>
                                    </div>

                                    <input type="submit" className="btn btn-primary btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UpdateProjectTask.propTypes = {
    getProjectTask: PropTypes.func.isRequired,
    project_task: PropTypes.object.isRequired,
    updateProjectTask: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    project_task: state.backlog.project_task,
    errors: state.errors
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask})(UpdateProjectTask);