
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPinIcon } from "lucide-react";
import { EmergencyCall, StationLocation } from '@/lib/mockData';

// Note: In a real implementation, we would use a mapping library like Mapbox or Leaflet
// For this demo, we'll create a simulated map visualization

type MapPanelProps = {
  calls: EmergencyCall[];
  stations: StationLocation[];
};

const MapPanel: React.FC<MapPanelProps> = ({ calls, stations }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Colors for different priority levels
  const priorityColors = {
    high: 'rgb(var(--emergency-high) / 1)',
    medium: 'rgb(var(--emergency-medium) / 1)',
    low: 'rgb(var(--emergency-low) / 1)',
  };

  useEffect(() => {
    if (!mapRef.current) return;
    
    // In a real implementation, this is where we would initialize the map
    // For now, we'll just add our simulated markers
    
    const mapContainer = mapRef.current;
    
    // Clear any existing markers
    const existingMarkers = mapContainer.querySelectorAll('.map-marker');
    existingMarkers.forEach(marker => marker.remove());
    
    // Add emergency call markers
    calls.forEach(call => {
      const marker = document.createElement('div');
      marker.className = 'map-marker absolute animate-ping-slow';
      marker.style.left = `${(call.coordinates[0] + 122.5) * 10}%`;
      marker.style.top = `${(38 - call.coordinates[1]) * 20}%`;
      marker.style.backgroundColor = priorityColors[call.priority];
      
      const dot = document.createElement('div');
      dot.className = 'absolute w-3 h-3 rounded-full';
      dot.style.backgroundColor = priorityColors[call.priority];
      dot.style.transform = 'translate(-50%, -50%)';
      
      marker.appendChild(dot);
      mapContainer.appendChild(marker);
    });
    
    // Add station markers
    stations.forEach(station => {
      const marker = document.createElement('div');
      marker.className = 'map-marker absolute z-10';
      marker.style.left = `${(station.coordinates[0] + 122.5) * 10}%`;
      marker.style.top = `${(38 - station.coordinates[1]) * 20}%`;
      
      const stationIcon = document.createElement('div');
      stationIcon.className = 'w-4 h-4 bg-blue-600 rounded-sm transform rotate-45';
      stationIcon.style.transform = 'translate(-50%, -50%) rotate(45deg)';
      
      marker.appendChild(stationIcon);
      mapContainer.appendChild(marker);
    });
  }, [calls, stations]);

  return (
    <Card className="col-span-3 row-span-2 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-medium">Emergency Overview</CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className="flex items-center gap-1 py-1">
              <div className="w-2 h-2 rounded-full bg-emergency-high"></div>
              High Priority
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1">
              <div className="w-2 h-2 rounded-full bg-emergency-medium"></div>
              Medium
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1">
              <div className="w-2 h-2 rounded-full bg-emergency-low"></div>
              Low
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 py-1">
              <div className="w-2 h-2 bg-blue-600 rotate-45"></div>
              Station
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-[460px]">
        <div className="relative w-full h-full">
          <div 
            ref={mapRef} 
            className="absolute inset-0 bg-muted/30 grid-stack"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          >
            {/* Map grid lines */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`v-${i}`} className="border-r border-gray-200/30 h-full" style={{ gridColumn: i + 1 }} />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`h-${i}`} className="border-b border-gray-200/30 w-full" style={{ gridRow: i + 1 }} />
              ))}
            </div>
            
            {/* This is where our markers will be added by the useEffect hook */}
            
            {/* Map overlay for depth effect */}
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)]"></div>
          </div>
          
          {/* This would be a real map in production */}
          <div className="absolute bottom-2 right-2 z-10">
            <div className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-sm flex items-center">
              <MapPinIcon className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">San Francisco Area</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapPanel;
