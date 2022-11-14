import { get, post } from "../utils/fetchUtils";

export const apiGetFormBySubmissionNumber = (submissionNum) => {
  return get(`http://localhost:8000/api/form/${submissionNum}`);
};

export const apiSubmitForm = (body) => {
  return post("http://localhost:8000/api/form/submit", body);
};

export const apiUpdateFormBySubmissionNumber = (body) => {
  return post(`http://localhost:8000/api/form/update`, body);
};
