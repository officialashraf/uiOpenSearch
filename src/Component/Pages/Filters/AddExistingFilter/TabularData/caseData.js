//import { useState } from "react";
import { Table, Pagination } from 'react-bootstrap';
import React, { useState, useEffect } from 'react'
//import Pagination from "./pagination";
import '../../../../../Assets/Stlyes/Filter/caseTableData.css'
import { useSelector,useDispatch } from 'react-redux';
import { setSumaryHeadersAction, setSummaryDataAction } from '../../../../../Redux/Action/filterAction';
const CaseData = () => {
    const dispatch = useDispatch();
    const data1 = useSelector((state) => state.caseData.caseData)
    const [headers, setHeaders] = useState([]);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        fetchCaseData();
    }, [dispatch]);

    const fetchCaseData = async () => {
        try {
            const response = await fetch('http://5.180.148.40:9005/api/opensearch/filter-id/25b4f8a861b2430ea8671c7ad6d9384c', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log("Response:", response);
            if (!response.ok) {
                // Handle HTTP errors
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const dataArray = data.response;

            if (Array.isArray(dataArray) && dataArray.length > 0 && dataArray[0].data) {
                const firstFiftyItems = dataArray.slice(0, 50);
               setHeaders(Object.keys(firstFiftyItems[0].data));
                setData(firstFiftyItems);
               
       
                console.log("First 50 items:", firstFiftyItems);
            } else {
                console.error("Data array not found or is not an array.");
            }

            setLoading(false);

            console.log("Data:", data);
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
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                {headers.map((header) => (
                                    <th key={header}
                                        className='fixed-th'

                                    >{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={index}>
                                    {headers.map((header) => (
                                        <td key={header}
                                            className='fixed-td'

                                        >{item.data[header]}</td>
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
