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
  points?: number; // Добавляем поле для количества очков
}

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && WebApp.initDataUnsafe.user) {
      const user = WebApp.initDataUnsafe.user as UserData;
      setUserData(user);
    }
  }, []);

  return (
    <main 
      className="p-4 bg-cover bg-center" 
      style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(rgba(0, 0, 0, 1.8), rgba(122, 184, 196, 1))', // Темный фон к бежевому
        backdropFilter: 'blur(10px)' // Эффект размытия
      }}
    >
      <div className="flex flex-col items-center justify-center h-full"> {/* Общий контейнер по центру */}
        {userData && (
          <>
            {/*  Отображаем изображение по умолчанию */}
            <img 
              src="/image/else1.png" // Исправленный путь к изображению
              alt="Profile Picture" 
              className="w-32 h-32 rounded-full mb-4" 
            />
            <h1 className="text-3xl font-bold text-white">{userData.username}</h1>
            {userData.points !== undefined && ( // Проверяем наличие очков и отображаем их
              <p className="text-xl text-white mt-2">Очки: {userData.points}</p>
            )}
          </>
        )}
      </div>
    </main>
  );
}