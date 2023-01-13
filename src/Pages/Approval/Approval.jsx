import { SlButton, SlDialog } from "@shoelace-style/shoelace/dist/react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { baseurl } from "../../config/apiConfig";

function Approval() {
	useEffect(() => {
		getApprovals();
	}, []);

	const [approvals, setApprovals] = useState();
	const [singleApproval, setSingleApproval] = useState();
	const [approvalDialog, setApprovalDialog] = useState(false);

	function getApprovals() {
		const data = {
			employee_id: localStorage.getItem("employee_id"),
		};
		console.log(data);
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/get-approval-forms`,
			//url: `${baseurl.base_url}/cvm/get-approval-forms`,
			header: {
				"Content-type": "application/JSON",
			},
			data,
		})
			.then((res) => {
				console.log(res);
				setApprovals(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function changeRequestStatus(status) {
		const data = {
			status: status,
			approver_remarks: "OK",
			employee_id: localStorage.getItem("employee_id"),
			approval_id: singleApproval?.approval_id,
		};
		console.log(data);
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/approve-form`,
			//url: `${baseurl.base_url}/cvm/approve-form`,
			header: {
				"Content-type": "application/JSON",
			},
			data,
		})
			.then((res) => {
				console.log(res);
				getApprovals();
				setApprovalDialog(false)
			})
			.catch((err) => {
				console.log(err);
				setApprovalDialog(false)
			});
	}
	
	const options = {
		onRowClick: function (rowData, rowMeta) {
			console.log(rowMeta.dataIndex);
			setSingleApproval(approvals[rowMeta.dataIndex]);
			setApprovalDialog(true);
		},
	};
	const columns = [
		{ name: "applied_by", label: "Applied By" },
		{ name: "customer_name", label: "Customer Name" },
		{ name: "company_code", label: "Company Code" },
		{ name: "approval_id", label: "Approval ID" },
		{ name: "request_id", label: "Request ID" },
		{ name: "request_type", label: "Request Type" },
		{ name: "created_at", label: "Request Date" },
	];
	return (
		<div>
			<MUIDataTable options={options} title="Approvals" data={approvals} columns={columns} />
			<SlDialog label="Dialog" open={approvalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setApprovalDialog(false)}>
				Data Dikhana hai
				<SlButton
					slot="footer"
					style={{ marginRight: "20px" }}
					variant="success"
					onClick={() => {
						changeRequestStatus("approved");
					}}
				>
					Approve
				</SlButton>
				<SlButton
					slot="footer"
					style={{ marginRight: "20px" }}
					variant="danger"
					onClick={() => {
						changeRequestStatus("rejected");
					}}
				>
					Reject
				</SlButton>
				<SlButton slot="footer" variant="primary" onClick={() => setApprovalDialog(false)}>
					Close
				</SlButton>
			</SlDialog>
		</div>
	);
}

export default Approval;
