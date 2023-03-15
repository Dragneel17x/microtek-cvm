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
		elevation: 1,
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
		elevation: 1,
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
		elevation: 1,
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
				<div className="view-table" style={{ padding: '1%' }}>
					<MUIDataTable options={customerOptions} title="Customer Forms View For MDM" data={customerApprovals} columns={customerColumns} />
					<SlDialog label="Form Data" open={customerApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setCustomerApprovalDialog(false)}>
						<div className="customer-form-data">
							<div className="cutomer-form-data-inner">
								<h4>Customer Group:</h4>
								<span>{singleCustomerApproval?.customer_group}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Customer Name: </h4>
								<span>
									{singleCustomerApproval?.customer_name} {singleCustomerApproval?.customer_name_op}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Customer Address: </h4>
								<span>
									{singleCustomerApproval?.customer_address} {singleCustomerApproval?.customer_address_op1} {singleCustomerApproval?.customer_address_op2}{' '}
									{singleCustomerApproval?.customer_address_op3}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>District:</h4>
								<span>{singleCustomerApproval?.district}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>City:</h4>
								<span>{singleCustomerApproval?.city}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Postal Code:</h4>
								<span>{singleCustomerApproval?.postal_code}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Country:</h4>
								<span>{singleCustomerApproval?.country}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Region Code:</h4>
								<span>{singleCustomerApproval?.state_code}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>C/O Person:</h4>
								<span>{singleCustomerApproval?.co_person}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Company Code:</h4>
								<span>{singleCustomerApproval?.company_code}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Reconciliation A/C:</h4>
								<span>{singleCustomerApproval?.reconciliation_acc}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>PayTerm:</h4>
								<span>{singleCustomerApproval?.pay_term}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Sales Organization:</h4>
								<span>{singleCustomerApproval?.sales_org}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Distribution Channel:</h4>
								<span>{singleCustomerApproval?.distribution_channel}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Division:</h4>
								<span>{singleCustomerApproval?.division}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Transportation Zone:</h4>
								<span>{singleCustomerApproval?.transportation_zone}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Mobile Number:</h4>
								<span>{singleCustomerApproval?.mobile_no}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>E-mail ID:</h4>
								<span>{singleCustomerApproval?.email_id}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Company Code:</h4>
								<span>{singleCustomerApproval?.company_code}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Sales-District:</h4>
								<span>{singleCustomerApproval?.sales_district}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Customer Account Group:</h4>
								<span>{singleCustomerApproval?.customer_acc_grp}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Sales Office and Delivery Plant:</h4>
								<span>{singleCustomerApproval?.sales_office}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>PAN:</h4>
								<span>{singleCustomerApproval?.pan_number}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Approver Name:</h4>
								<span>{singleCustomerApproval?.approver_employee_name}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Approver Email Id:</h4>
								<span>{singleCustomerApproval?.approver_mail_id}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Approver Mobile Number:</h4>
								<span>{singleCustomerApproval?.approver_phone_number}</span>
							</div>
							{singleCustomerApproval?.blank_cheque ? <div className="cutomer-form-data-inner">
								<h4>Blank Cheque:</h4>
								<span><a href={singleCustomerApproval?.blank_cheque} target='_blank'>View Document</a></span>
							</div> : null}
							{singleCustomerApproval?.GST_Image ? <div className="cutomer-form-data-inner">
								<h4>GST Document:</h4>
								<span><a href={singleCustomerApproval?.GST_Image} target='_blank'>View Document</a></span>
							</div> : null}
							{singleCustomerApproval?.PAN_Image ? <div className="cutomer-form-data-inner">
								<h4>PAN Card:</h4>
								<span><a href={singleCustomerApproval?.PAN_Image} target='_blank'>View Document</a></span>
							</div> : null}
							{singleCustomerApproval?.declaration ? <div className="cutomer-form-data-inner">
								<h4>Declaration:</h4>
								<span><a href={singleCustomerApproval?.declaration} target='_blank'>View Document</a></span>
							</div> : null}
							{singleCustomerApproval?.DAPF ? <div className="cutomer-form-data-inner">
								<h4>DAPF:</h4>
								<span><a href={singleCustomerApproval?.DAPF} target='_blank'>View Document</a></span>
							</div> : null}
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
				<div className="view-table" style={{ padding: '1%' }}>
					<MUIDataTable options={vendorOptions} title="Vendor Forms View For MDM" data={vendorApprovals} columns={vendorColumns} />
					<SlDialog label="Form Data" open={vendorApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setVendorApprovalDialog(false)}>
						<div className="Vendor-form-data">
							<div className="cutomer-form-data-inner">
								<h4>Vendor Group:</h4>
								<span>{singleVendorApproval?.vendor_group}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Vendor Name: </h4>
								<span>
									{singleVendorApproval?.vendor_name} {singleVendorApproval?.vendor_name_op}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Vendor Address: </h4>
								<span>
									{singleVendorApproval?.vendor_address} {singleVendorApproval?.vendor_address_op1} {singleVendorApproval?.vendor_address_op2}{' '}
									{singleVendorApproval?.vendor_address_op3}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>District:</h4>
								<span>{singleVendorApproval?.district}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>City:</h4>
								<span>{singleVendorApproval?.city}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Postal Code:</h4>
								<span>{singleVendorApproval?.postal_code}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Country:</h4>
								<span>{singleVendorApproval?.country}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Region Code/State Code:</h4>
								<span>{singleVendorApproval?.state}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>C/O Person:</h4>
								<span>{singleVendorApproval?.co_person}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Company Code:</h4>
								<span>{singleVendorApproval?.company_code}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>PayTerm:</h4>
								<span>{singleVendorApproval?.pay_term}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Mobile Number:</h4>
								<span>{singleVendorApproval?.mobile_no}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Purchasing Organization:</h4>
								<span>{singleVendorApproval?.purchasing_org}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Bank Account Number:</h4>
								<span>{singleVendorApproval?.bank_acc_no}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>IFSC Code:</h4>
								<span>{singleVendorApproval?.ifsc_code}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Name on Account:</h4>
								<span>{singleVendorApproval?.name_on_acc}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Company Code:</h4>
								<span>{singleVendorApproval?.company_code}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>PAN:</h4>
								<span>{singleVendorApproval?.pan}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>GSTIN:</h4>
								<span>{singleVendorApproval?.gstin}</span>
							</div>
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
				<div className="view-table" style={{ padding: '1%' }}>
					<MUIDataTable options={materialOptions} title="Material Creation View For MDM" data={materialApprovals} columns={materialColumns} />
					<SlDialog label="Form Data" open={materialApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setMaterialApprovalDialog(false)}>
						<div>
							<div>
								<div className="customer-form-data">
									<div className="cutomer-form-data-inner">
										<h4>Material Type:</h4>
										<span>{singleMaterialApproval?.mat_type}</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>Material Logic Number: </h4>
										<span>
											{singleMaterialApproval?.mat_logic_no}
										</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>Plant Name: </h4>
										<span>
											{singleMaterialApproval?.plant_name}
										</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>Storage Location: </h4>
										<span>
											{singleMaterialApproval?.storage_location}
										</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>Sales Organization: </h4>
										<span>
											{singleMaterialApproval?.mat_sales_org}
										</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>Distribution Channel: </h4>
										<span>
											{singleMaterialApproval?.mat_dist_channel}
										</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>Material Short Description: </h4>
										<span>
											{singleMaterialApproval?.mat_short_desc}
										</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>Material Long Description: </h4>
										<span>
											{singleMaterialApproval?.mat_long_desc}
										</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>Material Division: </h4>
										<span>
											{singleMaterialApproval?.mat_div}
										</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>Material Price Group: </h4>
										<span>
											{singleMaterialApproval?.mat_price_grp}
										</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>Base Unit of Measure: </h4>
										<span>
											{singleMaterialApproval?.base_unit_measure}
										</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>Purchasing Group: </h4>
										<span>
											{singleMaterialApproval?.mat_purchase_grp}
										</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>HSN Code: </h4>
										<span>
											{singleMaterialApproval?.hsn_code}
										</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>GR Processing Time:</h4>
										<span>
											{singleMaterialApproval?.gr_proc_time}
										</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>Serial Number Profile:</h4>
										<span>
											{singleMaterialApproval?.serial_no_profile}
										</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>Quality Inspection Type:</h4>
										<span>
											{singleMaterialApproval?.quality_insp_type}
										</span>
									</div>
									<div className="cutomer-form-data-inner">
										<h4>Valuation Type/Price Control"</h4>
										<span>
											{singleMaterialApproval?.price_control_desc}
										</span>
									</div>
								</div>
							</div>
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