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
				<SlTab slot="nav" panel="vendor_form">
					Vendor Form Approvals
				</SlTab>
				<SlTab slot="nav" panel="material_creation">
					Material Creation Approvals
				</SlTab>

				<SlTabPanel name="customer_form">
					<div className="view-table">
						<MUIDataTable options={options} title="Customer Form Approvals" data={customerApprovals} columns={columns} />
						<SlDialog label="Dialog" open={customerApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setCustomerApprovalDialog(false)}>
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
								<h4 className = "view">
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
				<SlTabPanel name="vendor_form">
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
				</SlTabPanel>
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
