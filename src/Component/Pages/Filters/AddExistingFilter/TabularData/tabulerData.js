//import { useState } from "react";
import { Table, Pagination } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
import Cookies from "js-cookie";
import axios from 'axios';
//import Pagination from "./pagination";
import '../../../../../Assets/Stlyes/Filter/caseTableData.css'
import { useSelector,useDispatch } from 'react-redux';
import '../../../../../services/pagination.css'
import { setSumaryHeadersAction, setSummaryDataAction } from '../../../../../Redux/Action/filterAction';
import { setSummaryData } from '../../../../../Redux/Action/caseAction';
const TabulerData = () => {
    const dispatch = useDispatch();
    const data1 = useSelector((state) => state.caseData.caseData)
    console.log("data1", data1)
    const [headers, setHeaders] = useState([]);
// const [summary, setSummary] = useState(second)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 50;

    useEffect(() => {
        fetchCaseData();
    }, []);

    const fetchCaseData = async () => {
          const token = Cookies.get("accessToken");
        try {
            const queryData = {
                query:{
                  unified_case_id:`${data1.id}`
                }
            }
            const response = await axios.post('http://5.180.148.40:9005/api/das/search', queryData,{
                headers: {
                    'Content-Type': 'application/json',
                     'Authorization': `Bearer ${token}`
                },
            });
            console.log("Response:", response);
            // if (!response.ok) {
            //     // Handle HTTP errors
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }
            // const data = await response.json();
            //  dispatch(setSummaryData(data))
            const dataArray =response.data.response;
            // console.log("summaryData",)
            console.log("datarray", dataArray)
            if (Array.isArray(dataArray) && dataArray.length > 0 ) {
                const firstFiftyItems = dataArray;
                const allKeys = new Set();
                firstFiftyItems.forEach(item => {
                  Object.keys(item).forEach(key => {
                    allKeys.add(key);
                  });
                });
          
                // Convert the set of keys to an array and set as headers
                setHeaders(Array.from(allKeys));
               //setHeaders( Object.keys(firstFiftyItems[0]));
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
    const currentItems = data ? data.slice(indexOfFirstItem, indexOfLastItem) : [];


    // Handle page change
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    // Create page numbers
    const pageNumbers = data ? Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => i + 1) : [];
    return (
        <>
            <div className="case-t" style={{ overflowY: "auto", height: "450px", fontSize: "10px" }} >

                {data && data.length > 0 ? (
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
                         {currentItems.map((item, index) => (
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

export default TabulerData
