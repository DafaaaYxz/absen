import React from 'react';

interface HistoryItem {
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'Hadir' | 'Belum Lengkap';
}

interface HistoryTableProps {
  history: HistoryItem[];
}

const HistoryTable: React.FC<HistoryTableProps> = ({ history }) => {
  return (
    <div className="w-full max-w-4xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Riwayat Absensi</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full shadow-lg">
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th></th>
              <th>Tanggal</th>
              <th>Jam Masuk</th>
              <th>Jam Pulang</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.date}</td>
                  <td>{item.checkIn}</td>
                  <td>{item.checkOut}</td>
                  <td>
                    <span className={`badge ${item.status === 'Hadir' ? 'badge-success' : 'badge-warning'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">Belum ada riwayat absensi.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
