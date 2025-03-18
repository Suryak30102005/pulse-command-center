
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from '@/components/ui/avatar';
import Sidebar from '@/components/Dashboard/Sidebar';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 py-4 px-6">
          <h1 className="text-2xl font-bold">Officer Profile</h1>
        </header>
        
        <main className="p-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-32 h-32 relative">
                  <Avatar className="w-full h-full">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                      <span className="text-4xl font-medium">JD</span>
                    </div>
                  </Avatar>
                </div>
                
                <h2 className="text-xl font-bold mt-4">John Doe</h2>
                <p className="text-gray-500">Officer ID: 45892</p>
                
                <div className="w-full mt-6 space-y-2">
                  <Button className="w-full">Edit Profile</Button>
                  <Button variant="outline" className="w-full">Change Password</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Full Name</label>
                    <p className="font-medium">John Doe</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Badge Number</label>
                    <p className="font-medium">45892</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Department</label>
                    <p className="font-medium">Emergency Response</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Position</label>
                    <p className="font-medium">Senior Officer</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Email</label>
                    <p className="font-medium">john.doe@example.com</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Phone</label>
                    <p className="font-medium">(555) 123-4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <li key={item} className="border-b pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Responded to emergency call #{100 + item}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(Date.now() - item * 86400000).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Completed
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
