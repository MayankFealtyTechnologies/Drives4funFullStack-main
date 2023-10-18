import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { randomCreatedDate, randomTraderName, randomUpdatedDate, } from "@mui/x-data-grid-generator";
import { DataGrid } from "@mui/x-data-grid";
import "./List.css";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CancelIcon from "@material-ui/icons/Cancel";
import { authorizeMe, getFeedBacks, getQuotations, updateNewQuotation } from "./service";
import { Select } from "antd";
import { Typography } from "@mui/material";
import moment from "moment/moment";



const FeedBack = () => {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState("pending");
    const [page, setPage] = useState(0); // Current page
    const [totalPages, setTotalPages] = useState(0); // total 
    const [pageSize, setPageSize] = useState(10); // Number of rows per page

    useEffect(() => {
        authorizeMe(localStorage.getItem('Token'))
    }, [])

    useEffect(() => {
        getAllFeedbacks()
    }, [selected, page])


    const getAllFeedbacks = async () => {
        var res = await getFeedBacks({ status: selected, page: page + 1 })
        if (res.data.status) setData(res?.data?.data?.list?.map((val, i) => { return { ...val, id: i } }))
        if (res.data.status) setTotalPages(res?.data?.data?.count || 0)
    }

    const columns = [
        {
            field: "name",
            headerName: "Name",
            width: 180,
            headerClassName: "custom-header",
        },
        {
            field: "mobile",
            headerName: "Mobile",
            width: 180,
            headerClassName: "custom-header",
        },
        {
            field: "feedback",
            headerName: "FeedBack",
            width: 680,
            headerClassName: "custom-header",
        },
        {
            field: "createdAt",
            headerName: "Created At",
            width: 255,
            headerClassName: "custom-header",
            renderCell: (params) => {
                return (
                    <Typography sx={{ fontSize: 14 }}>
                        {moment(params.value).format("MM-DD-YYYY hh:mm")}
                    </Typography>
                );
            }
        }
    ];

    const locations = [
        { value: 'all', label: 'All' },
        { value: 'accepted', label: 'Accepted' },
        { value: 'rejected', label: 'Rejected' },
        { value: 'pending', label: 'Pending' },
    ];

    const handleLocationChange = (selectedOption) => {
        setSelected(selectedOption);
    };

    return (
        <>
            <div>
                <NavBar />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }} className="container pt-5">
                <div><h1>FeedBacks</h1> </div>
                <div>
                    <Select
                        options={locations}
                        value={selected}
                        onChange={handleLocationChange}
                        placeholder="Select Status"
                        style={{ width: "150px" }} />
                </div>
            </div>
            <div className="container py-5">
                <div className="row"></div>
                <div style={{ height: 600, width: "100%" }}>
                    <DataGrid
                        rows={data}
                        columns={columns}
                        rowCount={totalPages}
                        className="tableheadStyle"
                        loading={data?.length ? false : true}
                        initialState={{
                            pagination: { paginationModel: { pageSize, page: page } },
                        }}
                        pageSizeOptions={[10]}
                        paginationMode="server"
                        onPaginationModelChange={(e) => { setPage(e?.page) }}
                    />
                </div>
            </div>
        </>
    );
};

export default FeedBack;
