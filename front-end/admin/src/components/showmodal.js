import React, { useEffect } from "react";
import "./css/showmodal.css"
import * as ReactDOM from 'react-dom';


function ShowModal ({CloseModal, children}) {
    useEffect(() => {
        document.body.style.overflowY = "hidden";
        return () => {
            document.body.style.overflowY = "scroll";
        };
    }, [])
    return ReactDOM.createPortal(
        <>
        <div className="modal-wrapper" onClick={CloseModal}></div>
        <div className="modal-container">
            {children}
        </div>
        </>,
        document.querySelector(".showmodal")
    );
};

export default ShowModal;
