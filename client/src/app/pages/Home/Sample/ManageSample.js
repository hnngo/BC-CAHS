import React from "react";

// Utils
import { getMockFormData } from "../../../../mocks/mock-sample";

const ManageSample = () => {
  const data = getMockFormData(10);
  console.log(data);

  return <div>ManageSample</div>;
};

export default ManageSample;
