import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCamera } from 'react-icons/ai'
import * as Yup from 'yup';
import styles from '../Styles/styles';
import { useImageUploader } from '../../custom-hooks/ImageUploaderHook';
import { toast } from 'react-toastify';
import axios from 'axios';
import { server } from '../../ServerConfigs';
import { loadUser, updateUserInformation } from '../../redux/slices/usersSlice';

const validationSchema = Yup.object({
  name: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phoneNumber: Yup.number().required('Phone Number is required'),
  password: Yup.string().required('Password is required'),
});




const MyProfle = () => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { uploadImage } = useImageUploader()

  const initialValues = {
    name: user?.name,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    password: '',
  };


  const onSubmit = async (values) => {
    try {
      const userPayload = {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password
      }
      dispatch(updateUserInformation(userPayload))
    } catch (err) {
      console.log(err)
    }

  };

  const handleImage = async (event) => {
    try {
      const files = Array.from(event.target.files);
      const uploadedImage = await uploadImage(files[0]);
      if (!uploadedImage) {
        toast.error("Error occured on image upload")
        return
      }
      await axios.put(`${server}/user/update-avatar`, { image: uploadedImage }, { withCredentials: true, })
      dispatch(loadUser());
      toast.success("avatar updated successfully!");

    } catch (ex) {
      toast.error("Error occured while uploding image")
      console.log(ex)
    }
  };


  return (
    <div className='m-auto'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className='flex flex-col items-center gap-10'>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={user?.avatar}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-pink-600"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>

          <div className="w-full px-5">
            <div className="w-full sm:flex block pb-3">
              <div className="w-[100%] sm:w-[50%]">
                <Field
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className={`${styles.input} !w-[95%] mb-4 sm:mb-0`}
                />
                <ErrorMessage name="name" component="div" className="text-red-500" />
              </div>
              <div className="w-[100%] sm:w-[50%]">
                <Field
                  type="text"
                  name="email"
                  placeholder="Email"
                  className={`${styles.input} !w-[95%] mb-1 sm:mb-0`}
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
            </div>
            <div className="w-full sm:flex block pb-3">
              <div className="w-[100%] sm:w-[50%]">
                <Field
                  type="number"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className={`${styles.input} !w-[95%] mb-4 sm:mb-0`}
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500" />
              </div>
              <div className="w-[100%] sm:w-[50%]">
                <Field
                  type="password"
                  name="password"
                  placeholder="Current Password"
                  className={`${styles.input} !w-[95%] mb-4 sm:mb-0`}
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
            </div>
          </div>
          <button
            className={`w-[200px]  ${styles.buttonPink} `}
            type="submit"
          >
            Update
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default MyProfle;
