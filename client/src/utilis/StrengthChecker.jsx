import React from "react";

const StrengthChecker = ({ password }) => {
  console.log(password)
  const getPasswordStrength = () => {
    const passwordLength = password?.length;
    if (passwordLength < 1) {
      return "";
    } else if (passwordLength < 4) {
      return "weak";
    } else if (passwordLength < 8) {
      return "poor";
    } else if (passwordLength < 12) {
      return "medium";
    } else if (passwordLength < 16) {
      return "strong";
    } else {
      return "very strong";
    }
  };
  const passwordStrength = getPasswordStrength();
  if (!passwordStrength) {
    return <div className="error">no password to check</div>;
  }
  return (
    <div
      className={`${passwordStrength === "medium" && "medium"} ${
        passwordStrength === "strong" && "strong"
      } ${passwordStrength === "poor" && "poor"} ${
        passwordStrength === "very strong" && "very-strong"
      }`}
    >
      {password ? <span className="text-lg">Password strength: {passwordStrength}</span> : null}
    </div>
  );
};

export default StrengthChecker;
