import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './Account.module.scss';
import Layout from '../../hoc/Layout/Layout';
import Logo from '../../assest/Group635.svg';
import Man from '../../assest/man3.svg';
import InputText from '../../components/UI/input/input';
import { updateObject, checkValidity } from '../../shared/utility';
import { Button } from 'primereact/button';
import * as actions from '../../store/actions/index';
import axios from 'axios';
function Account() {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const Email = localStorage.getItem('Email');
    const Password = localStorage.getItem('Password');
    const [authForm, setAuthForm] = useState({
        UserName: {
            elementType: 'input',
            placholder: 'UserName',
            elementConfig: {
                type: 'text',
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            placholder: 'Email',
            elementConfig: {
                type: 'email'

            },
            value: Email,
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            placholder: 'Password',
            elementConfig: {
                type: 'password',
                autoComplete: 'on',
                minLength: '6'

            },
            value: Password,
            validation: {
                required: true,
                minLength: 6

            },
            valid: false,
            touched: false
        },
    });
    const submitHandler = event => {
        event.preventDefault();
    };
    let Img = useSelector(state => state.auth.img);
    const [image, setImage] = useState({ preview: Img, raw: "" });

    const handleChange = e => {
        if (e.target.files.length) {
            setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
            });
        }
    };
    const cancelButton = () => {
        window.location.hash = "/"
    }
    const changeIMG = async () => {
        // window.location.href = "/"
        const editdata = {
            name: authForm.UserName.value,
            email: authForm.email.value,
            password: authForm.password.value,
        }
        await axios.put('https://apitest.i2-host.com/2.1/api/client/users/update', editdata, {
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token} `
            }
        })
            .then(res => {
                // console.log(res.data);
                window.location.hash = "/"
            }).catch(err => {
                console.log(err.message);
            })
        return (dispatch(actions.setAvatar(image.preview)))

    }

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(authForm, {
            [controlName]: updateObject(authForm[controlName], {
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    authForm[controlName].validation
                ),
                touched: true
            })
        });
        setAuthForm(updatedControls);
    };
    const formElementsArray = [];
    for (let key in authForm) {
        formElementsArray.push({
            id: key,
            config: authForm[key]
        });
    }
    let form = formElementsArray.map(formElement => (
        <InputText
            id="float-input"
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={event => inputChangedHandler(event, formElement.id)}
            placeholder={formElement.config.placholder}
        />
    ));

    return (
        <div className={classes.Account}>
            <Layout Logo={Logo} class={classes.Li} man={Man} Avatar={classes.Avatar} background='#f1f1f1' color='#19374c' />
            <main className={classes.Main} >
                <form onSubmit={submitHandler} className={classes.Form} >
                    <h1 className={classes.H1}>Your Account Info:</h1>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <label htmlFor="upload-button" >
                            {image.preview ? (
                                <>
                                    <img src={image.preview} alt="dummy" className={classes.ProfileImg} />
                                    <h5 className="text-center">Save Your picture</h5>
                                </>
                            ) : (
                                    <>
                                        <span className="fa-stack fa-2x mt-3 mb-2">
                                            <img name='iimg' src={Man} alt='man' className={classes.ProfileImg} />
                                        </span>
                                        <h5 className="text-center">Change the picture</h5>
                                    </>
                                )}
                        </label>
                        <input
                            type="file"
                            id="upload-button"
                            style={{ display: "none" }}
                            onChange={handleChange}
                        />
                    </div>
                    {form}
                    <div className={classes.Buttons}>
                        <span className={classes.B1}>
                            <Button label="Cancel" className="p-button-info" onClick={cancelButton}
                                style={{
                                    backgroundColor: '#ececec',
                                    color: '#19374c',
                                    borderRadius: '3.5rem',
                                    width: '175px',
                                    height: '55px',
                                    fontSize: '22px',
                                    boxShadow: '#19374c',
                                    border: '1px solid #d0d0d0',
                                }} />
                        </span>
                        <span className={classes.B2}>
                            <Button label="Save" className="p-button-success" onClick={changeIMG}
                                style={{
                                    backgroundColor: '#19374c',
                                    borderRadius: '3.5rem',
                                    width: '175px',
                                    height: '55px',
                                    fontSize: '22px',
                                    boxShadow: '#19374c',
                                    border: '1px solid #19374c',
                                }} />
                        </span>
                    </div>
                </form>
            </main>
        </div>
    )
}
export default Account;