
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from '@/components/Dashboard/Sidebar';
import { mockData } from '@/lib/mockData';

const CallHistory = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 py-4 px-6">
          <h1 className="text-2xl font-bold">Call History</h1>
        </header>
        
        <main className="p-6 flex-1">
          <Card>
            <CardHeader>
              <CardTitle>Recent Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Emergency Type</th>
                      <th className="text-left py-3 px-4">Location</th>
                      <th className="text-left py-3 px-4">Timestamp</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.calls.map(call => (
                      <tr key={call.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{call.emergencyType}</td>
                        <td className="py-2 px-4">{call.location}</td>
                        <td className="py-2 px-4">
                          {new Date(call.timestamp).toLocaleString()}
                        </td>
                        <td className="py-2 px-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            call.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                            call.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {call.status}
                          </span>
                        </td>
                        <td className="py-2 px-4">
                          <div className="flex items-center">
                            <div className={`h-2 w-2 rounded-full mr-2 ${
                              call.priority === 'high' ? 'bg-emergency-high' : 
                              call.priority === 'medium' ? 'bg-emergency-medium' : 
                              'bg-emergency-low'
                            }`}></div>
                            {call.priority}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CallHistory;
