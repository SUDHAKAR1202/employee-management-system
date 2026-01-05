import { saveEmployees } from "../../utils/storage";

const EmployeeTable = ({ employees, setEmployees, onEdit }) => {
  const toggleStatus = (id) => {
    const updated = employees.map((emp) =>
      emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
    );

    setEmployees(updated);
    saveEmployees(updated);
  };

  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const updated = employees.filter((emp) => emp.id !== id);
      setEmployees(updated);
      saveEmployees(updated);
    }
  };

  const printTable = () => {
  const content = document.querySelector(".print-section");

  const clone = content.cloneNode(true);

  clone.querySelectorAll(".no-print").forEach(el => el.remove());

  const win = window.open("", "", "width=900,height=650");

  win.document.write(`
   <html>
      <head>
        <title>Employee List</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
            font-size: 12px;
          }
          th {
            background: #f2f2f2;
          }
        </style>
      </head>
      <body>
        ${clone.innerHTML}
      </body>
    </html>
  `);
  win.document.close();
  win.print();
  win.close();
};


  return (
    <>
      <button onClick={() => window.print()}>Print Employees</button>
      <div className="print-section">
        <table style={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Profile</th>
              <th>Name</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>State</th>
              <th>Status</th>
              <th className="no-print">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No employees found
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>
                    {emp.image ? (
                      <img src={emp.image} alt="profile" width="40" />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td>{emp.name}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.dob}</td>
                  <td>{emp.state}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={emp.isActive}
                      onChange={() => toggleStatus(emp.id)}
                    />
                  </td>
                  <td className="no-print">
                    <button onClick={() => onEdit(emp)}>Edit</button>&nbsp;&nbsp;
                    <button onClick={() => deleteEmployee(emp.id)}>
                      Delete
                    </button>&nbsp;&nbsp;
                    <button onClick={printTable}>Print</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

const styles = {
  table: {
    width: "100%",
    marginTop: "20px",
    borderCollapse: "collapse",
  },
};

export default EmployeeTable;
