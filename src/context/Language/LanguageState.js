import LanguageContext from "./LanguageContext";
import React, { useState } from "react";

const LanguageState = (props) => {
  const [language, setLanguage] = useState("english");

  const handleLanguage = () => {
    const returnLanguage = {
      english: "hindi",
      hindi: "gujrati",
      gujrati: "english",
    };
    setLanguage(returnLanguage[language]);
  };

  return (
    <LanguageContext.Provider value={{ language, handleLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export default LanguageState;
