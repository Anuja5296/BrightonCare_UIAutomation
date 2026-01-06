// test-data/Addmovein-data.ts

import { get } from "http";

// Generate unique SSN
export function generateUniqueSSN(): string {
    const part1 = Math.floor(Math.random() * 900 + 100);
    const part2 = Math.floor(Math.random() * 90 + 10);
    const part3 = Math.floor(Math.random() * 9000 + 1000);
    return `${part1}-${part2}-${part3}`;
}

// Generate random string of letters
function generateRandomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Capitalize first letter
    return result.charAt(0).toUpperCase() + result.slice(1);
}

// Generate truly random first name
export function generateFirstName(): string {
    const length = Math.floor(Math.random() * 4) + 4; // 4-7 characters
    return generateRandomString(length);
}

// Generate truly random last name
export function generateLastName(): string {
    const length = Math.floor(Math.random() * 5) + 5; // 5-9 characters
    return generateRandomString(length);
}

// Generate unique email with timestamp
export function generateUniqueEmail(firstName: string, lastName: string): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000);
    const domains = ["test.com", "example.com", "demo.com", "mail.com", "email.com"];
    const domain = domains[Math.floor(Math.random() * domains.length)];
    
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${timestamp}.${random}@${domain}`;
}

export function getRandomDOB(startYear = 1950, endYear = 2020) {
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

// Generate complete random move-in data with unique names and email
export function generateMoveInData(daysFromToday: number = 0) {
    const firstName = generateFirstName();
    const lastName = generateLastName();
    const rpFirstName = generateFirstName();
    const rpLastName = generateLastName();
    const dob= getRandomDOB();
    const dobDay = dob.dobDay;
    const dobYear = dob.dobYear;
    const dobMonth = dob.dobMonth;  
    console.log("####################################");
    console.log(dobDay);
    console.log(dobYear);
    console.log(dobMonth);
    console.log("####################################");
    console.log(`\n🎲 Generating random names: ${firstName} ${lastName}`);
    
    return {
        // Resident Info
        firstName: firstName,
        lastName: lastName,
        ssn: generateUniqueSSN(),
        
        // Date of Birth
        dobYear: dobYear,
        dobDay: dobDay,
        dobMonth: dobMonth,
        
        // Demographics
        genderIdentity: "Male",
        pronouns: "She/Her",
        maritalStatus: "Single",
        
        // Resident Contact & Address
        residentContactNumber: "(888) 841-7355",
        addressLine1: "pune maharashtra",
        city: "Austin",
        state: "Kansas",
        zipCode: "55555-",
        
        // Responsible Person - with unique names and email
        rpFirstName: rpFirstName,
        rpLastName: rpLastName,
        relationship: "Personal",
        specificRelationship: "Sibling",
        contactNumberType: "Home",
        rpContactNumber: "(968) 921-7266",
        email: generateUniqueEmail(rpFirstName, rpLastName),
        
        // RP Address
        rpAddressLine1: "123344444444444",
        rpCity: "Jacksonville",
        rpState: "Idaho",
        rpZipCode: "66666-66666",
        
        // Admission Details
        desiredCommunity: "Brighton Care",
        daysFromToday: daysFromToday
    };
}
