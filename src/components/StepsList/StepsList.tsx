interface StepData {
  id: number;
  date: string;
  distance: number;
}

interface StepsListProps {
  steps: StepData[];
  setSteps: React.Dispatch<React.SetStateAction<StepData[]>>;
}

const StepsList = ({steps, setSteps }:StepsListProps) => {

  const handleDelete = (id:number) => {
    const updatedSteps = steps.filter((step) => step.id !== id);
    localStorage.setItem('steps', JSON.stringify(updatedSteps));
    setSteps(updatedSteps);
  };
  
  return (
    <ul>
      {steps.map((step) => (
        <li key={step.id}>
          {step.date} - {step.distance} шагов
          <button onClick={() => handleDelete(step.id)}>Удалить</button>
        </li>
      ))}
    </ul>
  );
};

export default StepsList;
