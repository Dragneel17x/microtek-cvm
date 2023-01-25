import { SlButton, SlDialog, SlInput, SlTab, SlTabGroup, SlTabPanel, SlTag } from "@shoelace-style/shoelace/dist/react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { baseurl } from "../../config/apiConfig";

function Mdmview() {
	useEffect(() => {
		getForms();
	}, []);

	const [approvals, setApprovals] = useState();
	const [singleApproval, setSingleApproval] = useState();
	const [approvalDialog, setApprovalDialog] = useState(false);
	const [sap_code, setSap_code] = useState("");

	function getForms() {
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/get-mdm-view`,
			//url: `${baseurl.base_url}/cvm/get-approval-forms`,
			header: {
				"Content-type": "application/JSON",
			}
		})
			.then((res) => {
				console.log(res.data.data);
				setApprovals(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	function updateForm() {
		const data = {
			employee_id: localStorage.getItem('employee_id'),
			sap_code: sap_code,
			form_id: singleApproval.id
		}
		console.log(data);
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/add-sap-code`,
			//url: `${baseurl.base_url}/cvm/get-approval-forms`,
			header: {
				"Content-type": "application/JSON",
			},
			data
		})
			.then((res) => {
				console.log(res.data);
				setApprovalDialog(false)
				getForms();
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
		{ name: "distribution_channel", label: "Distribution Channel" },
		{ name: "email_id", label: "Email ID" },
		{ name: "status", label: "Overall Status" },
	];
	return (
		<SlTabGroup style={{ marginTop: "20px" }}>
			<SlTab slot="nav" panel="customer_form">
				Customer Form Approvals
			</SlTab>
			<SlTab slot="nav" panel="vendor_form">
				Vendor Form Approvals
			</SlTab>
			<SlTab slot="nav" panel="material_creation">
				Material Creation Approvals
			</SlTab>

			<SlTabPanel name="customer_form">
				<div>
					<MUIDataTable options={options} title="Customer Forms View For MDM" data={approvals} columns={columns} />
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
							<SlInput
								maxlength={40}
								className="helptext"
								pattern="^([A-Z]|[a-z]| )+$"
								name="cust_name_op1"
								style={{ marginTop: "20px" }}
								value={sap_code}
								onSlInput={(e) => {
									setSap_code(e.target.value);
								}}
								label="SAP Customer Part Code"
							/>
						</div>

						<SlButton slot="footer" variant="success" style={{ marginRight: "20px" }} onClick={() => updateForm()}>
							Update
						</SlButton>
						<SlButton slot="footer" variant="primary" onClick={() => setApprovalDialog(false)}>
							Close
						</SlButton>
					</SlDialog>
				</div>
			</SlTabPanel>
		</SlTabGroup>
	);
}

export default Mdmview