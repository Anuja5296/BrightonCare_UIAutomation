export const vitalsTestData = {
  initialVitals: {
    weight: '75',
    temperature: '96',
    temperatureMethod: 'Forehead',
    pulse: '75',
    systolicBP: '129',
    diastolicBP: '72',
    position: 'Sitting',
    respiratoryRate: '57',
    oxygenSaturation: '88',
    oxygenFlow: '0.5 L',
    bloodSugar: '83',
    bloodSugarTiming: 'Before meal',
    notes: 'checked vitals for resident on time'
  },

  updatedVitals: {
    weight: '85',
    temperature: '99',
    temperatureMethod: 'Axillary',
    pulse: '77',
    systolicBP: '132',
    diastolicBP: '70',
    position: 'Lying',
    respiratoryRate: '59',
    oxygenSaturation: '95',
    oxygenFlow: '1.5 L',
    bloodSugar: '89',
    bloodSugarTiming: 'After meal',
    notes: 'Updating vitals on time'
  },

  chartFrequencies: {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly'
  },

  expectedInitialCard: {
    weight: '75 lbs',
    temperature: '96°F',
    pulse: '75 bpm'
  },

  expectedUpdatedCard: {
    weight: '85 lbs',   
    temperature: '99°F',
    pulse: '77 bpm'
  }
};
