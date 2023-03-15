import { SlButton, SlDialog, SlInput, SlTab, SlTabGroup, SlTabPanel } from "@shoelace-style/shoelace/dist/react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { baseurl } from "../../config/apiConfig";

function Approval() {
	useEffect(() => {
		getCustomerApprovals();
		getVendorApprovals();
		getMaterialApprovals();
	}, []);

	const [customerApprovals, setCustomerApprovals] = useState();
	const [singleCustomerApproval, setSingleCustomerApproval] = useState();
	const [customerApprovalDialog, setCustomerApprovalDialog] = useState(false);

	const [vendorApprovals, setVendorApprovals] = useState()
	const [singleVendorApproval, setSingleVendorApproval] = useState();
	const [vendorApprovalDialog, setVendorApprovalDialog] = useState(false);

	const [materialApprovals, setMaterialApprovals] = useState()
	const [singleMaterialApproval, setSingleMaterialApproval] = useState();
	const [materialApprovalDialog, setMaterialApprovalDialog] = useState(false);

	function getCustomerApprovals() {
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
				setCustomerApprovals(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function changeCustomerRequestStatus(status) {
		const data = {
			status: status,
			approver_remarks: approverRemark,
			employee_id: localStorage.getItem("employee_id"),
			approval_id: singleCustomerApproval?.approval_id,
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
				getCustomerApprovals();
				setCustomerApprovalDialog(false)
			})
			.catch((err) => {
				console.log(err);
				setCustomerApprovalDialog(false)
			});
	}
	const options = {
		elevation:1,
		onRowClick: function (rowData, rowMeta) {
			console.log(rowMeta.dataIndex);
			setSingleCustomerApproval(customerApprovals[rowMeta.dataIndex]);
			setCustomerApprovalDialog(true);
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

	function getMaterialApprovals() {
		const data = {
			employee_id: localStorage.getItem("employee_id"),
		};
		console.log(data);
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/get-material-approval-forms`,
			//url: `http://localhost:8082/v1/api/cvm/get-material-approval-forms`,
			header: {
				"Content-type": "application/JSON",
			},
			data,
		})
			.then((res) => {
				console.log(res);
				setMaterialApprovals(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function changeMaterialRequestStatus(status) {
		const data = {
			status: status,
			approver_remarks: approverRemark,
			employee_id: localStorage.getItem("employee_id"),
			approval_id: singleMaterialApproval?.approval_id,
		};
		console.log(data);
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/approve-material-form`,
			//url: `http://localhost:8082/v1/api/cvm/approve-material-form`,
			header: {
				"Content-type": "application/JSON",
			},
			data,
		})
			.then((res) => {
				console.log(res);
				getMaterialApprovals();
				setMaterialApprovalDialog(false)
			})
			.catch((err) => {
				console.log(err);
				setMaterialApprovalDialog(false)
			});
	}
	const material_options = {
		elevation:1,
		onRowClick: function (rowData, rowMeta) {
			console.log(rowMeta.dataIndex);
			console.log(materialApprovals[rowMeta.dataIndex]);
			setSingleMaterialApproval(materialApprovals[rowMeta.dataIndex]);
			setMaterialApprovalDialog(true);
		},
	};
	const material_columns = [
		{ name: "applied_by", label: "Applied By" },
		{ name: "mat_short_desc", label: "Material Description" },
		{ name: "hsn_code", label: "HSN Code" },
		{ name: "dist_channel", label: "Distribution Channel" },
		{ name: "sales_organization", label: "Sales Organization" },
		{ name: "purchasing_grp", label: "Purchasing Group" },
		{ name: "created_at", label: "Request Date" },
	];

	function getVendorApprovals() {
		const data = {
			employee_id: localStorage.getItem("employee_id"),
		};
		console.log(data);
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/get-vendor-approval-forms`,
			//url: `${baseurl.base_url}/cvm/get-approval-forms`,
			header: {
				"Content-type": "application/JSON",
			},
			data,
		})
			.then((res) => {
				console.log(res);
				setVendorApprovals(res.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}
	function changeVendorRequestStatus(status) {
		const data = {
			status: status,
			approver_remarks: approverRemark,
			employee_id: localStorage.getItem("employee_id"),
			approval_id: singleVendorApproval?.approval_id,
		};
		console.log(data);
		axios({
			method: "post",
			url: `${baseurl.base_url}/cvm/approve-vendor-form`,
			header: {
				"Content-type": "application/JSON",
			},
			data,
		})
			.then((res) => {
				console.log(res);
				getVendorApprovals();
				setVendorApprovalDialog(false)
			})
			.catch((err) => {
				console.log(err);
				setVendorApprovalDialog(false)
			});
	}
	const vendor_options = {
		elevation:1,
		onRowClick: function (rowData, rowMeta) {
			console.log(rowMeta.dataIndex);
			setSingleVendorApproval(vendorApprovals[rowMeta.dataIndex]);
			setVendorApprovalDialog(true);
		},
	};
	const vendor_columns = [
		{ name: "applied_by", label: "Applied By" },
		{ name: "vendor_name", label: "Vendor Name" },
		{ name: "company_code", label: "Company Code" },
		{ name: "approval_id", label: "Approval ID" },
		{ name: "request_id", label: "Request ID" },
		{ name: "request_type", label: "Request Type" },
		{ name: "created_at", label: "Request Date" },
	];

	const [approverRemark, setApproverRemark] = useState("");
	return (
		<div>
			<SlTabGroup style={{ marginTop: "20px" }}>
				<SlTab slot="nav" panel="customer_form">
					Customer Form Approvals
				</SlTab>
				{/* <SlTab slot="nav" panel="vendor_form">
					Vendor Form Approvals
				</SlTab> */}
				<SlTab slot="nav" panel="material_creation">
					Material Creation Approvals
				</SlTab>

				<SlTabPanel name="customer_form">
					<div className="view-table">
						<MUIDataTable options={options} title="Customer Form Approvals" data={customerApprovals} columns={columns} />
						<SlDialog label="Dialog" open={customerApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setCustomerApprovalDialog(false)}>
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
							<div className="cutomer-form-data-inner">
								<h4>Remarks:</h4>
								<span>{singleCustomerApproval?.approver_remarks}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Approver Name</h4>
								<span>{singleCustomerApproval?.approver_employee_name}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Approver Email Id</h4>
								<span>{singleCustomerApproval?.approver_mail_id}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Approver Mobile Number</h4>
								<span>{singleCustomerApproval?.approver_phone_number}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Remarks:</h4>
								<span>{singleCustomerApproval?.approver_remarks}</span>
							</div>
							{singleCustomerApproval?.blank_cheque? <div className="cutomer-form-data-inner">
								<h4>Blank Cheque:</h4>
								<span><a href={singleCustomerApproval?.blank_cheque} target='_blank'>View Document</a></span>
							</div> : null}
							{singleCustomerApproval?.GST_Image? <div className="cutomer-form-data-inner">
								<h4>GST Document:</h4>
								<span><a href={singleCustomerApproval?.GST_Image} target='_blank'>View Document</a></span>
							</div> : null}
							{singleCustomerApproval?.PAN_Image? <div className="cutomer-form-data-inner">
								<h4>PAN Card:</h4>
								<span><a href={singleCustomerApproval?.PAN_Image} target='_blank'>View Document</a></span>
							</div> : null}
							{singleCustomerApproval?.declaration? <div className="cutomer-form-data-inner">
								<h4>Declaration:</h4>
								<span><a href={singleCustomerApproval?.declaration} target='_blank'>View Document</a></span>
							</div> : null}
							{singleCustomerApproval?.DAPF? <div className="cutomer-form-data-inner">
								<h4>DAPF:</h4>
								<span><a href={singleCustomerApproval?.DAPF} target='_blank'>View Document</a></span>
							</div> : null}
						</div>

							<SlInput
								className="helptext"
								name="approver_remark"
								value={approverRemark}
								onSlInput={(e) => {
									setApproverRemark(e.target.value)
								}}
								style={{ marginTop: "20px" }}
								label="Remarks"
							/>

							<SlButton
								slot="footer"
								style={{ marginRight: "20px" }}
								variant="success"
								disabled={approverRemark ? false : true}
								onClick={() => {
									changeCustomerRequestStatus("approved");
								}}
							>
								Approve
							</SlButton>
							<SlButton
								slot="footer"
								style={{ marginRight: "20px" }}
								disabled={approverRemark?.toLowerCase().replaceAll(" ", "") == "ok" || approverRemark == "" ? true : false}
								variant="danger"
								onClick={() => {
									changeCustomerRequestStatus("rejected");
								}}
							>
								Reject
							</SlButton>
							<SlButton slot="footer" variant="primary" onClick={() => setCustomerApprovalDialog(false)}>
								Close
							</SlButton>
						</SlDialog>
					</div>
				</SlTabPanel>
				{/* <SlTabPanel name="vendor_form">
					<div className="view-table">
						<MUIDataTable options={vendor_options} title="Vendor Form Approvals" data={vendorApprovals} columns={vendor_columns} />
						<SlDialog label="Dialog" open={vendorApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setVendorApprovalDialog(false)}>
							Data Dikhana hai
							<SlInput
								className="helptext"
								name="approver_remark"
								value={approverRemark}
								onSlInput={(e) => {
									setApproverRemark(e.target.value)
								}}
								style={{ marginTop: "20px" }}
								label="Remarks"
							/>

							<SlButton
								slot="footer"
								style={{ marginRight: "20px" }}
								variant="success"
								disabled={approverRemark ? false : true}
								onClick={() => {
									changeVendorRequestStatus("approved");
								}}
							>
								Approve
							</SlButton>
							<SlButton
								slot="footer"
								style={{ marginRight: "20px" }}
								disabled={approverRemark?.toLowerCase().replaceAll(" ", "") == "ok" || approverRemark == "" ? true : false}
								variant="danger"
								onClick={() => {
									changeVendorRequestStatus("rejected");
								}}
							>
								Reject
							</SlButton>
							<SlButton slot="footer" variant="primary" onClick={() => setVendorApprovalDialog(false)}>
								Close
							</SlButton>
						</SlDialog>
					</div>
				</SlTabPanel> */}
				<SlTabPanel name="material_creation">
					<div className="view-table">
						<MUIDataTable options={material_options} title="Material Creation Approvals" data={materialApprovals} columns={material_columns} />
						<SlDialog label="Dialog" open={materialApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setMaterialApprovalDialog(false)}>
							Data Dikhana Hai
							<SlInput
								className="helptext"
								name="approver_remark"
								value={approverRemark}
								onSlInput={(e) => {
									setApproverRemark(e.target.value)
								}}
								style={{ marginTop: "20px" }}
								label="Remarks"
							/>

							<SlButton
								slot="footer"
								style={{ marginRight: "20px" }}
								variant="success"
								disabled={approverRemark ? false : true}
								onClick={() => {
									changeMaterialRequestStatus("approved");
								}}
							>
								Approve
							</SlButton>
							<SlButton
								slot="footer"
								style={{ marginRight: "20px" }}
								disabled={approverRemark?.toLowerCase().replaceAll(" ", "") == "ok" || approverRemark == "" ? true : false}
								variant="danger"
								onClick={() => {
									changeMaterialRequestStatus("rejected");
								}}
							>
								Reject
							</SlButton>
							<SlButton slot="footer" variant="primary" onClick={() => setMaterialApprovalDialog(false)}>
								Close
							</SlButton>
						</SlDialog>
					</div>
				</SlTabPanel>
			</SlTabGroup>
		</div>
	);
}

export default Approval;
