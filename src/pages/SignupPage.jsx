import React, { useState } from 'react'
import { SignUpFields } from '../components/Data/FormData';
import Logo from '../assets/logo-color1.png'
import { Link } from 'react-router-dom';
import DynamicForm from '../components/DynamicForm/DynamicForm';
import axios from 'axios';
import { server } from '../ServerConfigs';
import { toast } from 'react-toastify';
import bgImgg from "../assets/bg-imgg.jpg"
import styles from '../components/Styles/styles';

const SignupPage = () => {

    const [showPassword, setshowPassword] = useState(false);
    const fields = SignUpFields;

    /**
     * 
     * @method ShopSignup
     * @description Invokes shop create API on click of sign Up
     * @param {*} values 
     * @param {*} actions 
     */
    const handleSubmit = (values, actions) => {

        const createShopPayload = {
            name: values.name,
            email: values.email,
            password: values.password,
            avatar: "",
            address: values.address,
            phoneNumber: values.phone,
            zipCode: values.zip,
        }

        let signUpPromise = axios.post(`${server}/user/create-user`, createShopPayload).then(
            (res) => {
                if (res.data?.data) console.log(`Activation Url for your seller account = > ${res.data?.data}`)
                console.log(res)
                actions.resetForm();
            }
        ).catch((error) => {
        toast.error(error.response.data.message);

        });

        toast.promise(signUpPromise, {
            pending: "Loading...",
            success: `Check Your ${values.email} to activate account`,
            error: 'Error!'
        })
    };



    return (
        <div className={`${styles.gradientSignup} bg-cover min-h-screen flex justify-center items-center`}>
            <div className="flex flex-col items-center gap-5 w-[90vw] sm:w-[400px]">
                <img onClick={() => setshowPassword(!showPassword)} src={Logo} className=' h-[100px] w-[100px] rounded-full' />
                <DynamicForm fields={fields} onSubmit={handleSubmit} submitBtnName='Sign up' showPassword={showPassword} />
                <span>Already have a account ? <Link className='text-blue-600' to='/login'>Log In</Link> </span>
            </div>
        </div>
    )
}

export default SignupPage
