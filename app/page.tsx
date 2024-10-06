'use client'

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'

// Define the interface for user data
interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
  photo_url?: string; 
  energy: number; 
  level: number; // Добавьте свойство level в UserData
  score: number; // Добавьте свойство score в UserData
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [energyLevel, setEnergyLevel] = useState(500) 
  const [level, setLevel] = useState(1) // Состояние для level
  const maxEnergy = 500; 
  const maxLevel = 12; // Максимальный уровень

  useEffect(() => {
    if (typeof window !== 'undefined' && WebApp.initDataUnsafe.user) {
      const user = WebApp.initDataUnsafe.user as UserData;
      setUserData(user);
      setEnergyLevel(user.energy); 
      setLevel(user.level); // Устанавливаем начальное значение level
    }
  }, []);

  return (
    <main 
      className="p-4 bg-cover bg-center" 
      style={{ backgroundImage: 'url(/image/fonrocket.png)', minHeight: '100vh' }}
    >
      <p className="text-5xl font-extrabold mt-20 text-center text-white flex items-center justify-center" style={{ fontFamily: 'Audiowide' }}> 
        <img src="./image/coin.png" alt="Coin" className="w-10 h-10 inline-block mr-2" /> 
        {userData ? `Ваши очки: ${userData.score}` : "0"} {/* Исправленное значение */}
      </p>
      
      <div className="absolute top-4 left-4"> 
        <div className="flex items-center"> 
          <img src="./image/toplivo.png" alt="Топливо" className="w-10 h-10 mr-0" /> 
          <div className="relative w-28 h-7 rounded-full bg-gray-300 overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-green-300 to-blue-700 rounded-full"   
              style={{ width: `${(energyLevel / maxEnergy) * 100}%` }} 
            >
            </div>
            <span className="absolute top-0 left-0 right-0 flex items-center justify-center h-full text-white font-bold">
              {energyLevel}/{maxEnergy}
            </span>
          </div>
          
          <div className="relative w-28 h-7 rounded-full bg-gray-300 overflow-hidden ml-8">
            <div 
              className="absolute h-full bg-blue-500 rounded-full" 
              style={{ width: `${(level / maxLevel) * 100}%` }} 
            >
            </div>
            <span className="absolute top-0 left-0 right-0 flex items-center justify-center h-full text-white font-bold">
              {level}/{maxLevel}
            </span>
          </div>
        </div>
      </div>
      
      {/* ... остальной код */}
    </main>
  );
}