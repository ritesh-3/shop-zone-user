import { useEffect, useState } from "react";

const useDarkMode = () => {

    let initDarkmode = false;
    const darkModeString = localStorage.getItem("darkMode");
    // console.log(`value => ${darkModeString} type => ${typeof (darkModeString)}`)
    initDarkmode = darkModeString === 'true' ? true : false;

    
    const [darkMode, setDarkMode] = useState(initDarkmode);



    // Update the dark mode preference in localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return [darkMode, toggleDarkMode];
};

export default useDarkMode;
