export interface IncidentData {
  description: string;
  dateButton: string;
  dayButton: string;
  location: string;
  injuries: string;
  witnessName: string;
  reportedBy: string;
  nurseProgress: string;
  imageFile?: string;
  documentFile?: string;
  comment: string;
}

export const incidentTestData: IncidentData = {
  description: 'Fall in bathroom',
  dateButton: '/05/2026',
  dayButton: 'Sunday, January 4th,',
  location: 'Bathroom',
  injuries: 'Leg fracture',
  witnessName: 'Anuja',
  reportedBy: 'Anuja Satpute',
  nurseProgress: 'Floor 1',
  imageFile: 'C:\\Users\\LNV-56\\Downloads\\Risk-Acknowledgement.pdf',
  documentFile: 'C:\\Users\\LNV-56\\Downloads\\Risk-Acknowledgement.pdf',
  comment: 'Tested it for Checking incident is working or not'
};

export const incidentTypes: string[] = [
  'Abuse (Suspected)',
  'Illness',
  'Behavioral',
  'Medical Emergency /'
];

export const signaturePositions: Array<{ x: number; y: number }> = [
  { x: 150, y: 200 },
  { x: 180, y: 195 },
  { x: 210, y: 205 },
  { x: 240, y: 200 },
  { x: 270, y: 195 },
  { x: 300, y: 205 },
  { x: 330, y: 200 },
];