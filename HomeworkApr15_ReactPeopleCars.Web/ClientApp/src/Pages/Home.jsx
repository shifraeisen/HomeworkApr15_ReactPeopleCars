import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import PersonRow from '../components/PersonRow';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Home extends React.Component {
    state = {
        people: [],
        searchText: ''
    }
    componentDidMount = () => {
        this.getPeople();
    }
    getPeople = async () => {
        const response = await axios.get('/api/people/getpeople');
        this.setState({ people: response.data });
    }
    onTextchange = e => {
        this.setState({ searchText: e.target.value });
    }
    onClearClick = () => {
        this.setState({ searchText: '' });
    }
    render() {
        const { people, searchText } = this.state;
        const text = searchText.toLowerCase();
        return (
            <>
                <div className='container' style={{ marginTop: 100 }}>
                    <div className='row'>
                        <div className='col-md-10'>
                            <input value={searchText} type='text' className='form-control form-control-lg' placeholder='Search People' onChange={this.onTextchange} />
                        </div>
                        <div className='col-md-2'>
                            <button disabled={searchText == ''} onClick={this.onClearClick} className='btn btn-dark btn-lg w-100'>Clear</button>
                        </div>
                    </div>
                </div>
                <div className='container' style={{ marginTop: 30, marginLeft: 30 }}>
                    <Link to={'/addperson'}>
                        <button className='btn btn-outline-info w-25 offset-md-4'>Add Person</button>
                    </Link>
                </div>
                <table className='table table-striped table-bordered table-hover mt-5'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Car Count</th>
                            <th>Add Car</th>
                            <th>Delete Cars</th>
                        </tr>
                    </thead>
                    <tbody>
                        {people.filter(p => (p.firstName.toLowerCase().includes(text) || p.lastName.toLowerCase().includes(text)))
                            .map(p => <PersonRow key={p.id}
                            person={p}
                            carCount={p.cars.length} />)}
                    </tbody>
                </table>
            </>
        )
    }
}

export default Home;