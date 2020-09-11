import { selectQuestion } from "../selectors";
import { LOAD_SECTIONS, QUESTION_ANSWERED } from "../actions/initial";

const initialState = [];

export default (sdata = initialState, action) => {
  switch (action.type) {
    case LOAD_SECTIONS:
      return action.data;
    case QUESTION_ANSWERED:
      const fragment = selectQuestion({ formData: sdata }, action.fragmentId);
      fragment.answer.entry = action.data;
      return JSON.parse(JSON.stringify(sdata));
    default:
      return sdata;
  }
};
