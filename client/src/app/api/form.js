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

export const apiGetForms = (offset, limit, analysis = "") => {
  let url = `http://localhost:8000/api/form?offset=${offset}&limit=${limit}`;
  if (analysis) {
    url += `&analysis=${analysis}`;
  }

  return get(url);
};

export const apiGetStatusSummary = () => {
  return get(`http://localhost:8000/api/form/status`);
};
