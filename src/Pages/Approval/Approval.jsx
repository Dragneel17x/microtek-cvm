import { SlButton, SlDialog, SlInput } from "@shoelace-style/shoelace/dist/react";
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
			approver_remarks: approverRemark,
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
	const [approverRemark, setApproverRemark] = useState("");
	return (
		<div>
			<MUIDataTable options={options} title="Approvals" data={approvals} columns={columns} />
			<SlDialog label="Dialog" open={approvalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setApprovalDialog(false)}>
			<div>
					<h4>
						Customer Group: <span>{singleApproval?.customer_group}</span>
					</h4>
					<h4>
						Customer Name:{" "}
						<span>
							{singleApproval?.customer_name} {singleApproval?.customer_name_op}
						</span>
					</h4>
					<h4>
						Customer Address:{" "}
						<span>
							{singleApproval?.customer_address} {singleApproval?.customer_address_op1} {singleApproval?.customer_address_op2} {singleApproval?.customer_address_op3}
						</span>
					</h4>
					<h4>
						District: <span>{singleApproval?.district}</span>
					</h4>
					<h4>
						City: <span>{singleApproval?.city}</span>
					</h4>
					<h4>
						Postal Code: <span>{singleApproval?.postal_code}</span>
					</h4>
					<h4>
						Country: <span>{singleApproval?.country}</span>
					</h4>
					<h4>
						Region Code: <span>{singleApproval?.state_code}</span>
					</h4>
					<h4>
						C/O Person: <span>{singleApproval?.co_person}</span>
					</h4>
					<h4>
						Company Code: <span>{singleApproval?.company_code}</span>
					</h4>
					<h4>
						Reconciliation A/C: <span>{singleApproval?.recon_acc}</span>
					</h4>
					<h4>
						PayTerm: <span>{singleApproval?.pay_term}</span>
					</h4>
					<h4>
						Sales Organization: <span>{singleApproval?.sales_org}</span>
					</h4>
					<h4>
						Distribution Channel: <span>{singleApproval?.dist_channel}</span>
					</h4>
					<h4>
						Division: <span>{singleApproval?.division}</span>
					</h4>
					<h4>
						Transportation Zone: <span>{singleApproval?.transportation_zone}</span>
					</h4>
					<h4>
						Mobile Number: <span>{singleApproval?.mobile_no}</span>
					</h4>
					<h4>
						E-mail ID: <span>{singleApproval?.email_id}</span>
					</h4>
					<h4>
						Company Code: <span>{singleApproval?.company_code}</span>
					</h4>
					<h4>
						Sales-District: <span>{singleApproval?.sales_district}</span>
					</h4>
					<h4>
						Customer Account Group: <span>{singleApproval?.customer_acc_group}</span>
					</h4>
					<h4>
						Sales Office and Delivery Plant: <span>{singleApproval?.sales_office}</span>
					</h4>
					<h4>
						GSTIN: <span>{singleApproval?.gstin}</span>
					</h4>
					<h4>
						PAN: <span>{singleApproval?.pan_number}</span>
					</h4>
				</div>

					<SlInput
						className="helptext"
						name="approver_remark"
						value={approverRemark}
						onSlInput={(e) => {
							setApproverRemark(e.target.value)
						}}
						style={{marginTop:"20px"}}
						label="Remarks"
					/>

				<SlButton
					slot="footer"
					style={{ marginRight: "20px" }}
					variant="success"
					disabled = {approverRemark? false : true}
					onClick={() => {
						changeRequestStatus("approved");
					}}
				>
					Approve
				</SlButton>
				<SlButton
					slot="footer"
					style={{ marginRight: "20px" }}
					disabled = {approverRemark?.toLowerCase().replaceAll(" ", "") == "ok" || approverRemark == "" ? true : false}
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
