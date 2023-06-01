import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import styles from '../Styles/styles';
import { toast } from 'react-toastify';
import axios from 'axios';
import { server } from '../../ServerConfigs';

const validationSchema = Yup.object({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
        .required('New Password is required')
        .min(8, 'New Password must be at least 8 characters long'),
    confirmPassword: Yup.string()
        .required('Confirm Password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});

const ChangePassword = () => {
    const { user, error, successMessage } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const initialValues = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const onSubmit = async (values, action) => {
        const changePwdPayload = {
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
        };

        axios
            .put(`${server}/user/update-user-password`, changePwdPayload, { withCredentials: true })
            .then((res) => {
            toast.success(res.data.message);
                action.resetForm();
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    return (
        <div className='m-auto'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className='flex flex-col items-center gap-10'>
                    <div className='flex flex-col gap-5 w-[90vw] sm:w-[350px]'>
                        <Field
                            type='password'
                            name='oldPassword'
                            placeholder='Old password'
                            className={`${styles.input}`}
                        />
                        <ErrorMessage name='oldPassword' component='div' className='text-red-500' />

                        <Field
                            type='password'
                            name='newPassword'
                            placeholder='New password'
                            className={`${styles.input}`}
                        />
                        <ErrorMessage name='newPassword' component='div' className='text-red-500' />

                        <Field
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm password'
                            className={`${styles.input} `}
                        />
                        <ErrorMessage
                            name='confirmPassword'
                            component='div'
                            className='text-red-500'
                        />

                    </div>

                    <button className={`w-[200px]  ${styles.buttonPink}`} type='submit'>
                        Update
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default ChangePassword;
