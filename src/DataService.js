
const survey = {
  "questions": [
    {
      uuid: "q1",
      prevUuid: null,
      text: "Are you a man?",
      answers: ["a1", "a2"]
    },
    {
      uuid: "q2",
      prevUuid: "q1",
      text: "What sport do you do?",
      answers: ["a3", "a4", "a5"]
    },
    {
      uuid: "q3",
      prevUuid: "q2",
      text: "What kind of surface do you run?",
      answers: ["a6", "a7"]
    },
    {
      uuid: "q4",
      prevUuid: "q2",
      text: "What kind of bike do you use?",
      answers: ["a8", "a9"]
    },
    {
      uuid: "q5",
      prevUuid: "q1",
      text: "What do you wear?",
      answers: ["a10", "a11"]
    },
  ],
  "answers": [
    {
      uuid: "a1",
      nextUuid: "q2",
      text: "yes"
    },
    {
      uuid: "a2",
      nextUuid: "q5",
      text: "no"
    },
    {
      uuid: "a3",
      nextUuid: null,
      text: "none"
    },
    {
      uuid: "a4",
      nextUuid: "q3",
      text: "run"
    },
    {
      uuid: "a5",
      nextUuid: "q4",
      text: "cycle"
    },
    {
      uuid: "a6",
      nextUuid: null,
      text: "asphalt"
    },
    {
      uuid: "a7",
      nextUuid: null,
      text: "trails"
    },
    {
      uuid: "a8",
      nextUuid: null,
      text: "tourbike"
    },
    {
      uuid: "a9",
      nextUuid: null,
      text: "racebike"
    },
    {
      uuid: "a10",
      nextUuid: null,
      text: "skirt"
    },
    {
      uuid: "a11",
      nextUuid: null,
      text: "pants"
    }
  ]
};

const DataService = () => {

  const firstQuestion = () => {
    return survey.questions[0];
  };

  const findQuestion = uuid => {
    return survey.questions.find(question => uuid === question.uuid);
  };

  const findAnswer = uuid => {
    return survey.answers.find(answer => uuid === answer.uuid);
  };

  const augmentQuestions = qArr => {
    return qArr.map(question => {
      let augmentedAnswers = question.answers.map(answerUuid => {
        return findAnswer(answerUuid);
      });
      question.answers = augmentedAnswers;
      return question;
    });
  };

  const findNextQuestion = question => {
    if (question.selectedAnswer) {
      const q = findQuestion(question.selectedAnswer.nextUuid);
      if (q) {
        return q;
      }
    }
    return {
      uuid: null,
      prevUuid: question.prevUuid,
      text: "There was no next question ...",
      answers: []
    };
  };

  const setAnswer = (q, a) => {
    survey.questions.forEach(_q => {
      if (_q.uuid === q.uuid) {
        _q.selectedAnswer = findAnswer(a);
      }
    });
  };

  survey.questions = augmentQuestions(survey.questions);

  return {firstQuestion, findQuestion, setAnswer, findNextQuestion}
};

export default DataService;
