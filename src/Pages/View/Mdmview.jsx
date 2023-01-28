import { SlButton, SlDialog, SlInput, SlTab, SlTabGroup, SlTabPanel, SlTag } from "@shoelace-style/shoelace/dist/react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { baseurl } from "../../config/apiConfig";

function Mdmview() {
	useEffect(() => {
		getApprovalForms();
		getVendorForms();
	}, []);

	const [customerApprovals, setCustomerApprovals] = useState();
	const [singleCustomerApproval, setSingleCustomerApproval] = useState();
	const [customerApprovalDialog, setCustomerApprovalDialog] = useState(false);
	const [sap_code, setSap_code] = useState("");

	const [vendorApprovals, setVendorApprovals] = useState();
	const [singleVendorApproval, setSingleVendorApproval] = useState();
	const [vendorApprovalDialog, setVendorApprovalDialog] = useState(false);


	function getApprovalForms() {
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
				setCustomerApprovals(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function getVendorForms() {
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/get-vendor-mdm-view`,
			//url: `${baseurl.base_url}/cvm/get-approval-forms`,
			header: {
				"Content-type": "application/JSON",
			}
		})
			.then((res) => {
				console.log(res.data.data);
				setVendorApprovals(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function updateCustomerForm() {
		const data = {
			employee_id: localStorage.getItem('employee_id'),
			sap_code: sap_code,
			form_id: singleCustomerApproval.id
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
				setCustomerApprovalDialog(false)
				getApprovalForms();
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function updateVendorForm() {
		const data = {
			employee_id: localStorage.getItem('employee_id'),
			sap_code: sap_code,
			form_id: singleVendorApproval.id
		}
		console.log(data);
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/add-vendor-sap-code`,
			//url: `${baseurl.base_url}/cvm/get-approval-forms`,
			header: {
				"Content-type": "application/JSON",
			},
			data
		})
			.then((res) => {
				console.log(res.data);
				setCustomerApprovalDialog(false)
				getApprovalForms();
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
		{ name: "distribution_channel", label: "Distribution Channel" },
		{ name: "email_id", label: "Email ID" },
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
		{ name: "state", label: "State" },
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
					<MUIDataTable options={customerOptions} title="Submitted Forms View For MDM" data={customerApprovals} columns={customerColumns} />
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
								label="SAP Customer Code"
							/>
						</div>
						{sap_code ? <SlButton slot="footer" variant="success" style={{ marginRight: "20px" }} onClick={() => updateCustomerForm()}>
							Update
						</SlButton> : ""}

						<SlButton slot="footer" variant="primary" onClick={() => setCustomerApprovalDialog(false)}>
							Close
						</SlButton>
					</SlDialog>
				</div>
			</SlTabPanel>
			<SlTabPanel name="vendor_form">
				<div>
					<MUIDataTable options={vendorOptions} title="Vendor Forms View For MDM" data={vendorApprovals} columns={vendorColumns} />
					<SlDialog label="Form Data" open={vendorApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setVendorApprovalDialog(false)}>
					<div>
							<h4>
								Vendor Group: <span>{singleVendorApproval?.vendor_group}</span>
							</h4>
							<h4>
								Customer Name:{" "}
								<span>
									{singleVendorApproval?.vendor_name} {singleVendorApproval?.vendor_name_op1}
								</span>
							</h4>
							<h4>
								Customer Address:{" "}
								<span>
									{singleVendorApproval?.vendor_address} {singleVendorApproval?.vendor_address_op1} {singleVendorApproval?.vendor_address_op2} {singleVendorApproval?.vendor_address_op3}
								</span>
							</h4>
							<h4>
								District: <span>{singleVendorApproval?.district}</span>
							</h4>
							<h4>
								City: <span>{singleVendorApproval?.city}</span>
							</h4>
							<h4>
								Postal Code: <span>{singleVendorApproval?.postal_code}</span>
							</h4>
							<h4>
								Country: <span>{singleVendorApproval?.country}</span>
							</h4>
							<h4>
								Region Code: <span>{singleVendorApproval?.state_code}</span>
							</h4>
							<h4>
								C/O Person: <span>{singleVendorApproval?.co_person}</span>
							</h4>
							<h4>
								Company Code: <span>{singleVendorApproval?.company_code}</span>
							</h4>
							<h4>
								Bank A/C: <span>{singleVendorApproval?.bank_acc_no}</span>
							</h4>
							<h4>
								Name on Account: <span>{singleVendorApproval?.name_on_acc}</span>
							</h4>
							<h4>
								Company Code: <span>{singleVendorApproval?.company_code}</span>
							</h4>
							<h4>
								Purchasing Organization: <span>{singleVendorApproval?.purchasing_org}</span>
							</h4>
							<h4>
								Division: <span>{singleCustomerApproval?.division}</span>
							</h4>
							<h4>
								Witholding Tax: <span>{singleVendorApproval?.witholding_tax}</span>
							</h4>
							<h4>
								Mobile Number: <span>{singleVendorApproval?.mobile_no}</span>
							</h4>
							<h4>
								E-mail ID: <span>{singleVendorApproval?.email_id}</span>
							</h4>
							<h4>
								Order Currency : <span>{singleVendorApproval?.order_currency}</span>
							</h4>
							<h4>
								IFSC Code: <span>{singleVendorApproval?.ifsc_code}</span>
							</h4>
							<h4>
								GSTIN: <span>{singleVendorApproval?.gstin}</span>
							</h4>
							<h4>
								PAN: <span>{singleVendorApproval?.pan_number}</span>
							</h4>
						</div>
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
							label="SAP Vendor Code"
						/>
						{sap_code ? <SlButton slot="footer" variant="success" style={{ marginRight: "20px" }} onClick={() => updateVendorForm()}>
							Update
						</SlButton> : ""}
						<SlButton slot="footer" variant="primary" onClick={() => setVendorApprovalDialog(false)}>
							Close
						</SlButton>
					</SlDialog>
				</div>
			</SlTabPanel>
		</SlTabGroup>
	);
}

export default Mdmview