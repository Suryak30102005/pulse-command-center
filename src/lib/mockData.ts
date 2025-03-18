
// Mock data for the dashboard
import { faker } from '@faker-js/faker';

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

export type LogEntry = {
  id: string;
  timestamp: Date;
  action: string;
  user: string;
  details: string;
};

export type Notification = {
  id: string;
  timestamp: Date;
  title: string;
  message: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
};

export type StationLocation = {
  id: string;
  name: string;
  coordinates: [number, number];
  officers: number;
  vehicles: number;
};

// Generate random coordinates around a center point
const generateRandomCoordinates = (centerLat: number, centerLng: number, radiusInKm: number): [number, number] => {
  const randomPoint = (centerPoint: number, radius: number) => {
    return centerPoint + (Math.random() * radius * 2 - radius);
  };
  
  // Convert km to degrees (approximate)
  const radiusInDeg = radiusInKm / 111;
  
  return [randomPoint(centerLng, radiusInDeg), randomPoint(centerLat, radiusInDeg)];
};

// Create mock emergency calls
export const createMockCalls = (count: number): EmergencyCall[] => {
  const emergencyTypes = [
    'Accident', 'Fire', 'Medical', 'Crime', 'Natural Disaster', 
    'Traffic Incident', 'Public Disturbance', 'Domestic Dispute'
  ];
  
  const statuses: CallStatus[] = ['new', 'assigned', 'in-progress', 'resolved'];
  
  return Array.from({ length: count }).map((_, index) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const priority = Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low';
    const coordinates = generateRandomCoordinates(37.7749, -122.4194, 10); // San Francisco area
    
    return {
      id: `call-${index + 1}`,
      callerName: faker.person.fullName(),
      callerNumber: faker.phone.number(),
      location: faker.location.streetAddress(),
      coordinates,
      status,
      timestamp: faker.date.recent({ days: 1 }),
      emergencyType: emergencyTypes[Math.floor(Math.random() * emergencyTypes.length)],
      priority,
      officerAssigned: status !== 'new' ? faker.person.fullName() : undefined,
      description: faker.lorem.sentence()
    };
  });
};

// Create mock log entries
export const createMockLogs = (count: number): LogEntry[] => {
  const actions = [
    'Call Received', 'Officer Assigned', 'Status Updated', 'Alert Sent',
    'Note Added', 'Location Updated', 'Priority Changed', 'Call Resolved'
  ];
  
  return Array.from({ length: count }).map((_, index) => {
    return {
      id: `log-${index + 1}`,
      timestamp: faker.date.recent({ days: 1 }),
      action: actions[Math.floor(Math.random() * actions.length)],
      user: faker.person.fullName(),
      details: faker.lorem.sentence()
    };
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Create mock notifications
export const createMockNotifications = (count: number): Notification[] => {
  const titles = [
    'Officer Responded', 'High Priority Call', 'Call Status Updated',
    'New Emergency', 'Resource Allocated', 'Alert Escalated'
  ];
  
  return Array.from({ length: count }).map((_, index) => {
    const priority = Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low';
    
    return {
      id: `notif-${index + 1}`,
      timestamp: faker.date.recent({ days: 1 }),
      title: titles[Math.floor(Math.random() * titles.length)],
      message: faker.lorem.sentence(),
      read: Math.random() > 0.3,
      priority
    };
  }).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Create mock station locations
export const createMockStations = (count: number): StationLocation[] => {
  return Array.from({ length: count }).map((_, index) => {
    const coordinates = generateRandomCoordinates(37.7749, -122.4194, 15); // San Francisco area
    
    return {
      id: `station-${index + 1}`,
      name: `Station ${index + 1}`,
      coordinates,
      officers: Math.floor(Math.random() * 15) + 5,
      vehicles: Math.floor(Math.random() * 8) + 2
    };
  });
};

// Generate statistics data
export const generateStatisticsData = () => {
  const emergencyTypes = ['Accident', 'Fire', 'Medical', 'Crime', 'Other'];
  const regions = ['North', 'South', 'East', 'West', 'Central'];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  return {
    byType: emergencyTypes.map(type => ({
      name: type,
      value: Math.floor(Math.random() * 100) + 10
    })),
    
    byRegion: regions.map(region => ({
      name: region,
      value: Math.floor(Math.random() * 100) + 10
    })),
    
    byHour: hours.map(hour => ({
      hour,
      calls: Math.floor(Math.random() * 15) + 1
    })),
    
    responseTimes: regions.map(region => ({
      name: region,
      value: Math.floor(Math.random() * 10) + 1
    }))
  };
};

// Performance summary data
export const generatePerformanceSummary = () => {
  return {
    totalCalls: Math.floor(Math.random() * 100) + 50,
    avgResponseTime: Math.floor(Math.random() * 10) + 3,
    alertsSent: Math.floor(Math.random() * 50) + 20,
    officersActive: Math.floor(Math.random() * 30) + 15
  };
};

// Mock data for initial load
export const mockData = {
  calls: createMockCalls(20),
  logs: createMockLogs(50),
  notifications: createMockNotifications(15),
  stations: createMockStations(5),
  statistics: generateStatisticsData(),
  performance: generatePerformanceSummary()
};
