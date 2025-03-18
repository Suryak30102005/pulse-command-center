
// Indian mock data for the dashboard
import { faker } from '@faker-js/faker';

// Create an Indian-based faker instance
const indianFaker = faker.localize('en_IN');

export type CallStatus = 'new' | 'assigned' | 'in-progress' | 'resolved';

export type EmergencyCall = {
  id: string;
  callerName: string;
  callerNumber: string;
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  status: CallStatus;
  timestamp: Date;
  emergencyType: string;
  priority: 'low' | 'medium' | 'high';
  officerAssigned?: string;
  description: string;
};

// Indian cities
const indianCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal',
  'Visakhapatnam', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana'
];

// Indian localities by city
const indianLocalities: Record<string, string[]> = {
  'Mumbai': ['Andheri', 'Bandra', 'Colaba', 'Dadar', 'Juhu', 'Worli', 'Powai', 'Malad'],
  'Delhi': ['Connaught Place', 'Karol Bagh', 'Lajpat Nagar', 'Chandni Chowk', 'Hauz Khas', 'Dwarka'],
  'Bangalore': ['Koramangala', 'Indiranagar', 'Whitefield', 'Jayanagar', 'MG Road', 'Electronic City'],
  'Hyderabad': ['Banjara Hills', 'Jubilee Hills', 'Secunderabad', 'Gachibowli', 'Hitech City', 'Kukatpally'],
  'Chennai': ['T Nagar', 'Adyar', 'Nungambakkam', 'Anna Nagar', 'Velachery', 'Mylapore'],
  'Kolkata': ['Park Street', 'Salt Lake', 'New Town', 'Howrah', 'Ballygunge', 'Alipore'],
  'Pune': ['Koregaon Park', 'Kothrud', 'Hinjewadi', 'Baner', 'Viman Nagar', 'Hadapsar'],
};

// Indian emergency types
const indianEmergencyTypes = [
  'Road Accident', 'Fire', 'Medical Emergency', 'Crime', 'Natural Disaster', 
  'Traffic Congestion', 'Public Disturbance', 'Domestic Dispute', 
  'Building Collapse', 'Gas Leak', 'Electrical Emergency', 'Water Logging'
];

// Generate random Indian phone number
const generateIndianPhoneNumber = () => {
  const prefixes = ['91', '70', '80', '90', '72', '73', '74', '75', '76', '77', '78', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89', '92', '93', '94', '95', '96', '97', '98', '99'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const remaining = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
  return `+91 ${prefix}${remaining.slice(0, 4)} ${remaining.slice(4)}`;
};

// Generate Indian names
const indianFirstNames = [
  'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Reyansh', 'Ayaan', 'Atharva', 'Krishna', 'Ishaan',
  'Aanya', 'Aadhya', 'Saanvi', 'Pari', 'Myra', 'Ananya', 'Diya', 'Sara', 'Advika', 'Shreya',
  'Rajesh', 'Suresh', 'Ramesh', 'Mahesh', 'Dinesh', 'Amit', 'Sumit', 'Rohit', 'Mohit', 'Vikas',
  'Deepika', 'Priya', 'Neha', 'Pooja', 'Anjali', 'Swati', 'Ritu', 'Shweta', 'Kavita', 'Suman'
];

const indianLastNames = [
  'Sharma', 'Patel', 'Singh', 'Verma', 'Agarwal', 'Gupta', 'Jain', 'Kumar', 'Yadav', 'Shah',
  'Mishra', 'Reddy', 'Devi', 'Iyer', 'Nair', 'Mehta', 'Chatterjee', 'Mukherjee', 'Banerjee', 'Das',
  'Patil', 'Desai', 'Kapur', 'Kapoor', 'Joshi', 'Trivedi', 'Chauhan', 'Malhotra', 'Mehra', 'Pillai'
];

// Generate random Indian name
const generateIndianName = () => {
  const firstName = indianFirstNames[Math.floor(Math.random() * indianFirstNames.length)];
  const lastName = indianLastNames[Math.floor(Math.random() * indianLastNames.length)];
  return `${firstName} ${lastName}`;
};

// Generate random Indian location
const generateIndianLocation = () => {
  const city = indianCities[Math.floor(Math.random() * indianCities.length)];
  
  let area = '';
  if (indianLocalities[city]) {
    area = indianLocalities[city][Math.floor(Math.random() * indianLocalities[city].length)];
  } else {
    area = `Sector ${Math.floor(Math.random() * 100) + 1}`;
  }
  
  return `${area}, ${city}`;
};

// Generate random coordinates for major Indian cities
const generateIndianCoordinates = (): [number, number] => {
  // Approximate center of India
  const centerLat = 22.5937;
  const centerLng = 78.9629;
  
  // Random offset within India (roughly)
  const latOffset = (Math.random() - 0.5) * 14;
  const lngOffset = (Math.random() - 0.5) * 25;
  
  return [centerLng + lngOffset, centerLat + latOffset];
};

// Create mock emergency calls with Indian context
export const createIndianMockCalls = (count: number): EmergencyCall[] => {
  const statuses: CallStatus[] = ['new', 'assigned', 'in-progress', 'resolved'];
  
  return Array.from({ length: count }).map((_, index) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const priority = Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low';
    const coordinates = generateIndianCoordinates();
    
    return {
      id: `call-${index + 1}`,
      callerName: generateIndianName(),
      callerNumber: generateIndianPhoneNumber(),
      location: generateIndianLocation(),
      coordinates,
      status,
      timestamp: indianFaker.date.recent({ days: 30 }),
      emergencyType: indianEmergencyTypes[Math.floor(Math.random() * indianEmergencyTypes.length)],
      priority,
      officerAssigned: status !== 'new' ? generateIndianName() : undefined,
      description: indianFaker.lorem.sentence()
    };
  });
};

// Mock data for initial load with Indian context
export const indianMockData = {
  calls: createIndianMockCalls(20)
};
