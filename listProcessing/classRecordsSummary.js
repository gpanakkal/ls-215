/**
 * Write a function that calculates overall student grades and
 * exam average, minimum, and maximum scores per student, rounded to one decimal place
 * 
 * Input: a scores object of { student: {id: int, scores: { exams: int[], exercises: int[] } } }
 * Output: an object of { studentGrades: gradeSummary[], exams: examSummary[] }
 * - gradeSummary is a string of form xx (L), where xx is the integer grade and L is the letter grade
 * - examSummary is an object of form { average: number, minimum: int, maximum: int }
 * 
 * Algorithm:
 * Initialize empty arrays studentGrades and exams
 * Iterate over `scores`:
 * - calculate studentGrade
 * - map student grade to a letter
 * - create a gradeSummary by and push it to studentGrades
 * - calculate the rounded average, min, and max exam grades and push an examSummary object to exams
 * return { studentGrades, exams }
 * 
 * calcStudentGrade:
 * - Take a student's scores as input
 * - Average the exams and exercises
 * - Get the weighted sum of examAverage + exerciseAverage, 
 *   with .65 weight for exams and .35 for exercises
 * - return the weighted sum rounded to the nearest integer
 * 
 * getStudentLetterGrade:
 * - Take a numerical grade as input
 * - Use a series of if (grade >= 93) { } else if (grade >= 85)... to return letter grades
 */

let studentScores = {
  student1: {
    id: 123456789,
    scores: {
      exams: [90, 95, 100, 80],
      exercises: [20, 15, 10, 19, 15],
    },
  },
  student2: {
    id: 123456799,
    scores: {
      exams: [50, 70, 90, 100],
      exercises: [0, 15, 20, 15, 15],
    },
  },
  student3: {
    id: 123457789,
    scores: {
      exams: [88, 87, 88, 89],
      exercises: [10, 20, 10, 19, 18],
    },
  },
  student4: {
    id: 112233445,
    scores: {
      exams: [100, 100, 100, 100],
      exercises: [10, 15, 10, 10, 15],
    },
  },
  student5: {
    id: 112233446,
    scores: {
      exams: [50, 80, 60, 90],
      exercises: [10, 0, 10, 10, 0],
    },
  },
};

const getAvg = (arr) => arr.reduce((sum, curr) => sum + curr, 0) / arr.length;

function calcStudentGrade(studentScores) {
  const { exams, exercises } = studentScores;
  const examAverage = getAvg(exams);
  const exerciseAverage = exercises.reduce((sum, curr) => sum + curr);
  const weightedSum = .65 * examAverage + .35 * exerciseAverage;
  // console.log({ studentScores, examAverage, exerciseAverage, weightedSum })
  return Math.round(weightedSum);
}

function getStudentLetterGrade(grade) {
  if (grade >= 93) return 'A';
  else if (grade >= 85) return 'B';
  else if (grade >= 77) return 'C';
  else if (grade >= 69) return 'D';
  else if (grade >= 60) return 'E';
  else return 'F';
}

const getArrColumn = (arr, index) => arr.map((row) => row[index]);

const transposeArray = (arr) => arr[0].map((_, i) => getArrColumn(arr, i));

function getExamSummary(examScores) {
  const scoresPerExam = transposeArray(examScores);
  console.log({scoresPerExam, avg: getAvg(scoresPerExam) });
  const summaries = scoresPerExam.map((exam) => ({
    average: parseFloat(getAvg(exam).toFixed(1)),
    minimum: Math.min(...exam),
    maximum: Math.max(...exam),
  }));
  return summaries;
}

function generateClassRecordSummary(students) {
  const studentGrades = [];
  Object.values(students).forEach((student) => {
    const grade = calcStudentGrade(student.scores);
    const letterGrade = getStudentLetterGrade(grade);
    const gradeSummary = `${grade} (${letterGrade})`;
    studentGrades.push(gradeSummary);
  });
  const examScores = Object.values(students).map((student) => student.scores.exams);
  const examSummary = getExamSummary(examScores);

  return { studentGrades, exams: examSummary };
}

console.log(generateClassRecordSummary(studentScores));

// returns:
// {
//   studentGrades: [ '87 (B)', '73 (D)', '84 (C)', '86 (B)', '56 (F)' ],
//   exams: [
//     { average: 75.6, minimum: 50, maximum: 100 },
//     { average: 86.4, minimum: 70, maximum: 100 },
//     { average: 87.6, minimum: 60, maximum: 100 },
//     { average: 91.8, minimum: 80, maximum: 100 },
//   ],
// }