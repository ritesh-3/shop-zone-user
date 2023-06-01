import React, { useState } from "react";

import { ExpandableTile } from './ExpandableTile'
import "./DynamicTable2.css"
import { Pagination } from "./Pagination";
import { tableDataStub } from "../Data/data";
import { MdOutlineDeleteOutline } from "react-icons/md"
import { BiBookOpen, BiDetail } from "react-icons/bi";

export const DynamicTablePaginationConfigs = {
    itemsPerPage: 10
}

const makeStyle = (status) => {
    if (status === "Approved") {
        return {
            background: "rgb(145 254 159 / 47%)",
            color: "green",
        };
    } else if (status === "Pending") {
        return {
            background: "#ffadad8f",
            color: "red",
        };
    } else {
        return {
            background: "#59bfff",
            color: "white",
        };
    }
};



const ResponsiveTable = ({ tableData, headers, onDeleteAction, onViewAction, onOpenActionClicked,enablePaginator = true }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(DynamicTablePaginationConfigs.itemsPerPage);
    let data = [];

    if (tableData && tableData.length > 0) {
        data = tableData
    } else {
        data = tableDataStub
        headers = [
            { title: "Name", value: 'name' },
            { title: "Tracking Id", value: 'trackingId' },
            { title: "Date", value: 'date' },
            { title: "Status", value: 'status' },
        ]
    }

    const deleteActionClicked = (resp) => {
        onDeleteAction(resp);
    }
    const viewActionClicked = (resp) => {
        onViewAction(resp);
    }
    const openActionClicked = (resp) => {
        onOpenActionClicked(resp);
    }


    const isMobile = window.innerWidth <= 768;

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="Table">
            {isMobile ? (
                <div className="expandable-tile-container">
                    {currentItems.map((row, index) => (
                        <ExpandableTile key={index} row={row} headers={headers} onDeleteAction={deleteActionClicked} onViewAction={viewActionClicked} />
                    ))}
                    {
                        enablePaginator && (
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                paginate={paginate}
                                handlePreviousPage={handlePreviousPage}
                                handleNextPage={handleNextPage}
                            />
                        )
                    }

                </div>
            ) : (
                <div className="custom-table-container">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                {headers.map((header, index) => (
                                    <th key={index}>{header.title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((row, index) => (
                                <tr key={index}>
                                    {headers.map((header, index) => (
                                        <td key={index}>
                                            {(() => {
                                                switch (header.value) {
                                                    case 'status':
                                                        return (
                                                            <span className="status" style={makeStyle(row.status)}>
                                                                {row.status}
                                                            </span>
                                                        );
                                    
                                                    case "actions":
                                                        return (
                                                            <div className="table-actions">
                                                                {header.actions.includes("view") && (
                                                                    <BiDetail
                                                                        color="#0ea5e9"
                                                                        size={20}
                                                                        onClick={() => viewActionClicked(row)}
                                                                    />
                                                                )}
                                                                {header.actions.includes("delete") && (
                                                                    <MdOutlineDeleteOutline
                                                                        color="red"
                                                                        size={20}
                                                                        onClick={() => deleteActionClicked(row)}
                                                                    />
                                                                )}
                                                                {header.actions.includes("open") && (
                                                                    <BiBookOpen
                                                                        color="lightgreen"
                                                                        size={20}
                                                                        onClick={() => openActionClicked(row)}
                                                                    />
                                                                )}

                                                            </div>
                                                        );
                                                    default:
                                                        return (
                                                            <div className="table-data-content">
                                                                {row[header.value]}
                                                            </div>
                                                        )
                                                }
                                            })()}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {
                        enablePaginator && (
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                paginate={paginate}
                                handlePreviousPage={handlePreviousPage}
                                handleNextPage={handleNextPage}
                            />
                        )
                    }

                </div>
            )}
        </div>
    );
};



export default ResponsiveTable;
