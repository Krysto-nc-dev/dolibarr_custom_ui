import React from 'react';

const DataTable = ({ columns, data, isLoading, error }) => {
  return (
    <div className="p-4">
      {isLoading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="text-red-500">Erreur : {error.message}</p>
      ) : (
        <div className="overflow-x-auto h-80">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-primaryColor">
                {columns.map((column) => (
                  <th key={column.accessor} className="px-4 py-2 border-b">
                    {column.Header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data && data.map((row) => (
                <tr key={row.id} className="hover:bg-secondaryColor">
                  {columns.map((column) => (
                    <td key={column.accessor} className="px-4 py-2 border-b">
                      {column.render ? column.render(row[column.accessor]) : row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataTable;
