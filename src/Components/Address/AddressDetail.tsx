import { FC } from 'react';
import { AddressInfo } from '../../Core/Interfaces/AddressInfo';
import './AddressDetail.sass';

const DisplayAddress: FC<AddressInfo> = ({street, city, state, zip}) => {
    return (
        <div className='addressBlock'>
            <h3>Directions:</h3>
            <div>{street}</div>
            <div>{city}, {state} {zip}</div>
        </div>
    );
};

export default DisplayAddress;
