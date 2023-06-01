import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MdExpandLess, MdExpandMore, MdOutlineDeleteOutline } from "react-icons/md";
import { BiBookOpen, BiDetail } from "react-icons/bi";


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



export const ExpandableTile = ({ row, headers, onDeleteAction, onViewAction, onOpenActionClicked }) => {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };


    const deleteActionClicked = (resp) => {
        onDeleteAction(resp);
    }
    const viewActionClicked = (resp) => {
        onViewAction(resp);
    }
    const openActionClicked = (resp) => {
        onOpenActionClicked(resp);
    }
    return (
        <div className="expandable-tile">
            <div className="tile-header">
                <div className="tile-header-info">
                    {/* <div className="">{row.name}</div> */}
                    <div className="">{row[headers[0].value]}</div>
                </div>
                <div className="toggle-icon" onClick={handleToggle}>
                    {/* <span className="material-symbols-outlined">
                        {expanded ? "expand_less" : "expand_more"}
                    </span> */}
                    {
                        expanded ? <MdExpandLess size={15} /> : <MdExpandMore size={15} />
                    }
                </div>
            </div>
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div className="tile-details"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {headers.map((header, index) => (
                            <React.Fragment key={index}>
                                <div>
                                    {(() => {
                                        switch (header.value) {
                                            case 'status':
                                                return (
                                                    <div className="tile-content">
                                                        <strong>{header.title}</strong>
                                                        <span className="status" style={makeStyle(row.status)}>
                                                            {row.status}
                                                        </span>
                                                    </div>

                                                );

                                            case "actions":
                                                return (
                                                    <div className="tile-content">
                                                         <strong>{header.title}</strong>
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
                                            default: return (
                                                <div className="tile-content ">
                                                    <strong>{header.title} </strong>
                                                    <span >  {row[header.value]} </span>
                                                </div>
                                            )

                                        }
                                    })()}

                                </div>
                            </React.Fragment>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div >
    );
}