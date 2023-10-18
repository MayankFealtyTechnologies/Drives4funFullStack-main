import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createNewQuotation } from './service';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Modal = ({ isOpen, onClose, selectedLocation, selectedStartDate, selectedEndDate }) => {
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [nameError, setNameError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);


    const nameRegex = /^[A-Za-z\s]+$/;
    // const mobileRegex = /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})([-\s]?)\d{3}([-|.\s]?)\d{4}$/;

    const validateName = () => {
        if (!name) {
            setNameError('Name is required');
        } else if (!nameRegex.test(name)) {
            setNameError('Invalid name format');
        } else {
            setNameError('');
        }
    };

    const validateMobile = () => {
        if (!mobile) {
            setMobileError('Mobile number is required');
        }
        // else if (!mobileRegex.test(mobile)) {
        //     setMobileError('Invalid mobile number format');
        // }
        else {
            setMobileError('');
        }
    };

    const handleSaveChanges = async () => {
        if (!name || !mobile) {
            toast.error('Name or mobile number is not valid');
        } else {
            try {
                const response = await createNewQuotation({
                    city: selectedLocation?.value,
                    name,
                    mobile,
                    date: selectedStartDate,
                    startTime: selectedStartDate,
                    endTime: selectedEndDate
                });
                onClose();
                setName('');
                setMobile('');
                setIsModalOpen(true)
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };



    return (
        <>
            <div style={{ margin: "auto", background: "rgb(0,0,0,.6)" }} className={`modal ${isOpen ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header modelHeaderStyle">
                            <button type="button" className="close modelCrossBtn" onClick={onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body py-0">
                            <form>
                                <div className={`form-group mb-3 ${nameError ? 'has-error' : ''}`}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                            validateName();
                                        }}
                                    />
                                    {nameError && <span className="text-danger" style={{ fontSize: 12 }}>{nameError}</span>}
                                </div>
                                <div className={`form-group mb-3 ${mobileError ? 'has-error' : ''}`}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="mobile"
                                        placeholder="Enter mobile number"
                                        maxLength={10}
                                        value={mobile}
                                        onChange={(e) => {
                                            setMobile(e.target.value);
                                            validateMobile();
                                        }}
                                    />
                                    {mobileError && <span className="text-danger" style={{ fontSize: 12 }}>{mobileError}</span>}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer " style={{ display: "flex", justifyContent: "center" }}>
                            <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ margin: "auto", background: "rgb(0,0,0,.6)" }} className={`modal ${isModalOpen ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content p-2">

                        <div className="modal-body py-0 text-center pt-4">
                            <CheckCircleIcon style={{ fontSize: 50, color: "green" }} className='mb-3' />

                            <h5 className='mb-4'>Thank you for contacting with us , We will get back you shortly.</h5>
                        </div>
                        <div className="modal-footer " style={{ display: "flex", justifyContent: "center" }}>
                            <button onClick={() => setIsModalOpen(false)} type="button" className="btn btn-primary" >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
