import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'primereact/button';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import classes from '../SignUp/SignUp.module.scss';
import InputText from '../../components/UI/input/input';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';
import { Redirect } from 'react-router-dom';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/nova-light/theme.css";
import 'primeicons/primeicons.css';
import IMG from '../../assest/Vector.svg';
import Logo1 from '../../assest/Group635.svg';
import Layout from '../../hoc/Layout/Layout';
import Man from '../../assest/man3.svg';
const Login = ({ history }) => {
    const { loading, error, isAuthenticated, authRedirectPath } = useSelector(state => ({
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    }), shallowEqual)
    const dispatch = useDispatch();
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            placholder: 'Email',
            elementConfig: {
                type: 'email'

            },
            value: '',
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
            value: '',
            validation: {
                required: true,
                minLength: 6

            },
            valid: false,
            touched: false
        }
    });


    useEffect(() => {
        if (authRedirectPath !== '/') {
            dispatch(actions.setAuthRedirectPath());
        }
    }, [dispatch, authRedirectPath]);

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
    const submitHandler = useCallback( event => {
        event.preventDefault();
        dispatch(actions.authLogin(authForm.email.value, authForm.password.value));
        history.push('/Login')
    }, [history,dispatch,authForm.email.value,authForm.password.value]);


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

    if (loading) {
        form = <Spinner />;
    }

    let errorMessage = null;

    if (error) {
        errorMessage =
            <p className='p'>{error.message}</p>
    }

    let authRedirect = null;
    if (isAuthenticated) {
        authRedirect = <Redirect to={authRedirectPath} />;
    }
    return (
        <div style={{ backgroundColor: '#f1f1f1' }}>
            <Layout Logo={Logo1} class={classes.Li} man={Man} Avatar={classes.Avatar} background='#f1f1f1' color='#19374c' />
            <div className={classes.Container}>
                {authRedirect}
                {errorMessage}
                <div className={classes.Vector}>
                    <img src={IMG} alt='vector' style={{ width: '500px', height: '588px' }} />                </div>
                <form onSubmit={submitHandler} className={classes.Form} >
                    <h1>User Login</h1>
                    {form}
                    <span className={classes.BB}>
                        <Button label="Login" className="p-button-success"
                            style={{
                                backgroundColor: '#19374c',
                                borderRadius: '1.5rem',
                                width: '150px',
                                height: '55px',
                                fontSize: '22px',
                                boxShadow: '#19374c'
                            }} />
                    </span>
                </form>
            </div>
        </div>

    );
}

export default (withErrorHandler(Login));