//import { useState } from "react";
import React,{useState} from 'react'
import Pagination from "./pagination";
import '../../../../../Assets/Stlyes/caseData.css'
const CaseData = ({data}) => {
    const rowsPerPageOptions = [10, 15, 25];
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const totalItems = data.length;
 // const totalPages = Math.ceil(totalItems / rowsPerPage);

  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const currentData = data.slice(startIdx, endIdx).map((item, index) => ({
    ...item,
    serialNumber: startIdx + index + 1,
  }));

  const handlePageChange = (page) => setCurrentPage(page);

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page when rows per page changes
  };
  return (
   <>
     <div className='row' style={{margin:"4px 0px 0px 0px", height:'400px', overflowY:'auto', background:'gray'}}>
        <div className='col-4'style={{background:"gray !important"}} >

        <table className="table table-hover" >
        <thead   >
       
          <tr>
            <th>#</th>
            <th>File Name</th>
            <th>Individual</th>
            <th>Organization</th>
          </tr>
        </thead>
        <tbody>
          {currentData.slice(0, 25).map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.fileName}</td>
              <td>{item.individual}</td>
              <td>{item.organization}</td>
            </tr>
          ))}
        </tbody>
      </table>

        </div>
        <div className='col' style={{ background:'gray'}}>
        <table className="table table-hover">
        <thead >
          <tr >

            <th>Location</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Tags</th>
            <th>IMEI</th>
          </tr>
        </thead>
        <tbody>
          {currentData.slice(0, 25).map((item) => (
            <tr key={item.id}>
              <td>{item.location}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.tags}</td>
              <td>{item.imei}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
        <div className="mb-3" >

        <Pagination
        totalItems={totalItems}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={rowsPerPageOptions}
        />
        </div>
    </div>
   </>
  )
}

export default CaseData
