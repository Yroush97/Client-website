import React from 'react';
import classes from './input.module.scss'
import { InputText } from 'primereact/inputtext';
const input = (props) => {
    let inputElement = null;
    const inputClasses = ['InputElement'];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push('Invalid');
    }


    inputElement =
        <span className="p-float-label" style={{ marginBottom: '10px' }}>
            <InputText
                style={{
                    borderRadius: '2.5rem',
                    height: '55px', textAlign: 'center',
                    fontSize: '22px', backgroundColor: '#ececec',
                    color: '#19374c', fontWeight: '500',
                    border: '1px solid #d0d0d0'
                }
                }
                className={classes.Input}
                // size="30"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                placeholder={props.placeholder}
            />
            {/* <label htmlFor="float-input" style={{ marginLeft: '150px', fontSize: '22px' }}>{props.label}</label> */}
        </span>;


    return (
        <div >
            {inputElement}
        </div>
    );

};

export default input;