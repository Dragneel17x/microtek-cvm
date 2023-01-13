import { SlButton, SlDialog, SlTag } from "@shoelace-style/shoelace/dist/react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { baseurl } from "../../config/apiConfig";


function View() {
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
			url: `${baseurl.base_url}/cvm/get-submission-view`,
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
	
	const options = {
		onRowClick: function (rowData, rowMeta) {
			console.log(rowMeta.dataIndex);
			setSingleApproval(approvals[rowMeta.dataIndex]);
			setApprovalDialog(true);
		},
        selectableRowsHideCheckboxes: true
	};
	const columns = [
		{ name: "created_by", label: "Applied By" },
		{ name: "customer_name", label: "Customer Name" },
		{ name: "company_code", label: "Company Code" },
		{ name: "mobile_no", label: "Mobile Number" },
		{ name: "approver_employee_id", label: "Approver ID" },
        { name: "ai_status", label: "Approval Status" },
        { name: "status", label: "Overall Status" },
	];
	return (
		<div>
			<MUIDataTable options={options} title="Approvals" data={approvals} columns={columns} />
			<SlDialog label="Form Data" open={approvalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setApprovalDialog(false)}>
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
                <SlTag slot="footer" size="large" pill style={{"marginRight":"20px"}} variant={singleApproval?.status == 'pending'? 'primary': (singleApproval?.status == 'rejected'? 'danger': 'success')}>{singleApproval?.status}</SlTag>
                <SlTag slot="footer" size="large" pill style={{"marginRight":"20px"}} variant={singleApproval?.ai_status == 'pending'? 'primary': (singleApproval?.ai_status == 'rejected'? 'danger': singleApproval?.ai_status == 'future_approval'? 'neutral':'success')}>{singleApproval?.ai_status}</SlTag>
				<SlButton slot="footer" variant="primary" onClick={() => setApprovalDialog(false)}>
					Close
				</SlButton>
			</SlDialog>
		</div>
	);
}

export default View