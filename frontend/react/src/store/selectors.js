import jsonpath from "jsonpath";

export const selectQuestion = (state, id) => {
  const jp = `$..[*].contents.section.subsections[*].parts[*]..questions[?(@.id=='${id}')]`;
  //  const jp = `$..[*].contents.section.subsections[*].parts[*].questions[*].questions[*].questions[*]..questions[?(@.id=='${id}')]`;
  const questions = jsonpath.query(state, jp);
  if (questions.length) {
    console.log("questions", questions[0]);
    return questions[0];
  }

  return null;
};
