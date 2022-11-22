import { get, post } from "../utils/fetchUtils";

export const apiGetFormBySubmissionNumber = (submissionNum) => {
  return get(`/api/form/${submissionNum}`);
};

export const apiSubmitForm = (body) => {
  return post("/api/form/submit", body);
};

export const apiUpdateFormBySubmissionNumber = (body) => {
  return post(`/api/form/update`, body);
};

export const apiGetForms = (offset, limit, analysis = "") => {
  let url = `/api/form?offset=${offset}&limit=${limit}`;
  if (analysis) {
    url += `&analysis=${analysis}`;
  }

  return get(url);
};

export const apiGetStatusSummary = () => {
  return get(`/api/form/status`);
};

export const apiGetFormStatusBySubmissionNumber = (submissionNum) => {
  return get(`/api/form/status/${submissionNum}`);
};

export const apiUpdateFormStatus = (body) => {
  return post(`/api/form/status/update`, body);
};
