import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'

function App() {

const [questions, setQuestions] = useState(null)
const [answer, setAnswer] = useState(null)
const [currentIndex, setCurrentIndex] = useState(0)

function nextQuestion() {
  setAnswer(null)
  setCurrentIndex(currentIndex + 1)
}


useEffect(() => {
  fetch('https://opentdb.com/api.php?amount=10&type=boolean')
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results)
    setQuestions(data.results)

  })}, [])
  if (!questions) return <p>Misslyckade att ladda quiz, uppdatera sidan</p>
  return questions && (
    <>
      <div>
        {questions.map((quest, index) => (
          index === currentIndex ? ( 
            <div key={quest.question}>
              <div>{quest.question}</div>
          <Button onClick={() => { setAnswer(quest.correct_answer === 'True') }} variant="success">True</Button>
          <Button onClick={() => { setAnswer(quest.correct_answer === 'False') }} variant="danger">False</Button>
          {answer !== null && (
          <p>{answer ? 'Rätt, bra jobbat!' : 'Fel, bättre lycka nästa gång!'}</p>
          )}
            </div>
           ) : null
      ))}
    </div>
    <Button onClick={nextQuestion} variant="primary">Nästa fråga</Button>
      
    </>
    )
}

export default App