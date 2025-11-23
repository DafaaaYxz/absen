import React, { useState, useEffect } from 'react';

interface AttendanceCardProps {
  isCheckedIn: boolean;
  onCheckIn: () => void;
  onCheckOut: () => void;
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({ isCheckedIn, onCheckIn, onCheckOut }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="card w-full max-w-md bg-base-100 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-5xl font-bold">{formattedTime}</h2>
        <p className="mb-4">{formattedDate}</p>
        <div className="mb-4">
          {isCheckedIn ? (
            <div className="badge badge-success badge-lg gap-2 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Status: Sudah Absen Masuk
            </div>
          ) : (
            <div className="badge badge-error badge-lg gap-2 p-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Status: Belum Absen
            </div>
          )}
        </div>
        <div className="card-actions justify-center w-full">
          <button 
            className="btn btn-primary w-1/2" 
            onClick={onCheckIn} 
            disabled={isCheckedIn}
          >
            Absen Masuk
          </button>
          <button 
            className="btn btn-secondary w-1/2" 
            onClick={onCheckOut} 
            disabled={!isCheckedIn}
          >
            Absen Pulang
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCard;
