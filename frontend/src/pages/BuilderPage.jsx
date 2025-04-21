import { useEffect } from 'react';
import BudgetBuilder from "../Components/sections/BudgetBuilder";

const BuilderPage = () => {
  useEffect(() => {
    document.title = "Build Your Setup | Gaming-Gear Hub";
  }, []);

  return <BudgetBuilder />;
};

export default BuilderPage;