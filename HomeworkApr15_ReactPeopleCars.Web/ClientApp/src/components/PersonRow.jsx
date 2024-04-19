import { Link } from 'react-router-dom';

function PersonRow({ person, carCount }) {
    const { id, firstName, lastName, age } = person;
    return (
        <>
            <tr>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{age}</td>
                <td>{carCount}</td>
                <td>
                    <Link to={`/addcar/${id}`}>
                        <button className='btn btn-outline-success w-100'>Add Car</button>
                    </Link>
                </td>
                <td>
                    <Link to={`/deletecars/${id}`}>
                        <button disabled={carCount == 0} className='btn btn-outline-danger w-100'>Delete Cars</button>
                    </Link>
                </td>
            </tr>
        </>
    )
}
export default PersonRow;