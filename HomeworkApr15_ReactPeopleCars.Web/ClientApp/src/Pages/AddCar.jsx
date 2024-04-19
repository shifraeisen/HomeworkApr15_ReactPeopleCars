import React from 'react';
import withRouter from './withRouter';
import axios from 'axios';

class AddCar extends React.Component {
    
    state = {
        personName: '',
        car: {
            personid: +this.props.params.id,
            make: '',
            model: '',
            year: ''
        }
    }
    componentDidMount = async () => {
        const { data } = await axios.get(`/api/people/getpersonbyid?id=${this.state.car.personid}`);
        this.setState({ personName: `${data.firstName} ${data.lastName}` });
    }
    onTextChange = e => {
        const copy = { ...this.state.car };
        copy[e.target.name] = e.target.value;
        this.setState({ car: copy });
    }
    getPersonById = async () => {
        const response = await axios.get(`/api/people/getpersonbyid?id=${this.state.car.personid}`);
        return response.data;
    }
    onSubmitClick = async () => {
        await axios.post('/api/people/addcar', this.state.car);
        this.props.navigate('/');
        console.log(this.state.car);
        console.log(this.getPersonById(this.state.car.personid));
    }
    render() {
        const {  make, model, year } = this.state.car;
        return (
            <>
                <div className='container' style={{ marginTop: 60 }}>
                    <div style={{ minHeight: 1000, paddingTop: 200 }}>
                        <div className='row'>
                            <div className='col-md-6 offset-md-3 card bg-light p-4 text-center'>
                                <h2>Add a Car for {this.state.personName}</h2>
                                <input name='make' value={make} type='text' className='form-control' placeholder='Make' onChange={this.onTextChange} />
                                <br />
                                <input name='model' value={model} type='text' className='form-control' placeholder='Model' onChange={this.onTextChange} />
                                <br />
                                <input name='year' value={year} type='text' className='form-control' placeholder='Year' onChange={this.onTextChange} />
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
export default withRouter(AddCar);

