import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Footer from "../components/Home/Footer";
import Header from "../components/Header/Header";
import styles from "../components/Styles/styles";
import { FAQ_DATA } from "../components/Data/data";



const FAQPage = () => {
    return (
      <div>
        <Header active={4} />
        <div className={styles.innerPading}>
          <Faq faqData={FAQ_DATA} />
        </div>
        <Footer />
      </div>
    );
  };
  
  const Faq = ({ faqData }) => {
    const [activeTab, setActiveTab] = useState(0);
  
    const toggleTab = (tab) => {
      if (activeTab === tab) {
        setActiveTab(0);
      } else {
        setActiveTab(tab);
      }
    };
  
    return (
      <div className="my-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">FAQ</h2>
        <div className="mx-auto space-y-4">
          {faqData.map((item, index) => (
            <div className="border-b border-gray-200 pb-4" key={index}>
              <button
                className="flex items-center justify-between w-full"
                onClick={() => toggleTab(index + 1)}
              >
                <span className="text-lg font-medium text-gray-900">
                  {item.question}
                </span>
                {activeTab === index + 1 ? (
                  <FaChevronUp className="h-6 w-6 text-gray-500" />
                ) : (
                  <FaChevronDown className="h-6 w-6 text-gray-500" />
                )}
              </button>
              {activeTab === index + 1 && (
                <div className="mt-4">
                  <p className="text-base text-gray-500">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default FAQPage;
