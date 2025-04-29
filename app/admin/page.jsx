import React from 'react';
import { FaPlus, FaList, FaEnvelope, FaChartBar } from 'react-icons/fa';

function Page() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      

      <main className="flex-1 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-lg shadow-lg flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Total Blogs</h3>
                <p className="text-2xl font-bold">120</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-lg flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Subscribers</h3>
                <p className="text-2xl font-bold">3,450</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-lg flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">New Comments</h3>
                <p className="text-2xl font-bold">87</p>
              </div>
            </div>
          </div>
        </main>
    </div>
  );
}

export default Page;
