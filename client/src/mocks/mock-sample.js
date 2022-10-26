import { faker } from "@faker-js/faker";

export const getMockFormData = (numberOfForm = 1) => {
  const data = [];
  for (let i = 0; i < numberOfForm; i++) {
    data.push({
      submission_num: faker.datatype.uuid(),
      receipt_date: faker.date.past(),
      sampling_time_submission: faker.date.past(),
      bc_cahs_receiver_last_name: faker.name.lastName(),
      bc_cahs_receiver_first_name: faker.name.firstName(),
      company_name: faker.company.name(),
      submitter: faker.name.fullName(),
      contact_phone_num: faker.phone.number(),
      purchase_order_num: faker.datatype.string(10).toUpperCase(),
      client_case_num: faker.random.numeric(5),
      sampling_date: faker.date.future(),
      sampling_location: faker.address.cityName(),
      bc_cahs_custodian_initials: faker.name.firstName(),
      bc_cahs_p_i: faker.random.alpha(5),
      bc_cahs_project: faker.commerce.productName(),

      num_of_samples: faker.datatype.number({ min: 1, max: 50 }),
      species: faker.animal.bear(),
      sample_type: faker.helpers.arrayElement(["Type 1", "Type 2", "Type 3", "Type 4", "Type 5"]),
      sample_origin: faker.helpers.arrayElement([
        "Wild",
        "Brood Stock",
        "Freshwater",
        "Saltwater",
        "Other"
      ]),
      sample_condition: faker.helpers.arrayElement([
        "Dry Ice",
        "Frozen",
        "Ice Packs",
        "Thawed",
        "RT",
        "Other"
      ]),
      other_details: "Sample Details",

      analysis_requested: faker.helpers.arrayElement([
        "ATPase",
        "Bacteriology",
        "Bio-Assay",
        "ELISA Cortisol",
        "ELISA R.sal",
        "PCR",
        "Plankton ID",
        "RT-qPCR",
        "Sea Lice ID",
        "Virology",
        "Water Analysis"
      ]),
      rt_qpcr_type: ["IHNv", "IPNv", "ISAv", "VHSv"]
    });
  }
  return data;
};
