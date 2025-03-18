
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityIcon, AlertCircleIcon, ClockIcon, FilterIcon } from "lucide-react";
import { mockData } from '@/lib/mockData';
import MapPanel from '@/components/Dashboard/MapPanel';
import Sidebar from '@/components/Dashboard/Sidebar';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 py-4 px-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Emergency Command & Monitoring Center</h1>
            <div className="flex items-center gap-4">
              <div className="bg-gray-100 p-1 rounded-md flex items-center gap-2">
                <button className="px-2 py-1 rounded bg-white shadow-sm">
                  Day
                </button>
                <button className="px-2 py-1 rounded hover:bg-gray-50">
                  Week
                </button>
                <button className="px-2 py-1 rounded hover:bg-gray-50">
                  Month
                </button>
              </div>
              <button className="p-2 rounded-md hover:bg-gray-100">
                <FilterIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </header>
        
        <main className="p-6 flex-1">
          <div className="mb-6 grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                  <ActivityIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Calls Today</p>
                  <h2 className="text-2xl font-bold">{mockData.performance.totalCalls}</h2>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
                  <ClockIcon className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg Response Time</p>
                  <h2 className="text-2xl font-bold">{mockData.performance.avgResponseTime} min</h2>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center">
                  <AlertCircleIcon className="h-6 w-6 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Alerts Sent</p>
                  <h2 className="text-2xl font-bold">{mockData.performance.alertsSent}</h2>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Officers Active</p>
                  <h2 className="text-2xl font-bold">{mockData.performance.officersActive}</h2>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {/* Map Panel */}
            <MapPanel calls={mockData.calls} stations={mockData.stations} />
            
            {/* Active Calls */}
            <Card className="col-span-1 row-span-1 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium">Active Calls</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-1 max-h-[190px] overflow-y-auto px-4">
                  {mockData.calls
                    .filter(call => call.status !== 'resolved')
                    .sort((a, b) => {
                      const priorityOrder = { high: 0, medium: 1, low: 2 };
                      return priorityOrder[a.priority] - priorityOrder[b.priority];
                    })
                    .slice(0, 5)
                    .map(call => (
                      <div key={call.id} className="p-2 rounded-md border border-gray-100 hover:bg-gray-50">
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${
                            call.priority === 'high' ? 'bg-emergency-high' : 
                            call.priority === 'medium' ? 'bg-emergency-medium' : 
                            'bg-emergency-low'
                          }`}></div>
                          <span className="text-sm font-medium">{call.emergencyType}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{call.location}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs bg-gray-100 px-1 rounded">{call.status}</span>
                          <span className="text-xs text-gray-400">
                            {new Date(call.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
            
            {/* Notifications */}
            <Card className="col-span-1 row-span-1 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium">Notifications</CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="space-y-1 max-h-[190px] overflow-y-auto px-4">
                  {mockData.notifications
                    .filter(notification => !notification.read)
                    .slice(0, 5)
                    .map(notification => (
                      <div key={notification.id} className="p-2 rounded-md border border-gray-100 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{notification.title}</span>
                          <div className={`h-2 w-2 rounded-full ${
                            notification.priority === 'high' ? 'bg-emergency-high' : 
                            notification.priority === 'medium' ? 'bg-emergency-medium' : 
                            'bg-emergency-low'
                          }`}></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(notification.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    ))
                  }
                </div>
              </CardContent>
            </Card>
            
            {/* System Log */}
            <Card className="col-span-2 row-span-1 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-medium">System Log</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[220px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-white">
                      <tr className="border-b text-left">
                        <th className="px-4 py-2 text-sm font-medium text-gray-500">Time</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-500">Action</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-500">User</th>
                        <th className="px-4 py-2 text-sm font-medium text-gray-500">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.logs.slice(0, 10).map(log => (
                        <tr key={log.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2 text-xs text-gray-500">
                            {new Date(log.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
                          </td>
                          <td className="px-4 py-2 text-xs">{log.action}</td>
                          <td className="px-4 py-2 text-xs">{log.user}</td>
                          <td className="px-4 py-2 text-xs text-gray-600">{log.details}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
