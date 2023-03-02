import React, { useEffect, useState } from "react";
import "./Table.css";
import EditRows from "./EditRows";
import Pagination from "./Pagination";
import TableRows from "./TableRows";
import SearchBar from "./SearchBar";

// data for table's column headings, can be manipulated from one place.
const tableHeadings = ["checkBox", "Name", "Email", "Role", "Actions"];

export default function Table() {
  const [fetchedData, setFetchedData] = useState("");
  const [searchedData, setSearchedData] = useState("");
  const [filteredData, setFilteredData] = useState({});
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [editRowId, setEditRowId] = useState(null);
  const [loading, setLoading] = useState(true);

  const totalPage = (Math.ceil(searchedData.length / 10) * 10) / 10;
  const isAnyRowSelected =
    filteredData.length &&
    filteredData?.filter((item) => item?.isSelected === true).length > 0;
  const isAnyRowUnSelected =
    filteredData.length &&
    filteredData.filter((item) => item?.isSelected !== true).length < 1;

  // function for fetching data from api when component mount for first time
  const makeApicall = async () => {
    const url =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const fetchedData = await fetch(url);
    const tableDataFetched = await fetchedData.json();
    setFetchedData(tableDataFetched);
    setSearchedData(tableDataFetched);
    setLoading(false);
  };

  //Slicing function for manipulating data to be populated using pagination
  const slicingData = () => {
    const tempData = JSON.parse(JSON.stringify(searchedData));
    if (tempData.length) {
      setFilteredData(tempData?.slice(page * 10 - 10, page * 10));
    } else if (tempData.length === 0) {
      setFilteredData([]);
    }
  };

  //function for searching Data
  const searchHandler = (searchText) => {
    const cloneOfFetchedData = JSON.parse(JSON.stringify(fetchedData));
    if (cloneOfFetchedData && searchText) {
      const tempData = cloneOfFetchedData?.filter((item) => {
        return (
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.email.toLowerCase().includes(searchText.toLowerCase()) ||
          item.role.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setSearchedData(tempData);
      setPage(1);
    }
    if (!searchText) {
      setSearchedData(cloneOfFetchedData);
    }
  };

  //function for editing specific row
  const handleCellUpdation = (editedData) => {
    const editedRowIndex = fetchedData.findIndex((e) => editedData.id === e.id);
    const tempClone = [...fetchedData];
    tempClone[editedRowIndex] = editedData;
    setFetchedData(tempClone);
    setEditRowId(null);
    alert("Row Edited successfully!");
  };

  //function for deleting one row at a time using red Bin icon
  const deleteRowsHandler = (id) => {
    const tempData = [...fetchedData];
    const indexOfRow = tempData.findIndex((e) => id === e.id);
    tempData.splice(indexOfRow, 1);
    setFetchedData(tempData);
  };

  //function for selecting single/multiple row
  const selectRowHandler = (event, id) => {
    const { name, checked } = event.target;

    if (name === "selectAll") {
      const startId = parseInt(filteredData[0].id);
      const endId = parseInt(filteredData[filteredData.length - 1].id);
      const tempData = fetchedData.map((item) => {
        if (item.id >= startId && item.id <= endId) {
          return { ...item, isSelected: checked };
        } else {
          return item;
        }
      });
      setFetchedData(tempData);
    } else {
      const tempData = fetchedData.map((item) =>
        item.id === id ? { ...item, isSelected: checked } : item
      );
      setFetchedData(tempData);
    }
  };

  //function for deleting multiple rows at a time using 'Delete Selected' button
  const bulkDeleteHandler = () => {
    const dataAfterDelete = fetchedData.filter((item) => !item.isSelected);
    setFetchedData(dataAfterDelete);
  };

  useEffect(() => {
    makeApicall();
  }, []);
  useEffect(() => {
    slicingData();
  }, [page, searchedData]);
  useEffect(() => {
    searchHandler(searchText);
  }, [searchText, fetchedData]);

  return (
    <section>
      {/* Begining of Component with parent Comtainer*/}
      <div className="parentContainer">
        <div>
          {/* SearchBar Component */}
          <SearchBar searchText={searchText} setSearchText={setSearchText} />

          {/* starting of Table Component */}
          <div>
            {filteredData?.length ? (
              <table id="tableContainer">
                <thead>
                  <tr>
                    {tableHeadings.map((item, index) => (
                      <th key={index * 3}>
                        {item === "checkBox" ? (
                          <input
                            type={"checkbox"}
                            name="selectAll"
                            checked={isAnyRowUnSelected}
                            onChange={selectRowHandler}
                          />
                        ) : (
                          `${item}`
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.map((item) => {
                    return (
                      <>
                        {editRowId === item.id ? (
                          <EditRows
                            key={item.id + "unique"}
                            data={item}
                            handleSubmit={handleCellUpdation}
                            handleCancel={setEditRowId}
                          />
                        ) : (
                          <TableRows
                            key={item.id + item.name}
                            data={item}
                            handleClick={setEditRowId}
                            deleteRowHandler={deleteRowsHandler}
                            selectRowHandler={selectRowHandler}
                          />
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            ) : loading ? (
              <h1 style={{ textAlign: "center", margin: 0 }}>LOADING.....</h1>
            ) : (
              <h1 style={{ textAlign: "center", margin: 0 }}>
                Sorry No Data Found related to your Query!
              </h1>
            )}
          </div>
          {/* end of Table component */}

          {/* Bulk delete Button */}
          {isAnyRowSelected && (
            <button onClick={bulkDeleteHandler}>Delete Selected</button>
          )}
        </div>

        {/* pagination Component */}
        <Pagination
          totalPage={totalPage}
          currentPage={page}
          pageUpdateHandler={setPage}
        />
      </div>
    </section>
  );
}
