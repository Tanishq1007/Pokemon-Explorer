import React from 'react';
import { Progress } from '@/components/ui/index';

interface StatBarProps {
  name: string;
  value: number;
}

export default function StatBar({ name, value }: StatBarProps) {
  // Max base stat value is typically around 255
  const maxStat = 255;
  
  const formatStatName = (stat: string) => {
    const statNames: Record<string, string> = {
      'hp': 'HP',
      'attack': 'Attack',
      'defense': 'Defense',
      'special-attack': 'Sp. Atk',
      'special-defense': 'Sp. Def',
      'speed': 'Speed'
    };
    
    return statNames[stat] || stat;
  };
  
  // Color based on stat value
  const getProgressColor = (value: number) => {
    const percentage = (value / maxStat) * 100;
    if (percentage < 30) return '#ef4444'; // red-500
    if (percentage < 50) return '#f97316'; // orange-500
    if (percentage < 70) return '#eab308'; // yellow-500
    return '#22c55e'; // green-500
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{formatStatName(name)}</span>
        <span className="text-sm font-medium">{value}</span>
      </div>
      <Progress 
        value={value} 
        max={maxStat} 
        className="h-2"
        color={getProgressColor(value)}
      />
    </div>
  );
}