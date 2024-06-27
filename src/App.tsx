import './App.css';
import FormComp from './components/FormComp/FormComp';
import StepsList from './components/StepsList/StepsList';
import { useState, useEffect } from 'react';

interface StepData {
  id: number;
  date: string;
  distance: number;
}

const App = () => {
  const [steps, setSteps] = useState<StepData[]>([]);

  useEffect(() => {
    const fetchSteps = async () => {
      const stepsData = await getSteps();
      setSteps(sortSteps(stepsData));
    };
    fetchSteps();
  }, []);

  const getSteps = (): StepData[] => {
    const steps = JSON.parse(localStorage.getItem('steps') || '[]');
    return steps;
  };

  const sortSteps = (steps: StepData[]): StepData[] => {
    return steps.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split('.').map(Number);
      const dateA = new Date(yearA, monthA - 1, dayA);
      const [dayB, monthB, yearB] = b.date.split('.').map(Number);
      const dateB = new Date(yearB, monthB - 1, dayB);
      return dateB.getTime() - dateA.getTime();
    });
  };

  const addStep = (date: string, distance: number): void => {
    const existingStep = steps.find((step) => step.date === date);
  
    if (existingStep) {
      const updatedSteps = steps.map((step) =>
        step.date === date ? { ...step, distance: step.distance + distance } : step
      );
      const sortedSteps = sortSteps(updatedSteps);
      localStorage.setItem('steps', JSON.stringify(sortedSteps));
      setSteps(sortedSteps);
    } else {
      const newStep = { id: Date.now(), date, distance };
      const updatedSteps = [...steps, newStep];
      const sortedSteps = sortSteps(updatedSteps);
      localStorage.setItem('steps', JSON.stringify(sortedSteps));
      setSteps(sortedSteps);
    }
  };

  return (
    <div>
      <FormComp addStep={addStep} />
      <StepsList steps={steps} setSteps={setSteps} />
    </div>
  );
};

export default App;
