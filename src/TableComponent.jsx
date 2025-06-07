import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TableComponent = () => {
  const initialData = [
    { id: 101, first: "Mark", handle: "@mdo" },
    { id: 102, first: "Jacob", handle: "@fat" },
    { id: 103, first: "Larry the Bird", handle: "@twitter" },
    { id: 104, first: "Emily", handle: "@emily" },
    { id: 105, first: "Sophia", handle: "@sophia" },
    { id: 106, first: "Liam", handle: "@liam" },
    { id: 107, first: "Noah", handle: "@noah" },
    { id: 108, first: "Olivia", handle: "@olivia" },
    { id: 109, first: "William", handle: "@william" },
    { id: 110, first: "Elijah", handle: "@elijah" },
    { id: 111, first: "James", handle: "@james" },
    { id: 112, first: "Benjamin", handle: "@ben" },
    { id: 113, first: "Mia", handle: "@mia" },
    { id: 114, first: "Charlotte", handle: "@charlotte" },
    { id: 115, first: "Daniel", handle: "@daniel" },
    { id: 116, first: "Ethan", handle: "@ethan" },
    { id: 117, first: "Amelia", handle: "@amelia" },
    { id: 118, first: "Henry", handle: "@henry" },
    { id: 119, first: "Alexander", handle: "@alex" },
    { id: 120, first: "Ella", handle: "@ella" },
  ];

  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [editRowId, setEditRowId] = useState(null);
  const [editedValues, setEditedValues] = useState({ first: "", handle: "" });

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const handleEdit = (row) => {
    setEditRowId(row.id);
    setEditedValues({ first: row.first, handle: row.handle });
  };

  const handleSave = (id) => {
    setData(
      data.map((row) => (row.id === id ? { ...row, ...editedValues } : row))
    );
    setEditRowId(null);
  };

  return (
    <div className="container mt-4">
      <h2>{data.length} results</h2>
      <h2 className="mb-3 text-center">Sortable, Editable & Paginated Table</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Handle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>
                {editRowId === row.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editedValues.first}
                    onChange={(e) =>
                      setEditedValues({
                        ...editedValues,
                        first: e.target.value,
                      })
                    }
                  />
                ) : (
                  row.first
                )}
              </td>
              <td>
                {editRowId === row.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editedValues.handle}
                    onChange={(e) =>
                      setEditedValues({
                        ...editedValues,
                        handle: e.target.value,
                      })
                    }
                  />
                ) : (
                  row.handle
                )}
              </td>
              <td>
                {editRowId === row.id ? (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleSave(row.id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(row)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages).keys()].map((number) => (
            <li
              key={number + 1}
              className={`page-item ${
                currentPage === number + 1 ? "active" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(number + 1)}
              >
                {number + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TableComponent;
