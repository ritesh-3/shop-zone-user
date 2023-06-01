import { AiOutlineHome, AiOutlineQuestionCircle } from 'react-icons/ai'
import { VscAccount } from 'react-icons/vsc'
import { MdOutlineInventory } from 'react-icons/md'
import brand2 from "../../assets/brands/brand2.png";
import brand3 from "../../assets/brands/brand3.png";
import brand4 from "../../assets/brands/brand4.png";
import brand5 from "../../assets/brands/brand5.png";
import brand6 from "../../assets/brands/brand6.png";
import { Country, State } from 'country-state-city';


import computerCategory from '../../assets/imgs/cnl.jpg'
import giftCat from '../../assets/imgs/gift-box.png'
import clothsCat from '../../assets/imgs/clothes-hanger.png'
import headphoneCate from '../../assets/imgs/headphone.png'
import shopCate from '../../assets/imgs/shop.png'
import skinCareCate from '../../assets/imgs/skincare.png'
import smartphoneCate from '../../assets/imgs/smartphone.png'
import usbCate from '../../assets/imgs/usb.png'
import shoesCate from '../../assets/imgs/shoes.png'
import petCareCate from '../../assets/imgs/beauty-saloon.png'
import othersCate from '../../assets/imgs/application.png'

export const SidebarData = [
  {
    id: 1,
    icon: AiOutlineHome,
    heading: "Home",
    navigateTo: '/'
  },
  {
    id: 2,
    icon: MdOutlineInventory,
    heading: 'Events',
    navigateTo: '/events'
  },
  {
    id: 3,
    icon: MdOutlineInventory,
    heading: 'Products',
    navigateTo: '/products'
  },
  {
    id: 4,
    icon: AiOutlineQuestionCircle,
    heading: "FAQ",
    navigateTo: '/faq'
  }
];

const brandData = [
  { id: 1, img: brand2, bgColor: '' },
  { id: 2, img: brand2, bgColor: 'yellow' },
  { id: 3, img: brand3, bgColor: 'violet' },
  { id: 4, img: brand4, bgColor: 'yellow' },
  { id: 5, img: brand5, bgColor: 'green' },
  { id: 6, img: brand6, bgColor: 'green' },
  { id: 7, img: brand3, bgColor: 'orange' },
  { id: 8, img: brand4, bgColor: 'pink' },
];

export const categoryData = [
  { id: 1, img: computerCategory, bgColor: '', title: "Computers and Laptops", },
  { id: 2, img: giftCat, bgColor: '', title: "Gifts", },
  { id: 3, img: clothsCat, bgColor: '', title: "Cloths", },
  { id: 4, img: headphoneCate, bgColor: '', title: "Music and Gaming", },
  { id: 5, img: shopCate, bgColor: '', title: "Accesories", },
  { id: 6, img: skinCareCate, bgColor: '', title: "cosmetics and body care", },
  { id: 7, img: smartphoneCate, bgColor: '', title: "Mobile and Tablets", },
  { id: 8, img: shoesCate, bgColor: '', title: "Shoes", },
  { id: 9, img: othersCate, bgColor: '', title: "Others", },
  { id: 10, img: petCareCate, bgColor: '', title: "Pet Care", },
];

export const FAQ_DATA = [
  {
    question: "What is your return policy?",
    answer:
      "If you're not satisfied with your purchase, we accept returns within 30 days of delivery. To initiate a return, please email us at support@myecommercestore.com with your order number and a brief explanation of why you're returning the item.",
  },
  {
    question: "How do I track my order?",
    answer:
      "You can track your order by clicking the tracking link in your shipping confirmation email, or by logging into your account on our website and viewing the order details.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can contact our customer support team by emailing us at support@myecommercestore.com, or by calling us at (555) 123-4567 between the hours of 9am and 5pm EST, Monday through Friday.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "Unfortunately, once an order has been placed, we are not able to make changes or cancellations. If you no longer want the items you've ordered, you can return them for a refund within 30 days of delivery.",
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we only offer shipping within the United States.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept visa, mastercard, paypal payment methods. We also have a cash on delivery system.",
  },
  {
    "question": "Do you offer international shipping?",
    "answer": "Currently, we only offer shipping within the United States."
  },
];

const addressTypeData = [
  {
    name: 'Default',
  },
  {
    name: 'Home',
  },
  {
    name: 'Office',
  },
];

export const fieldProperties = [
  {
    name: 'country',
    label: 'Country',
    component: 'select',
    options: Country && Country.getAllCountries().map((item) => ({
      value: item.isoCode,
      label: item.name,
    })),
  },
  {
    name: 'city',
    label: 'Choose your City',
    component: 'select',
    options: []
  },
  {
    name: 'address1',
    label: 'Address 1',
    component: 'input',
    type: 'text',
  },
  {
    name: 'address2',
    label: 'Address 2',
    component: 'input',
    type: 'text',
  },
  {
    name: 'zipCode',
    label: 'Zip Code',
    component: 'input',
    type: 'number',
  },
  {
    name: 'addressType',
    label: 'Address Type',
    component: 'select',
    options: addressTypeData.map((item) => ({
      value: item.name,
      label: item.name,
    })),
  },
];

export const tableDataStub = [
  {
    name: "You",
    trackingId: 11111,
    date: "2 March 2022",
    status: "Approved",
  },
  {
    name: "Dont have",
    trackingId: 11111,
    date: "2 March 2022",
    status: "Pending",
  },
  {
    name: "anything",
    trackingId: 11111,
    date: "2 March 2022",
    status: "Approved",
  },
  {
    name: "Here",
    trackingId: 11111,
    date: "2 March 2022",
    status: "Delivered",
  },
];
