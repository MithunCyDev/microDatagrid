import { useEffect, useState } from "react";
import "./App.css";
import MicroDataGrid from "./Component/MicroDataGrid";

function App() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simulate data fetching or some async operation
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false); // Set loading to false once operation is complete
    }, 10000); // Adjust duration as needed

    return () => clearTimeout(timeout);
  }, []);
  const columns = [
    { key: "id", label: "ID", width: "30px", textAlign: "left" },
    { key: "name", label: "Name", width: "30px", textAlign: "left" },
    { key: "age", label: "Age", width: "300px", textAlign: "left" },
    { key: "email", label: "Email", width: "50px", textAlign: "left" },
  ];

  const rows = [
    { id: 1, name: "John Doe", age: 30, email: "john@example.com" },
    { id: 2, name: "Jane Smith", age: 25, email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", age: 40, email: "bob@example.com" },
    { id: 4, name: "Bob1 Johnson", age: 40, email: "bob@example.com" },
    { id: 5, name: "Bob2 Johnson", age: 40, email: "bob@example.com" },
    { id: 6, name: "Bob3 Johnson", age: 40, email: "bob@example.com" },
    { id: 7, name: "Bob4 Johnson", age: 40, email: "bob@example.com" },
    { id: 8, name: "Bob5 Johnson", age: 40, email: "bob@example.com" },
    { id: 9, name: "Bob6 Johnson", age: 40, email: "bob@example.com" },
    { id: 10, name: "John Doe", age: 30, email: "john@example.com" },
    { id: 11, name: "Jane Smith", age: 25, email: "jane@example.com" },
    { id: 12, name: "Bob Johnson", age: 40, email: "bob@example.com" },
    { id: 13, name: "Bob1 Johnson", age: 40, email: "bob@example.com" },
    { id: 14, name: "Bob2 Johnson", age: 40, email: "bob@example.com" },
    { id: 15, name: "Bob3 Johnson", age: 40, email: "bob@example.com" },
    { id: 16, name: "Bob4 Johnson", age: 40, email: "bob@example.com" },
    { id: 17, name: "Bob5 Johnson", age: 40, email: "bob@example.com" },
    { id: 18, name: "Bob6 Johnson", age: 40, email: "bob@example.com" },
    { id: 19, name: "John Doe", age: 30, email: "john@example.com" },
    { id: 20, name: "Jane Smith", age: 25, email: "jane@example.com" },
    { id: 21, name: "Bob Johnson", age: 40, email: "bob@example.com" },
    { id: 22, name: "Bob1 Johnson", age: 40, email: "bob@example.com" },
    { id: 23, name: "Bob2 Johnson", age: 40, email: "bob@example.com" },
    { id: 24, name: "Bob3 Johnson", age: 40, email: "bob@example.com" },
    { id: 25, name: "Bob4 Johnson", age: 40, email: "bob@example.com" },
    { id: 26, name: "Bob5 Johnson", age: 40, email: "bob@example.com" },
    { id: 26, name: "Bob6 Johnson", age: 40, email: "bob@example.com" },
  ];
  return (
    <div className="">
      <h1>DataGrid Table</h1>
      <MicroDataGrid
        columns={columns}
        rows={rows}
        pageSize={10}
        enableSorting={false}
        enableCellSelection={true}
        enableCheckBoxSelection={true}
        onRowClick={(row) => console.log("Row clicked:", row)}
        loading={loading}
      />
    </div>
  );
}

export default App;
