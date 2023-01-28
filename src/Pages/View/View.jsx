import { SlButton, SlDialog, SlTab, SlTabGroup, SlTabPanel, SlTag } from "@shoelace-style/shoelace/dist/react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { baseurl } from "../../config/apiConfig";

function View() {
	useEffect(() => {
		getCustomerApprovals();
		getVendorApprovals();
	}, []);

	const [customerApprovals, setCustomerApprovals] = useState();
	const [singleCustomerApproval, setSingleCustomerApproval] = useState();
	const [customerApprovalDialog, setCustomerApprovalDialog] = useState(false);

	const [vendorApprovals, setVendorApprovals] = useState();
	const [singleVendorApproval, setSingleVendorApproval] = useState();
	const [vendorApprovalDialog, setVendorApprovalDialog] = useState();

	function getCustomerApprovals() {
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
				console.log(res.data.data);
				setCustomerApprovals(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function getVendorApprovals() {
		const data = {
			employee_id: localStorage.getItem("employee_id"),
		};
		console.log(data);
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/get-submission-vendor-view`,
			//url: `${baseurl.base_url}/cvm/get-approval-forms`,
			header: {
				"Content-type": "application/JSON",
			},
			data,
		})
			.then((res) => {
				console.log(res.data.data);
				setVendorApprovals(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const customerOptions = {
		onRowClick: function (rowData, rowMeta) {
			console.log(rowMeta.dataIndex);
			setSingleCustomerApproval(customerApprovals[rowMeta.dataIndex]);
			setCustomerApprovalDialog(true);
		},
		selectableRowsHideCheckboxes: true
	};
	const customerColumns = [
		{ name: "created_by", label: "Applied By" },
		{ name: "customer_name", label: "Customer Name" },
		{ name: "company_code", label: "Company Code" },
		{ name: "mobile_no", label: "Mobile Number" },
		{ name: "approver_employee_id", label: "Approver ID" },
		{ name: "ai_status", label: "Approval Status" },
		{ name: "status", label: "Overall Status" },
	];
	const vendorOptions = {
		onRowClick: function (rowData, rowMeta) {
			console.log(rowMeta.dataIndex);
			setSingleVendorApproval(vendorApprovals[rowMeta.dataIndex]);
			setVendorApprovalDialog(true);
		},
		selectableRowsHideCheckboxes: true
	};
	const vendorColumns = [
		{ name: "created_by", label: "Applied By" },
		{ name: "vendor_name", label: "Vendor Name" },
		{ name: "company_code", label: "Company Code" },
		{ name: "mobile_no", label: "Mobile Number" },
		{ name: "approver_employee_id", label: "Approver ID" },
		{ name: "ai_status", label: "Approval Status" },
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
					<MUIDataTable options={customerOptions} title="Submitted Forms View" data={customerApprovals} columns={customerColumns} />
					<SlDialog label="Form Data" open={customerApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setCustomerApprovalDialog(false)}>
						<div>
							<h4>
								Customer Group: <span>{singleCustomerApproval?.customer_group}</span>
							</h4>
							<h4>
								Customer Name:{" "}
								<span>
									{singleCustomerApproval?.customer_name} {singleCustomerApproval?.customer_name_op}
								</span>
							</h4>
							<h4>
								Customer Address:{" "}
								<span>
									{singleCustomerApproval?.customer_address} {singleCustomerApproval?.customer_address_op1} {singleCustomerApproval?.customer_address_op2} {singleCustomerApproval?.customer_address_op3}
								</span>
							</h4>
							<h4>
								District: <span>{singleCustomerApproval?.district}</span>
							</h4>
							<h4>
								City: <span>{singleCustomerApproval?.city}</span>
							</h4>
							<h4>
								Postal Code: <span>{singleCustomerApproval?.postal_code}</span>
							</h4>
							<h4>
								Country: <span>{singleCustomerApproval?.country}</span>
							</h4>
							<h4>
								Region Code: <span>{singleCustomerApproval?.state_code}</span>
							</h4>
							<h4>
								C/O Person: <span>{singleCustomerApproval?.co_person}</span>
							</h4>
							<h4>
								Company Code: <span>{singleCustomerApproval?.company_code}</span>
							</h4>
							<h4>
								Reconciliation A/C: <span>{singleCustomerApproval?.recon_acc}</span>
							</h4>
							<h4>
								PayTerm: <span>{singleCustomerApproval?.pay_term}</span>
							</h4>
							<h4>
								Sales Organization: <span>{singleCustomerApproval?.sales_org}</span>
							</h4>
							<h4>
								Distribution Channel: <span>{singleCustomerApproval?.dist_channel}</span>
							</h4>
							<h4>
								Division: <span>{singleCustomerApproval?.division}</span>
							</h4>
							<h4>
								Transportation Zone: <span>{singleCustomerApproval?.transportation_zone}</span>
							</h4>
							<h4>
								Mobile Number: <span>{singleCustomerApproval?.mobile_no}</span>
							</h4>
							<h4>
								E-mail ID: <span>{singleCustomerApproval?.email_id}</span>
							</h4>
							<h4>
								Company Code: <span>{singleCustomerApproval?.company_code}</span>
							</h4>
							<h4>
								Sales-District: <span>{singleCustomerApproval?.sales_district}</span>
							</h4>
							<h4>
								Customer Account Group: <span>{singleCustomerApproval?.customer_acc_group}</span>
							</h4>
							<h4>
								Sales Office and Delivery Plant: <span>{singleCustomerApproval?.sales_office}</span>
							</h4>
							<h4>
								GSTIN: <span>{singleCustomerApproval?.gstin}</span>
							</h4>
							<h4>
								PAN: <span>{singleCustomerApproval?.pan_number}</span>
							</h4>
							<h4>
								Remarks: <span>{singleCustomerApproval?.approver_remarks}</span>
							</h4>
						</div>
						<SlTag slot="footer" size="large" pill style={{ "marginRight": "20px" }} variant={singleCustomerApproval?.status == 'pending' ? 'primary' : (singleCustomerApproval?.status == 'rejected' ? 'danger' : 'success')}>{singleCustomerApproval?.status}</SlTag>
						<SlTag slot="footer" size="large" pill style={{ "marginRight": "20px" }} variant={singleCustomerApproval?.ai_status == 'pending' ? 'primary' : (singleCustomerApproval?.ai_status == 'rejected' ? 'danger' : singleCustomerApproval?.ai_status == 'future_approval' ? 'neutral' : 'success')}>{singleCustomerApproval?.ai_status}</SlTag>
						<SlButton slot="footer" variant="primary" onClick={() => setCustomerApprovalDialog(false)}>
							Close
						</SlButton>
					</SlDialog>
				</div>
			</SlTabPanel>
			<SlTabPanel name="vendor_form">
				<div>
					<MUIDataTable options={vendorOptions} title="Submitted Forms View" data={vendorApprovals} columns={vendorColumns} />
					<SlDialog label="Form Data" open={vendorApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setVendorApprovalDialog(false)}>
						Data Dikhana Hai
						<SlTag slot="footer" size="large" pill style={{ "marginRight": "20px" }} variant={singleVendorApproval?.status == 'pending' ? 'primary' : (singleVendorApproval?.status == 'rejected' ? 'danger' : 'success')}>{singleVendorApproval?.status}</SlTag>
						<SlTag slot="footer" size="large" pill style={{ "marginRight": "20px" }} variant={singleVendorApproval?.ai_status == 'pending' ? 'primary' : (singleVendorApproval?.ai_status == 'rejected' ? 'danger' : singleVendorApproval?.ai_status == 'future_approval' ? 'neutral' : 'success')}>{singleVendorApproval?.ai_status}</SlTag>
						<SlButton slot="footer" variant="primary" onClick={() => setVendorApprovalDialog(false)}>
							Close
						</SlButton>
					</SlDialog>
				</div>
			</SlTabPanel>
		</SlTabGroup>

	);
}

export default View