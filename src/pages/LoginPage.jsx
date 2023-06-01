import React, { useState } from 'react'
import DynamicForm from '../components/DynamicForm/DynamicForm';
import { LoginFields } from '../components/Data/FormData';
import Logo from '../assets/logo-color1.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../ServerConfigs';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loadUser } from "../redux/slices/usersSlice"
import bgImgg from "../assets/bg-imgg1.jpg"
import styles from '../components/Styles/styles';


const LoginPage = () => {
    const [showPassword, setshowPassword] = useState(false);

    let fields = LoginFields;
    const navigate = useNavigate()
    const dispatch = useDispatch()

    /**
    * 
    * @method ShopLogin
    * @description Invokes shop create API on click of Log In
    * @param {*} values 
    * @param {*} actions 
    */
    const handleSubmit = (values, actions) => {
        const loginShopPaload = {
            email: values.email,
            password: values.password
        }

        let loginPromise = axios.post(`${server}/user/login-user`, loginShopPaload, { withCredentials: true }).then(
            (res) => {
                navigate('/')
                actions.resetForm();
                dispatch(loadUser())

            }
        ).catch((error) => {
            toast.error(error.response.data.message);
            setmsg(error.response.data.message)
            console.log(error)
        });

        toast.promise(loginPromise, {
            pending: "Loading...",
            success: "Login Successfull",
            error: 'Error!'
        })

    };


    return (
        <div className={`${styles.gradientLogin} bg-cover min-h-screen flex justify-center items-center`}>
            <div className="flex flex-col items-center gap-5 w-[90vw] sm:w-[400px]">
                <img src={Logo} onClick={() => setshowPassword(!showPassword)} className=' h-[100px] w-[100px] rounded-full' />
                <DynamicForm fields={fields} onSubmit={handleSubmit} submitBtnName='LogIn' showPassword={showPassword} />
                <span>Dont have any account ? <Link className='text-blue-600' to='/signup'>Sign Up</Link> </span>
            </div>

        </div>
    )
}

export default LoginPage
