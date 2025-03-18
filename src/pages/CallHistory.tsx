
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import Sidebar from '@/components/Dashboard/Sidebar';
import { indianMockData } from '@/lib/indianMockData';

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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Emergency Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {indianMockData.calls.map(call => (
                    <TableRow key={call.id}>
                      <TableCell>{call.emergencyType}</TableCell>
                      <TableCell>{call.location}</TableCell>
                      <TableCell>
                        {new Date(call.timestamp).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true
                        })}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs ${
                          call.status === 'resolved' ? 'bg-green-100 text-green-800' : 
                          call.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {call.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className={`h-2 w-2 rounded-full mr-2 ${
                            call.priority === 'high' ? 'bg-emergency-high' : 
                            call.priority === 'medium' ? 'bg-emergency-medium' : 
                            'bg-emergency-low'
                          }`}></div>
                          {call.priority}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CallHistory;
