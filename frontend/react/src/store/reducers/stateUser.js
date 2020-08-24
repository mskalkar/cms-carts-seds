import {
  STATE_INFO,
  USER_INFO,
  PROGRAM_INFO,
} from "../actions/stateUserActions";

// INITIAL STATE
const initialState = {
  name: "New York",
  abbr: "NY",
  programType: "comboCHIP", //values can be comboCHIP, mCHIP or sCHIP
  programName: "NY Combo Program",
  imageURI: `${process.env.PUBLIC_URL + "/img/states/ny.svg"}`,
  formName: "CARTS FY",
  formYear: new Date().getFullYear().toString(),
  currentUser: {
    role: "admin",
    state: { id: "NY", name: "New York" },
    username: "karen.dalton@state.gov",
  },
};

// STATE USER REDUCER
export default function (state = initialState, action) {
  switch (action.type) {
    case STATE_INFO:
      return {
        ...state,
        name: action.name,
        abbr: action.abbr,
        imageURI: action.imageURI,
      };
    case USER_INFO:
      return {
        ...state,
        currentUser: action.userObject,
      };
    case PROGRAM_INFO:
      return {
        ...state,
        programType: action.programObject,
        programName: action.programName,
        formName: action.formName,
      };
    default:
      return state;
  }
}
