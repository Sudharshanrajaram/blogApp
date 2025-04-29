import React from "react";

function SubsTableItem({ email, mongoId, date, deleteEmail }) {
  const emailDate = new Date(date);
  return (
    <tr className="bg-white border-b text-left">
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {email ? email : "No Email"}
      </td>
      <td className="px-6 py-4 hidden sm:block">{emailDate.toDateString()}</td>
      <td className="px-6 py-4 cursor-pointer text-red-500" onClick={() => deleteEmail(mongoId)}>x</td>
    </tr>
  );
}

export default SubsTableItem;
