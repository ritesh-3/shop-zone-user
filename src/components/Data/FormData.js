import * as Yup from 'yup'



export const LoginFields = [
    {
        name: "email",
        placeholder: "Email",
        type: "text",
        validation: Yup.string().email("Invalid email address").required("Required"),
    },
    {
        name: "password",
        placeholder: "Password",
        type: "password",
        validation: Yup.string().required("Required"),
    },
]

export const SignUpFields = [
    {
        name: "name",
        placeholder: "Full Name",
        type: "text",
        validation: Yup.string().required("Required"),
    },
    {
        name: "email",
        placeholder: "Email",
        type: "text",
        validation: Yup.string().email("Invalid email address").required("Required"),
    },
    {
        name: "password",
        placeholder: "Password",
        type: "password",
        validation: Yup.string().required("Required"),
    },
]


export const CreateProductForm = [
    {
        name: "name",
        placeholder: "Product Name",
        type: "text",
        validation: Yup.string().required("Required"),
    },
    {
        name: "description",
        placeholder: "Product Description",
        type: "textbox",
        validation: Yup.string().required("Required"),
    },
    {
        name: "category",
        placeholder: "Select Category",
        type: "option",
        validation: Yup.string().required("Required"),
        options: [
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
        ],
    },
    {
        name: "tags",
        placeholder: "Your Product tags..",
        type: "text",
        validation: Yup.string().required("Required"),
    },
    {
        name: "orignalPrice",
        placeholder: "Orignal Price",
        type: "text",
        validation: Yup.number().required("Required").typeError('Please enter a valid numeric value'),
    },
    {
        name: "discountPrice",
        placeholder: "Discount Price",
        type: "text",
        validation: Yup.number().required("Required").typeError('Please enter a valid numeric value'),
    },
    {
        name: "productInStock",
        placeholder: "Product In Stock",
        type: "text",
        validation: Yup.number().required("Required").typeError('Please enter a valid numeric value'),
    },

]
export const CreateEventForm = [
    {
        name: "name",
        placeholder: "Product Name",
        type: "text",
        validation: Yup.string().required("Required"),
    },
    {
        name: "description",
        placeholder: "Product Description",
        type: "textbox",
        validation: Yup.string().required("Required"),
    },
    {
        name: "category",
        placeholder: "Min Amount",
        type: "option",
        validation: Yup.string().required("Required"),
        options: [
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
        ],
    },
    {
        name: "tags",
        placeholder: "Your Product tags..",
        type: "text",
        validation: Yup.string().required("Required"),
    },
    {
        name: "orignalPrice",
        placeholder: "Orignal Price",
        type: "text",
        validation: Yup.number().required("Required").typeError('Please enter a valid numeric value'),
    },
    {
        name: "discountPrice",
        placeholder: "Discount Price",
        type: "text",
        validation: Yup.number().required("Required").typeError('Please enter a valid numeric value'),
    },
    {
        name: "productInStock",
        placeholder: "Product In Stock",
        type: "text",
        validation: Yup.number().required("Required").typeError('Please enter a valid numeric value'),
    },
    {
        name: "startDate",
        placeholder: "Event Start Date",
        type: "datetime",
        validation: Yup.date().required("Required").typeError('Please enter a valid date'),
    },
    {
        name: "endDate",
        placeholder: "Event End Date",
        type: "datetime",
        validation: Yup.date("Required").typeError('Please enter a valid date'),
    },

]
export const CreateCouponForm = [
    {
        name: "name",
        placeholder: "Coupon Code Name",
        type: "text",
        validation: Yup.string().required("Required"),
    },
    {
        name: "discouptPercentage",
        placeholder: "Discount Percentage",
        type: "text",
        validation: Yup.string().required("Required"),
    },
    {
        name: "minAmount",
        placeholder: "Min Amount",
        type: "text",
        validation: Yup.number().required("Required").typeError('Please enter a valid numeric value'),
    },
    {
        name: "maxAmount",
        placeholder: "Max Amount",
        type: "text",
        validation: Yup.number().required("Required").typeError('Please enter a valid numeric value'),
    },
    {
        name: "selectedProducts",
        placeholder: "Select Products",
        type: "option",
        validation: Yup.string().required("Required"),
        options: [
            { value: "option1", label: "Option 1" },
            { value: "option2", label: "Option 2" },
            { value: "option3", label: "Option 3" },
        ],
    }
]
