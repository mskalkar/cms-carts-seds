import { LOAD_SECTIONS } from "../../store/actions/initial";

const initialState = [];

export default (data = initialState, action) => {
  switch (action.type) {
    case LOAD_SECTIONS:
      return action.data;
    //UPDATE SECTIONS
    default:
      return data;
  }
};
