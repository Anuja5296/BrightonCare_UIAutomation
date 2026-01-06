// test-data/EditProfileDetails.ts

import { title } from "process";

export function getrandomAdminDate(startYear = 1950, endYear = 2020) {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();

  const randomDate = new Date(start + Math.random() * (end - start));

  const year = randomDate.getFullYear();

  const dayName = randomDate.toLocaleDateString("en-US", { weekday: "long" });
  const monthName = randomDate.toLocaleDateString("en-US", { month: "short" });
  const dayNumber = randomDate.getDate();

  const getOrdinal = (n: number) => {
    if (n > 3 && n < 21) return "th";
    switch (n % 10) {
      case 1: return "st";
      case 2: return "nd";
      case 3: return "rd";
      default: return "th";
    }
  };

  return {
    dobYear: year.toString(),
    dobDay: `${dayName}, ${monthName} ${dayNumber}${getOrdinal(dayNumber)},`,
    dobMonth: monthName.toString()
  };
}

export const randomAdminDate = getrandomAdminDate();

export const EditProfileTestData = {

  


  
  admissionDetails: {
    desiredCommunity: 'La Posada Senior Living',
    asap: true,
    respite: true,
    admissionType: 'Memory Care',
    hospice: true,
    summaryNotes: 'Testing admission details'
  },

  responsiblePerson: {
    firstName: 'Firstname',
    lastName: 'Lastname',
    specificRelationship: 'Daughter/Son',
    email: 'anuja.satpute@thinkitive.com',
    addressLine1: 'Pune, MH',
    additionalPerson: {
      firstName: 'sample',
      lastName: 'tester',
      relationship: 'Professional',
      specificRelationship: 'Placement Agent',
      contactType: 'Mobile',
      contactNumber: '(888) 841-7355',
      email: 'shubhankar.pisolkar@thinkitive.com',
      addressLine1: 'PUNE'
    }
  },

  diet: {
    dietTypes: ['Regular', 'Renal'],
    allergies: ['Penicillin']
  },

  diagnosis: {
    diagnoses: ['Left knee pain'],
    behavioralHealth: ['Anxiety']
  },

  insurance: {
    type: 'Medical',
    provider: 'Anuja satpute',
    memberId: '123456',
    groupNumber: '987654'
  },

  hospitalization: {
    hospitalName: 'MRI hospital UK',
    hospitalAddress: 'USA',
    contactNumber: '(987) 654-3234',
    fax: '(345) 678-9098'
  },

  immunization: {
    name: 'Pneumococcal (Pneumonia)',
    route: 'SC - Subcutaneous',
    administeredDate: 'June 15th, 2022',
    adminYear: getrandomAdminDate().dobYear,
    adminMMonth: getrandomAdminDate().dobMonth,
    administeredBy: 'Anuja Satpute',
    site: 'left top',
    manufacturer: 'Johnson & Johnson (Janssen)',
    lotNumber: '345678765'
  },

  physician: {
    firstName: 'anuja',
    lastName: 'think',
    profession: 'Physician',
    clinicalSpeciality: 'Bone pain',
    address: 'Pune',
    apt: '12',
    contactNumber: '(987) 654-3234',
    contactType: 'Mobile',
    email: 'anujasatpute1@thinkitive.com'
  
  }
};