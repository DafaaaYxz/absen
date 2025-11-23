import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AttendanceCard from './components/AttendanceCard';
import HistoryTable from './components/HistoryTable';
import Footer from './components/Footer';

interface HistoryItem {
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Hadir' | 'Belum Lengkap';
}

const App: React.FC = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      date: new Date(Date.now() - 86400000).toLocaleDateString('id-ID'),
      checkIn: '08:01:15',
      checkOut: '17:05:30',
      status: 'Hadir',
    },
    {
      date: new Date(Date.now() - 2 * 86400000).toLocaleDateString('id-ID'),
      checkIn: '07:59:02',
      checkOut: '17:01:22',
      status: 'Hadir',
    },
  ]);

  const handleCheckIn = () => {
    const now = new Date();
    const newRecord: HistoryItem = {
      date: now.toLocaleDateString('id-ID'),
      checkIn: now.toLocaleTimeString('id-ID'),
      checkOut: '-',
      status: 'Belum Lengkap',
    };
    setHistory([newRecord, ...history]);
    setIsCheckedIn(true);
  };

  const handleCheckOut = () => {
    const now = new Date();
    const updatedHistory = [...history];
    if (updatedHistory.length > 0 && updatedHistory[0].status === 'Belum Lengkap') {
      updatedHistory[0].checkOut = now.toLocaleTimeString('id-ID');
      updatedHistory[0].status = 'Hadir';
      setHistory(updatedHistory);
    }
    setIsCheckedIn(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        <AttendanceCard 
          isCheckedIn={isCheckedIn} 
          onCheckIn={handleCheckIn} 
          onCheckOut={handleCheckOut} 
        />
        <HistoryTable history={history} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
