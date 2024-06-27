interface AddStepProps {
  addStep: (date: string, distance: number) => void;
}
const FormComp = ({addStep}: AddStepProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const date = (e.target as HTMLFormElement).date.value
    const distance = (e.target as HTMLFormElement).distance.value
    addStep(date, parseInt(distance))
  }
  return (
    <div>
      <form id="steps-form" onSubmit={handleSubmit}>
        <label htmlFor="date">Дата(ДД.ММ.ГГ)</label>
        <input type="text" id='date' name="date" />
        <label htmlFor="distance">Пройдено км</label>
        <input type="text" id='distance' name='distance' />
        <button type="submit" form='steps-form' >Ок</button>
      </form>
    </div>
  )
}

export default FormComp