import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AiOutlineDelete } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { toast } from 'react-toastify';
import { updateUserAddress, deleteUserAddress } from '../../redux/slices/usersSlice';
import { Country, State } from 'country-state-city';
import styles from '../Styles/styles';
import { fieldProperties } from '../Data/data';
import ResponsiveTable from '../DynamicTable/DynamicTable';


const validationSchema = Yup.object({
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    address1: Yup.string().required('Address 1 is required'),
    address2: Yup.string().required('Address 2 is required'),
    zipCode: Yup.number().required('Zip Code is required'),
    addressType: Yup.string().required('Address Type is required'),
});





const Address = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [filteredData, setFilteredData] = useState([]);



    const handleSubmit = (values, { resetForm }) => {
        dispatch(updateUserAddress(values));
        setOpen(false);
        resetForm();
    };

    const handleDelete = (item) => {
        const id = item._id;
        dispatch(deleteUserAddress(id));
    };

    console.log(user?.addresses)

    useEffect(() => {
        setFilteredData(

            user?.addresses.map(({ _id, addressType, address1, address2 }) => ({ _id, addressType, address1, address2 }))
                .sort((a, b) => a.addressType.localeCompare(b.addressType)) // Sort filteredData based on name
        );
    }, [user]);


    const headers = [
        // { title: "Order Id", value: '_id' },
        { title: "Adress type", value: 'addressType' },
        { title: "Address 1", value: 'address1' },
        { title: "Address 2", value: 'address2' },
        { title: "Actions", value: "actions", actions: ["delete", "view"] }
    ]


    return (
        <div className="w-full my-5 mx-auto px-5">
            {open && (
                <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
                    <div className="w-[95%] sm:w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll px-8">
                        <div className="w-full flex justify-end p-3">
                            <RxCross2
                                size={30}
                                className="cursor-pointer"
                                onClick={() => setOpen(false)}
                            />
                        </div>
                        <h1 className="text-center text-[25px] font-Poppins">Add New Address</h1>
                        <div className="w-full">
                            <Formik
                                initialValues={{
                                    country: 'IN',
                                    city: 'HP',
                                    address1: '',
                                    address2: '',
                                    zipCode: '',
                                    addressType: '',
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ values }) => (
                                    <Form aria-required className="w-full">
                                        {fieldProperties.map((field) => (
                                            <div key={field.name} className="w-full pb-2">
                                                <label className="block pb-2" htmlFor={field.name}>
                                                    {field.label}
                                                </label>
                                                {field.component === 'select' ? (
                                                    <Field
                                                        name={field.name}
                                                        id={field.name}
                                                        as={field.component}
                                                        className="w-[95%] border h-[40px] rounded-[5px]"
                                                        options={field.options}
                                                        type={field.type}
                                                    >
                                                        {field.name === 'city' && values.country ? (
                                                            <>
                                                                <option value="">Select City</option>
                                                                {/* Render city options based on the selected country */}
                                                                {State &&
                                                                    State.getStatesOfCountry(values.country).map((item) => (
                                                                        <option
                                                                            key={item.isoCode}
                                                                            value={item.isoCode}
                                                                        >
                                                                            {item.name}
                                                                        </option>
                                                                    ))}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <option value="">Select {field.label}</option>
                                                                {field.options.map((option) => (
                                                                    <option
                                                                        key={option.value}
                                                                        value={option.value}
                                                                    >
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </>
                                                        )}
                                                    </Field>
                                                ) : (
                                                    <Field
                                                        name={field.name}
                                                        id={field.name}
                                                        as={field.component}
                                                        className="w-[95%] border h-[40px] rounded-[5px]"
                                                        type={field.type}
                                                    />
                                                )}
                                                <ErrorMessage
                                                    name={field.name}
                                                    component="div"
                                                    className="text-red-500"
                                                />
                                            </div>
                                        ))}

                                        <div className="w-full pb-2 flex justify-center">
                                            <button type="submit" className={`${styles.primaryButton}`}>
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>

                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col gap-5">
                <div className='flex sm:w-full justify-between'>
                    <h1 className="font-md sm:text-[25px] font-[600] text-[#000000ba] pb-2">My Addresses</h1>
                    <div className={`${styles.buttonPink} cursor-pointer`} onClick={() => setOpen(true)}>
                        <span className="text-[#fff]">Add New</span>
                    </div>
                </div>
                <div > 
                    <ResponsiveTable key={filteredData.length} tableData={filteredData} onDeleteAction={handleDelete} headers={headers} enablePaginator={false} />
                </div>
            </div>



            {user && user.addresses.length === 0 && (
                <h5 className="text-center pt-8 text-[18px]">
                    You do not have any saved addresses!
                </h5>
            )}
        </div>
    );
};

export default Address;
