import React from 'react';
import withRouter from './withRouter';
import axios from 'axios';

class AddPerson extends React.Component {
    state = {
        person: {
            firstName: '',
            lastName: '',
            age: ''
        }
    }
    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }
    onSubmitClick = async () => {
        await axios.post('/api/people/addperson', this.state.person);
        this.props.navigate('/');
    }
    render() {
        const { firstName, lastName, age } = this.state.person;
        return (
            <>
                <div className='container' style={{ marginTop: 60 }}>
                    <div style={{ minHeight: 1000, paddingTop: 200 }}>
                        <div className='row'>
                            <div className='col-md-6 offset-md-3 card bg-light p-4 text-center'>
                                <h2>Add a New Person</h2>
                                <input name='firstName' value={firstName} type='text' className='form-control' placeholder='First Name' onChange={this.onTextChange} />
                                <br />
                                <input name='lastName' value={lastName} type='text' className='form-control' placeholder='Last Name' onChange={this.onTextChange} />
                                <br />
                                <input name='age' value={age} type='text' className='form-control' placeholder='Age' onChange={this.onTextChange} />
                                <br />
                                <button onClick={this.onSubmitClick} className='btn btn-primary btn-lg btn-block'>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default withRouter(AddPerson);