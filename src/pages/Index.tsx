
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangleIcon, ClockIcon, PhoneIcon, UserIcon } from "lucide-react";
import { mockData } from '@/lib/mockData';
import MapPanel from '@/components/Dashboard/MapPanel';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const activeCall = mockData.calls.find(call => call.status === 'new') || mockData.calls[0];
  
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar Navigation */}
      <aside className="w-72 border-r border-gray-200 p-6 flex flex-col">
        <h2 className="text-lg font-semibold mb-6">Navigation</h2>
        <nav className="space-y-4">
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
            <PhoneIcon className="h-5 w-5" />
            <span className="font-medium">Live Calls</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
            <ClockIcon className="h-5 w-5" />
            <span className="font-medium">Call History</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-primary transition-colors">
            <UserIcon className="h-5 w-5" />
            <span className="font-medium">Profile</span>
          </a>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6 grid grid-cols-3 gap-6">
        {/* Emergency Call Card */}
        <Card className="border border-red-200 overflow-hidden">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center gap-2 text-lg font-medium text-gray-700">
              <PhoneIcon className="h-5 w-5 text-red-400" />
              <span>Live Emergency Call</span>
              <div className="ml-auto flex items-center text-sm text-gray-400">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>Just now</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <UserIcon className="h-5 w-5" />
                <span>John Doe</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <PhoneIcon className="h-5 w-5" />
                <span>(555) 123-4567</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-gray-600">Distress Level</label>
              <Progress value={75} className="h-3 bg-gray-300">
                <div className="absolute inset-0 flex items-center justify-end pr-2">
                  <span className="text-xs font-medium text-white"></span>
                </div>
              </Progress>
            </div>
            
            <Button className="w-full bg-red-400 hover:bg-red-500 text-white">
              <AlertTriangleIcon className="h-4 w-4 mr-2" />
              Send Emergency Alert
            </Button>
          </CardContent>
        </Card>
        
        {/* Map Component */}
        <div className="col-span-2 rounded-lg border border-gray-100 overflow-hidden">
          <MapPanel calls={mockData.calls} stations={mockData.stations} />
        </div>
      </main>
    </div>
  );
};

export default Index;
