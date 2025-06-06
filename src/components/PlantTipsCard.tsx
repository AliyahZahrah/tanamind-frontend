import { Card, CardContent, CardTitle } from '../components/ui/card';
import React from 'react';

interface PlantTipProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function PlantTipsCard({ icon, title, description }: PlantTipProps) {
  return (
    <Card className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">{icon}</div>
        <div>
          <CardTitle className="text-lg text-gray-800 mb-2">{title}</CardTitle>
          <CardContent className="p-0 text-gray-600 text-sm leading-relaxed">
            {description}
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
