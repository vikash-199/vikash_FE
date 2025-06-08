import { useState } from "react";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Pagination from "react-bootstrap/Pagination";

function TableComponent() {
  const [users, setUsers] = useState([
    { id: 101, name: "Kairatilal", email: "kairati@gmail.com" },
    { id: 102, name: "Dipak Dogla", email: "dipak@gmail.com" },
    { id: 103, name: "Black Debel", email: "black@gmail.com" },
    { id: 104, name: "Arya", email: "arya@gmail.com" },
    { id: 105, name: "John", email: "john@gmail.com" },
    { id: 106, name: "Zoe", email: "zoe@gmail.com" },
    { id: 107, name: "Ali", email: "ali@gmail.com" },
  ]);

  const [idSortOrder, setIdSortOrder] = useState("asc");
  const [nameSortOrder, setNameSortOrder] = useState("asc");
  const [editingRow, setEditingRow] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const handleIdSort = (order) => {
    const sortedUsers = [...users].sort((a, b) =>
      order === "asc" ? a.id - b.id : b.id - a.id
    );
    setUsers(sortedUsers);
    setIdSortOrder(order);
  };

  const handleNameSort = (order) => {
    const sortedUsers = [...users].sort((a, b) =>
      order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setUsers(sortedUsers);
    setNameSortOrder(order);
  };

  const handleEdit = (id) => {
    setEditingRow(id);
  };

  const handleSave = (id, name, email) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, name, email } : user))
    );
    setEditingRow(null);
  };

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = users.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(users.length / rowsPerPage);

  return (
    <div className="container mt-4">
      <h5>{users.length} Results</h5>
      <h2 className="mb-3 text-center">Sortable, Editable & Paginated Table</h2>

      <Table bordered>
        <thead>
          <tr>
            <th>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-id">
                  Id ({idSortOrder === "asc" ? "First-Last" : "Last-First"})
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleIdSort("asc")}>
                    First-Last
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleIdSort("desc")}>
                    Last-First
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th>
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-name">
                  Name ({nameSortOrder === "asc" ? "A-Z" : "Z-A"})
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleNameSort("asc")}>
                    A-Z
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleNameSort("desc")}>
                    Z-A
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>
                {editingRow === user.id ? (
                  <FormControl
                    type="text"
                    defaultValue={user.name}
                    onChange={(e) => (user.name = e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingRow === user.id ? (
                  <FormControl
                    type="email"
                    defaultValue={user.email}
                    onChange={(e) => (user.email = e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingRow === user.id ? (
                  <Button
                    variant="success"
                    onClick={() => handleSave(user.id, user.name, user.email)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button variant="warning" onClick={() => handleEdit(user.id)}>
                    Edit
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.First
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        />
        {[...Array(totalPages)].map((_, i) => (
          <Pagination.Item
            key={i}
            active={currentPage === i + 1}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
}

export default TableComponent;

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const TableComponent = () => {
//   const initialData = [
//     { id: 101, first: "Mark", handle: "@mdo" },
//     { id: 102, first: "Jacob", handle: "@fat" },
//     { id: 103, first: "Larry the Bird", handle: "@twitter" },
//     { id: 104, first: "Emily", handle: "@emily" },
//     { id: 105, first: "Sophia", handle: "@sophia" },
//     { id: 106, first: "Liam", handle: "@liam" },
//     { id: 107, first: "Noah", handle: "@noah" },
//     { id: 108, first: "Olivia", handle: "@olivia" },
//     { id: 109, first: "William", handle: "@william" },
//     { id: 110, first: "Elijah", handle: "@elijah" },
//     { id: 111, first: "James", handle: "@james" },
//     { id: 112, first: "Benjamin", handle: "@ben" },
//     { id: 113, first: "Mia", handle: "@mia" },
//     { id: 114, first: "Charlotte", handle: "@charlotte" },
//     { id: 115, first: "Daniel", handle: "@daniel" },
//     { id: 116, first: "Ethan", handle: "@ethan" },
//     { id: 117, first: "Amelia", handle: "@amelia" },
//     { id: 118, first: "Henry", handle: "@henry" },
//     { id: 119, first: "Alexander", handle: "@alex" },
//     { id: 120, first: "Ella", handle: "@ella" },
//   ];

//   const [data, setData] = useState(initialData);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 5;
//   const [editRowId, setEditRowId] = useState(null);
//   const [editedValues, setEditedValues] = useState({ first: "", handle: "" });

//   const totalPages = Math.ceil(data.length / rowsPerPage);
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

//   const handleEdit = (row) => {
//     setEditRowId(row.id);
//     setEditedValues({ first: row.first, handle: row.handle });
//   };

//   const handleSave = (id) => {
//     setData(
//       data.map((row) => (row.id === id ? { ...row, ...editedValues } : row))
//     );
//     setEditRowId(null);
//   };

//   return (
//     <div className="container mt-4">
//       <h2>{data.length} results</h2>
//       <h2 className="mb-3 text-center">Sortable, Editable & Paginated Table</h2>

//       <table className="table table-bordered table-hover">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Handle</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentRows.map((row) => (
//             <tr key={row.id}>
//               <td>{row.id}</td>
//               <td>
//                 {editRowId === row.id ? (
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={editedValues.first}
//                     onChange={(e) =>
//                       setEditedValues({
//                         ...editedValues,
//                         first: e.target.value,
//                       })
//                     }
//                   />
//                 ) : (
//                   row.first
//                 )}
//               </td>
//               <td>
//                 {editRowId === row.id ? (
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={editedValues.handle}
//                     onChange={(e) =>
//                       setEditedValues({
//                         ...editedValues,
//                         handle: e.target.value,
//                       })
//                     }
//                   />
//                 ) : (
//                   row.handle
//                 )}
//               </td>
//               <td>
//                 {editRowId === row.id ? (
//                   <button
//                     className="btn btn-success btn-sm"
//                     onClick={() => handleSave(row.id)}
//                   >
//                     Save
//                   </button>
//                 ) : (
//                   <button
//                     className="btn btn-primary btn-sm"
//                     onClick={() => handleEdit(row)}
//                   >
//                     Edit
//                   </button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       <nav>
//         <ul className="pagination justify-content-center">
//           {[...Array(totalPages).keys()].map((number) => (
//             <li
//               key={number + 1}
//               className={`page-item ${
//                 currentPage === number + 1 ? "active" : ""
//               }`}
//             >
//               <button
//                 className="page-link"
//                 onClick={() => setCurrentPage(number + 1)}
//               >
//                 {number + 1}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default TableComponent;
