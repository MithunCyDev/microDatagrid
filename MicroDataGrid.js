import React, { useState, useMemo, useEffect } from "react";
import "./DataGrid.css"; // Optional: Include a CSS file for styling
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoIosArrowUp,
  IoIosArrowDown,
} from "react-icons/io";

const MicroDataGrid = ({
  columns = [],
  rows = [],
  pageSize = 10,
  onRowClick,
  onCellClick,
  enableSorting = true,
  enableCellSelection = false,
  enableCheckBoxSelection = false,
  loading = false,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [dataLoading, setDataLoading] = useState(loading);
  const [progress, setProgress] = useState(0);
  const [tableWidth, setTableWidth] = useState(0);

  // Calculate the total width of all columns************
  useEffect(() => {
    const totalWidth = columns.reduce(
      (acc, column) => acc + parseInt(column.width),
      0
    );
    setTableWidth(totalWidth + 166);
  }, [columns]);

  // Sorting handler Function
  const handleSort = (key) => {
    if (!enableSorting) return;

    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Sorted Rows
  const sortedRows = useMemo(() => {
    if (sortConfig.key) {
      return [...rows].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return rows;
  }, [rows, sortConfig]);

  // Handle Cell selection ******************
  const handleCellClick = (row) => {
    if (enableCellSelection) {
      setSelectedRow(row);
      if (onCellClick) onCellClick(row);
    }
  };

  // Toggle row selection **********************
  const handleRowSelection = (row) => {
    if (onRowClick && enableCheckBoxSelection) onRowClick(row);
    if (selectedRows.includes(row)) {
      setSelectedRows(selectedRows.filter((selected) => selected !== row));
    } else {
      setSelectedRows([...selectedRows, row]);
    }
  };

  // Row per Page
  const rowsPerPage = pageSize;
  const totalPages = Math.ceil(rows.length / rowsPerPage);
  const paginatedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const loadingBarContainerStyle = {
    width: tableWidth + 22,
    height: "4px",
    backgroundColor: "#e0e0e0",
    position: "absolute",
    overflow: "hidden",
  };

  const loadingBarProgressStyle = {
    height: tableWidth + 22,
    width: "100%",
    background:
      "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #0077ffb5 50%, #a4cdff 100%)",
    backgroundSize: "200% 100%",
    animation: "wave 2s linear infinite", // Note: for animations, consider using CSS classes
  };

  return (
    <section
      style={{
        position: "relative",
        width: tableWidth + 22,
      }}
    >
      {loading && (
        <div style={loadingBarContainerStyle}>
          <div style={loadingBarProgressStyle} />
        </div>
      )}
      <div style={{ width: tableWidth + 22, height: "100%" }}>
        <table
          style={{ width: "100%", borderCollapse: "collapse" }}
          className="data-table"
        >
          <div>
            <thead>
              <tr>
                {/* Checkbox column header */}

                <th
                  style={
                    enableCheckBoxSelection
                      ? { padding: "10px", display: "block" }
                      : { width: "0px", display: "none" }
                  }
                >
                  {enableCheckBoxSelection && (
                    <input
                      style={{
                        width: "18px",
                        height: "18px",
                      }}
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRows(paginatedRows);
                        } else {
                          setSelectedRows([]);
                        }
                      }}
                      checked={selectedRows.length === paginatedRows.length}
                    />
                  )}
                </th>

                {columns.map((column) => (
                  <th
                    key={column.key}
                    // onMouseEnter={() => setHoveredColumn(column.key)}
                    // onMouseLeave={() => setHoveredColumn(null)}
                    onClick={() => handleSort(column.key)}
                    style={{
                      cursor: enableSorting ? "pointer" : "default",
                      padding: "8px 10px",
                      width: column.width || "50px",
                      minWidth: "30px",
                      textAlign: column.textAlign,
                    }}
                  >
                    {column.label}
                    {(enableSorting && hoveredColumn) === column.key ||
                    sortConfig.key === column.key ? (
                      sortConfig.key === column.key &&
                      sortConfig.direction === "asc" ? (
                        <IoIosArrowUp
                          style={{ color: "#333", marginLeft: "5px" }}
                        />
                      ) : (
                        <IoIosArrowDown
                          style={{ color: "#333", marginLeft: "5px" }}
                        />
                      )
                    ) : null}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {paginatedRows.map((row, index) => (
                <tr
                  style={{ textOverflow: " ellipsis" }}
                  onClick={() => handleCellClick(row)}
                  key={index}
                  className={`table-row ${
                    (selectedRow || selectedRows.includes(row)) === row
                      ? "selected"
                      : ""
                  }`}
                >
                  {/* Checkbox for row selection */}
                  <td
                    style={
                      enableCheckBoxSelection
                        ? { padding: "10px", display: "block" }
                        : { width: "0px", display: "none" }
                    }
                  >
                    {enableCheckBoxSelection && (
                      <input
                        style={{
                          width: "18px",
                          height: "18px",
                        }}
                        type="checkbox"
                        checked={selectedRows.includes(row)}
                        onChange={() => handleRowSelection(row)}
                      />
                    )}
                  </td>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      style={{
                        width: column.width,
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                      className="table-cell"
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </div>
        </table>

        {/* Pagination controls */}
        <div
          style={{
            width: `${tableWidth}px`,
            minWidth: "417px",
          }}
          className="pagination"
        >
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="forwardAndBackwardDiv">
            <IoIosArrowBack
              className={`IoIosArrowBack ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            />
            <IoIosArrowForward
              className={`IoIosArrowForward ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MicroDataGrid;
