import React from 'react';
import CarddF from './CarddForm/CarddF';
import useStyles from './styles';
import { useSelector } from 'react-redux';


const Cards=()=>{
    const cards = useSelector((state) => state.cards);

    const classes = useStyles();

    return(
<>
<h1 >Cards</h1>
<CarddF/>
<CarddF/>

</>
    );
}
export default  Cards;