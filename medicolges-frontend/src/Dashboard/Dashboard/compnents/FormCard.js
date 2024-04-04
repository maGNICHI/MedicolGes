import React from 'react';
import useStyles from '../compnents/CardForm/styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, TextField } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';  
import moment from 'moment';
import { useDispatch } from 'react-redux';


const FormCard=({ formData, setCurrentId })=>{
const classes = useStyles();
const dispatch = useDispatch();
const renderInputField = (question) => {
        if (!question) return null;

        const { questionType, responseValue } = question;

        switch (questionType) {
            case "date":
            case "paragraph":
            case "text":
            case "file":
            case "dropdown":
                return (
                    <Typography variant="body2" component="p">
                        {responseValue}----------
                    </Typography>
                );
            case "multipleChoice":
                return (
                    <div>
                        {responseValue.options.map((option, index) => (
                            <div key={index}>
                                <input type="radio" checked={responseValue.selectedOption === option} readOnly />
                                <label>{option}</label>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card className={classes.card}>
            <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                {formData.name} *************
                
            </Typography>
            <CardContent>
    {formData.questions && Array.isArray(formData.questions) && formData.questions.map((question, index) => (
        <div key={index}>
            <Typography variant="body1">Question {index + 1}: {question.question}</Typography>
            <Typography variant="body1">Question Type: {question.questionType}</Typography>
        </div>
    ))}
</CardContent>


        </Card>
);

}
export default  FormCard;