import { SlButton, SlDialog, SlInput, SlTab, SlTabGroup, SlTabPanel, SlTag } from "@shoelace-style/shoelace/dist/react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { baseurl } from "../../config/apiConfig";

function Mdmview() {
	useEffect(() => {
		getApprovalForms();
		getVendorForms();
		getMaterialForms();
	}, []);

	const [customerApprovals, setCustomerApprovals] = useState();
	const [singleCustomerApproval, setSingleCustomerApproval] = useState();
	const [customerApprovalDialog, setCustomerApprovalDialog] = useState(false);
	const [sap_code, setSap_code] = useState("");

	const [vendorApprovals, setVendorApprovals] = useState();
	const [singleVendorApproval, setSingleVendorApproval] = useState();
	const [vendorApprovalDialog, setVendorApprovalDialog] = useState(false);

	const [materialApprovals, setMaterialApprovals] = useState();
	const [singleMaterialApproval, setSingleMaterialApproval] = useState();
	const [materialApprovalDialog, setMaterialApprovalDialog] = useState();


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
	function getMaterialForms() {
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/get-material-mdm-view`,
			//url: `http://localhost:8082/v1/api/cvm/get-material-mdm-view`,
			header: {
				"Content-type": "application/JSON",
			}
		})
			.then((res) => {
				console.log(res.data.data);
				setMaterialApprovals(res.data.data);
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
				setVendorApprovalDialog(false)
				getVendorForms();
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function updateMaterialForm() {
		const data = {
			employee_id: localStorage.getItem('employee_id'),
			sap_code: sap_code,
			form_id: singleMaterialApproval.id
		}
		console.log(data);
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/add-material-sap-code`,
			//url: `http://localhost:8082/v1/api/cvm/add-material-sap-code`,
			header: {
				"Content-type": "application/JSON",
			},
			data
		})
			.then((res) => {
				console.log(res.data);
				setMaterialApprovalDialog(false)
				getMaterialForms();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const customerOptions = {
		elevation:1,
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
		elevation:1,
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
	const materialOptions = {
		elevation:1,
		onRowClick: function (rowData, rowMeta) {
			console.log(rowMeta.dataIndex);
			setSingleMaterialApproval(materialApprovals[rowMeta.dataIndex]);
			setMaterialApprovalDialog(true);
		},
		selectableRowsHideCheckboxes: true
	};
	const materialColumns = [
		{ name: "created_by", label: "Applied By" },
		{ name: "mat_short_desc", label: "Material Description" },
		{ name: "sales_organization", label: "Sales Organization" },
		{ name: "mat_group", label: "Material Group" },
		{ name: "dist_channel", label: "Dist Channel" },
		{ name: "division", label: "Division" },
		{ name: "mat_type", label: "Material Type" },
	];
	return (
		<SlTabGroup style={{ marginTop: "20px" }}>
			<SlTab slot="nav" panel="customer_form">
				Customer Form 
			</SlTab>
			<SlTab slot="nav" panel="vendor_form">
				Vendor Form 
			</SlTab>
			<SlTab slot="nav" panel="material_creation">
				Material Creation 
			</SlTab>

			<SlTabPanel name="customer_form">
				<div className="view-table" style={{padding:'1%'}}>
					<MUIDataTable options={customerOptions} title="Customer Forms View For MDM" data={customerApprovals} columns={customerColumns} />
					<SlDialog label="Form Data" open={customerApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setCustomerApprovalDialog(false)}>
						<div>
							<h4 className = "view">
								Customer Group: <span>{singleCustomerApproval?.customer_group}</span>
							</h4>
							<h4 className = "view">
								Customer Name:{" "}
								<span>
									{singleCustomerApproval?.customer_name} {singleCustomerApproval?.customer_name_op}
								</span>
							</h4>
							<h4 className = "view">
								Customer Address:{" "}
								<span>
									{singleCustomerApproval?.customer_address} {singleCustomerApproval?.customer_address_op1} {singleCustomerApproval?.customer_address_op2} {singleCustomerApproval?.customer_address_op3}
								</span>
							</h4>
							<h4 className = "view">
								District: <span>{singleCustomerApproval?.district}</span>
							</h4>
							<h4 className = "view">
								City: <span>{singleCustomerApproval?.city}</span>
							</h4>
							<h4 className = "view"> className = "view"
								Postal Code: <span>{singleCustomerApproval?.postal_code}</span>
							</h4>
							<h4 className = "view">
								Country: <span>{singleCustomerApproval?.country}</span>
							</h4>
							<h4 className = "view">
								Region Code: <span>{singleCustomerApproval?.state_code}</span>
							</h4>
							<h4 className = "view">
								C/O Person: <span>{singleCustomerApproval?.co_person}</span>
							</h4>
							<h4 className = "view">
								Company Code: <span>{singleCustomerApproval?.company_code}</span>
							</h4>
							<h4 className = "view">
								Reconciliation A/C: <span>{singleCustomerApproval?.recon_acc}</span>
							</h4>
							<h4 className = "view">
								PayTerm: <span>{singleCustomerApproval?.pay_term}</span>
							</h4>
							<h4 className = "view">
								Sales Organization: <span>{singleCustomerApproval?.sales_org}</span>
							</h4>
							<h4 className = "view">
								Distribution Channel: <span>{singleCustomerApproval?.dist_channel}</span>
							</h4>
							<h4 className = "view">
								Division: <span>{singleCustomerApproval?.division}</span>
							</h4>
							<h4 className = "view">
								Transportation Zone: <span>{singleCustomerApproval?.transportation_zone}</span>
							</h4>
							<h4 className = "view">
								Mobile Number: <span>{singleCustomerApproval?.mobile_no}</span>
							</h4>
							<h4 className = "view">
								E-mail ID: <span>{singleCustomerApproval?.email_id}</span>
							</h4>
							<h4 className = "view">
								Company Code: <span>{singleCustomerApproval?.company_code}</span>
							</h4>
							<h4 className = "view">
								Sales-District: <span>{singleCustomerApproval?.sales_district}</span>
							</h4>
							<h4 className = "view">
								Customer Account Group: <span>{singleCustomerApproval?.customer_acc_group}</span>
							</h4>
							<h4 className = "view">
								Sales Office and Delivery Plant: <span>{singleCustomerApproval?.sales_office}</span>
							</h4>
							<h4 className = "view">
								GSTIN: <span>{singleCustomerApproval?.gstin}</span>
							</h4>
							<h4 className = "view">
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
				<div className="view-table" style={{padding:'1%'}}>
					<MUIDataTable options={vendorOptions} title="Vendor Forms View For MDM" data={vendorApprovals} columns={vendorColumns} />
					<SlDialog label="Form Data" open={vendorApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setVendorApprovalDialog(false)}>
					<div>
							<h4 className = "view">
								Vendor Group: <span>{singleVendorApproval?.vendor_group}</span>
							</h4>
							<h4 className = "view">
								Customer Name:{" "}
								<span>
									{singleVendorApproval?.vendor_name} {singleVendorApproval?.vendor_name_op1}
								</span>
							</h4>
							<h4 className = "view">
								Customer Address:{" "}
								<span>
									{singleVendorApproval?.vendor_address} {singleVendorApproval?.vendor_address_op1} {singleVendorApproval?.vendor_address_op2} {singleVendorApproval?.vendor_address_op3}
								</span>
							</h4>
							<h4 className = "view">
								District: <span>{singleVendorApproval?.district}</span>
							</h4>
							<h4 className = "view">
								City: <span>{singleVendorApproval?.city}</span>
							</h4>
							<h4 className = "view">
								Postal Code: <span>{singleVendorApproval?.postal_code}</span>
							</h4>
							<h4 className = "view">
								Country: <span>{singleVendorApproval?.country}</span>
							</h4>
							<h4 className = "view">
								Region Code: <span>{singleVendorApproval?.state_code}</span>
							</h4>
							<h4 className = "view">
								C/O Person: <span>{singleVendorApproval?.co_person}</span>
							</h4>
							<h4 className = "view">
								Company Code: <span>{singleVendorApproval?.company_code}</span>
							</h4>
							<h4 className = "view">
								Bank A/C: <span>{singleVendorApproval?.bank_acc_no}</span>
							</h4>
							<h4 className = "view">
								Name on Account: <span>{singleVendorApproval?.name_on_acc}</span>
							</h4>
							<h4 className = "view">
								Company Code: <span>{singleVendorApproval?.company_code}</span>
							</h4>
							<h4 className = "view">
								Purchasing Organization: <span>{singleVendorApproval?.purchasing_org}</span>
							</h4>
							<h4 className = "view">
								Division: <span>{singleCustomerApproval?.division}</span>
							</h4>
							<h4 className = "view">
								Witholding Tax: <span>{singleVendorApproval?.witholding_tax}</span>
							</h4>
							<h4 className = "view">
								Mobile Number: <span>{singleVendorApproval?.mobile_no}</span>
							</h4>
							<h4 className = "view">
								E-mail ID: <span>{singleVendorApproval?.email_id}</span>
							</h4>
							<h4 className = "view">
								Order Currency : <span>{singleVendorApproval?.order_currency}</span>
							</h4>
							<h4 className = "view">
								IFSC Code: <span>{singleVendorApproval?.ifsc_code}</span>
							</h4>
							<h4 className = "view">
								GSTIN: <span>{singleVendorApproval?.gstin}</span>
							</h4>
							<h4 className = "view">
								PAN: <span>{singleVendorApproval?.pan}</span>
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
			<SlTabPanel name="material_creation">
				<div className="view-table" style={{padding:'1%'}}>
					<MUIDataTable options={materialOptions} title="Material Creation View For MDM" data={materialApprovals} columns={materialColumns} />
					<SlDialog label="Form Data" open={materialApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setMaterialApprovalDialog(false)}>
						<div>
							Data Dikhana Hai
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
							label="SAP Material Code"
						/>
						{sap_code ? <SlButton slot="footer" variant="success" style={{ marginRight: "20px" }} onClick={() => updateMaterialForm()}>
							Update
						</SlButton> : ""}
						<SlButton slot="footer" variant="primary" onClick={() => setMaterialApprovalDialog(false)}>
							Close
						</SlButton>
					</SlDialog>
				</div>
			</SlTabPanel>
		</SlTabGroup>
	);
}

export default Mdmview