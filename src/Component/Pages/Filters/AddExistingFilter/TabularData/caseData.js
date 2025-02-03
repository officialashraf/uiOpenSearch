//import { useState } from "react";
import { Table, Pagination } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import Cookies from "js-cookie";
//import Pagination from "./pagination";
import '../../../../../Assets/Stlyes/Filter/caseTableData.css'
import { useSelector,useDispatch } from 'react-redux';
import { setSumaryHeadersAction, setSummaryDataAction } from '../../../../../Redux/Action/filterAction';
import { setSummaryData } from '../../../../../Redux/Action/caseAction';
const CaseData = () => {
    const dispatch = useDispatch();
    const data1 = useSelector((state) => state.caseData.caseData)
    const [headers, setHeaders] = useState([]);
// const [summary, setSummary] = useState(second)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(50);

    useEffect(() => {
        fetchCaseData();
    }, [dispatch]);

    const fetchCaseData = async () => {
          const token = Cookies.get("accessToken");
        try {
            const response = await fetch('http://5.180.148.40:9005/api/opensearch/case-id/a7924f64-0c7f-431b-90bf-52dd4c06e9b4', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                },
            });
            console.log("Response:", response);
            if (!response.ok) {
                // Handle HTTP errors
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
             dispatch(setSummaryData(data))
            const dataArray = data.response;
            console.log("summaryData",)
console.log("datarray", dataArray)
            if (Array.isArray(dataArray) && dataArray.length > 0 && dataArray[0]) {
                const firstFiftyItems = dataArray;
               setHeaders(Object.keys(firstFiftyItems[0]));
                setData(firstFiftyItems);
               
       
                console.log("First 50 items:", firstFiftyItems);
            } else {
                console.error("Data array not found or is not an array.");
            }

            setLoading(false);

        } catch (error) {
            console.error('Fetch error:', error);
            setError(error);
        }
    };

    dispatch(setSummaryDataAction(data))
    dispatch(setSumaryHeadersAction(headers))
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }
    console.log("dataaaaaa", data)
    //console.log("resposne dataa", data.response[0].data)

    console.log("headersssss", headers)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Handle page change
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Create page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <>
            <div className="case-t" style={{ overflow: "auto", height: "390px", fontSize: "10px" }} >

                {data.length > 0 ? (
                     <Table striped bordered hover>
                       <thead>
                         <tr>
                           {headers.map((header) => (
                             <th key={header} className="fixed-th">
                               {header}
                             </th>
                           ))}
                         </tr>
                       </thead>
                       <tbody>
                         {data.map((item, index) => (
                           <tr key={index}>
                             {headers.map((header) => (
                              <td key={header} className="fixed-td">
                              <div className="cell-content" title={item[header]}>
                                {item[header]}
                              </div>
                            </td>
                             ))}
                           </tr>
                         ))}
                       </tbody>
                     </Table>

                ) : (
                    <p>No data available.</p>
                )}
            </div>
            <Pagination>
                {pageNumbers.map((number) => (
                    <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => handlePageChange(number)}
                    >
                        {number}
                    </Pagination.Item>
                ))}
            </Pagination>


        </>
    )
}

export default CaseData
