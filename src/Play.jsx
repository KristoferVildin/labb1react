import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import he from "he";

function Play() {

  const [questions, setQuestions] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [value, setValue] = useState(0);

  function nextQuestion() {
    setAnswer(null);
    setCurrentIndex(currentIndex + 1);
  }

  function decode(s) {
    return he.decode(s);
  }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&type=boolean")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setQuestions(data.results);
      });
  }, []);
  if (!questions) return <p>Misslyckade att ladda quiz, uppdatera sidan</p>;
  return (
    questions && (
      <>
        <div>
          {questions.map((quest, index) =>
            index === currentIndex ? (
              <div key={quest.question}>
                <div>{decode(quest.question)}</div>
                <Button
                  onClick={() => {
                    setAnswer(quest.correct_answer === "True");
                    if (quest.correct_answer === "True") {
                      setValue(value + 1);
                      console.log(value);
                      console.log("Du hade rätt, svaret var true");
                    } else {
                      console.log("Fel svar, svaret var false");
                    }
                  }}
                  variant="success"
                >
                  True
                </Button>
                <Button
                  onClick={() => {
                    setAnswer(quest.correct_answer === "False");

                    if (quest.correct_answer === "False") {
                      setValue(value + 1);
                      console.log(value);
                      console.log("Rätt svar, falskt");
                    } else {
                      console.log("Fel svar, svaret var true");
                    }
                  }}
                  variant="danger"
                >
                  False
                </Button>
                <Button onClick={nextQuestion} variant="primary">
                  Nästa fråga
                </Button>
                {answer !== null && (
                  <p>
                    {answer
                      ? "Rätt, bra jobbat!"
                      : "Fel, bättre lycka nästa gång!"}
                  </p>
                )}
              </div>
            ) : null
          )}
        </div>
        {currentIndex === questions.length && <p>Du fick: {value} rätt 😊</p>}

      </>
    )
  );
}

export default Play;
