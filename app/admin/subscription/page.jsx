"use client";
import React, { useEffect, useState } from "react";
import SubsTableItem from "../../../components/AdminComponents/SubsTableItem";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Page() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmail = async () => {
    try {
      const response = await axios.get("/api/email");
      setEmails(response.data.emails);
    } catch (error) {
      toast.error("Failed to fetch emails");
    } finally {
      setLoading(false);
    }
  };

  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete(`/api/email`, {
        params: { id: mongoId },
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        fetchEmail();
      } else {
        toast.error("Error deleting email");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchEmail();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1 className="text-2xl font-semibold text-gray-800">📩 All Subscriptions</h1>
      <p className="text-sm text-gray-600 mt-1">
        View and manage all email subscriptions below.
      </p>

      <div className="relative max-w-[700px] h-[70vh] overflow-y-auto mt-6 border border-gray-300 rounded-lg shadow-lg bg-white scrollbar-hide">
        {/* Show loading spinner while fetching */}
        {loading ? (
          <div className="flex justify-center items-center h-[80vh]">
            <AiOutlineLoading3Quarters className="animate-spin text-3xl text-gray-700" />
          </div>
        ) : (
          <table className="w-full text-sm text-gray-700 border-collapse">
            {/* Table Header */}
            <thead className="text-xs font-semibold uppercase bg-gray-100 border-b border-gray-300">
              <tr>
                <th className="px-6 py-3 text-left">Email Subscription</th>
                <th className="hidden sm:table-cell px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {emails.length > 0 ? (
                emails.map((item, index) => (
                  <SubsTableItem
                    key={index}
                    email={item.email}
                    deleteEmail={deleteEmail}
                    date={item.date}
                    mongoId={item._id}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No email subscriptions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Page;
