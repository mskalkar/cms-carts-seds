//ACTION TYPES
export const STATE_INFO = "STATE_INFO";
export const USER_INFO = "USER_INFO";
export const PROGRAM_INFO = "PROGRAM_INFO";

//ACTION CREATORS
export const getUserData = (userObject) => ({
  type: USER_INFO,
  userObject: userObject,
});

export const getProgramData = (programObject) => ({
  type: PROGRAM_INFO,
  programType: programObject.programType,
  programName: programObject.programName,
  formName: programObject.formName,
});

export const getStateData = (stateObject) => ({
  type: STATE_INFO,
  name: stateObject.name,
  abbr: stateObject.abbr,
  imageURI: stateObject.imageURI,
});
