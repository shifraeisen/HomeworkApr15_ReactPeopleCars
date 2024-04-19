import React from 'react';
import withRouter from './withRouter';
import axios from 'axios';
import CarRow from '../components/CarRow';
import { Link } from 'react-router-dom';

class DeleteCars extends React.Component {
    state = {
        personid: +this.props.params.id,
        personName: '',
        cars: [],
        searchText: ''
    }
    componentDidMount = async () => {
        const { data } = await axios.get(`/api/people/getcarsforperson?id=${this.state.personid}`);
        this.setState({ cars: data });
        this.getPersonName();
    }
    getPersonName = async () => {
        const { data } = await axios.get(`/api/people/getpersonbyid?id=${this.state.personid}`);
        this.setState({ personName: `${data.firstName} ${data.lastName}` });
    }
    onYesClick = async () => {
        const id = this.state.personid;
        await axios.post('/api/people/deletecarsforperson', { id });
        this.props.navigate('/');
    }
    onTextChange = e => {
        this.setState({ searchText: e.target.value });
    }
    onClearClick = () => {
        this.setState({ searchText: '' });
    }
    render() {
        const { cars, searchText } = this.state;
        const text = searchText.toLowerCase();
        return (
            <>
                <div className='container' style={{ marginTop: 100 }}>
                    <div className='row'>
                        <div className='col-md-10'>
                            <input value={searchText} type='text' className='form-control form-control-lg' placeholder='Search Cars' onChange={this.onTextChange} />
                        </div>
                        <div className='col-md-2'>
                            <button disabled={searchText == ''} onClick={this.onClearClick} className='btn btn-dark btn-lg w-100'>Clear</button>
                        </div>
                    </div>
                    <div className='row mt-5'>
                        <h1>Cars for {this.state.personName}</h1>
                    </div>
                </div>
                <div className='container'>
                    <div style={{ backgroundColor: 'white', minHeight: 1000, paddingTop: 10 }}>
                        <div className='row mt-5'>
                            <div className='col-md-12'>
                                <table className='table table-striped table-hover table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Make</th>
                                            <th>Model</th>
                                            <th>Year</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cars.filter(c => (c.make.toLowerCase().includes(text) || c.model.toLowerCase().includes(text)))
                                            .map(c => <CarRow key={c.id} car={c} />)}
                                    </tbody>
                                </table>
                            </div>
                            <div className='row'>
                                <div className='col-md-12 text-center'>
                                    <h3>Are you sure you want to delete all these cars?</h3>
                                </div>
                                <div className='col-md-6' style={{ marginTop: 20 }}>
                                    <Link to='/'>
                                        <button className='btn btn-outline-primary w-100'>No</button>
                                    </Link>
                                </div>
                                <div className='col-md-6' style={{ marginTop: 20 }}>
                                    <button onClick={this.onYesClick} className='btn btn-outline-danger w-100'>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default withRouter(DeleteCars);