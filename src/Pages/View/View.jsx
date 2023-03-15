import { SlButton, SlDialog, SlTab, SlTabGroup, SlTabPanel, SlTag } from '@shoelace-style/shoelace/dist/react';
import axios from 'axios';
import MUIDataTable from 'mui-datatables';
import React, { useEffect, useState } from 'react';
import { baseurl } from '../../config/apiConfig';

function View() {
	useEffect(() => {
		getCustomerApprovals();
		getVendorApprovals();
		getMaterialApprovals();
	}, []);

	const [customerApprovals, setCustomerApprovals] = useState();
	const [singleCustomerApproval, setSingleCustomerApproval] = useState();
	const [customerApprovalDialog, setCustomerApprovalDialog] = useState(false);

	const [vendorApprovals, setVendorApprovals] = useState();
	const [singleVendorApproval, setSingleVendorApproval] = useState();
	const [vendorApprovalDialog, setVendorApprovalDialog] = useState();

	const [materialApprovals, setMaterialApprovals] = useState();
	const [singleMaterialApproval, setSingleMaterialApproval] = useState();
	const [materialApprovalDialog, setMaterialApprovalDialog] = useState();

	function getCustomerApprovals() {
		const data = {
			employee_id: localStorage.getItem('employee_id'),
		};
		console.log(data);
		axios({
			method: 'post',
			url: `${baseurl.base_url}/cvm/get-submission-view`,
			//url: `${baseurl.base_url}/cvm/get-approval-forms`,
			header: {
				'Content-type': 'application/JSON',
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
			employee_id: localStorage.getItem('employee_id'),
		};
		console.log(data);
		axios({
			method: 'post',
			url: `${baseurl.base_url}/cvm/get-submission-vendor-view`,
			//url: `${baseurl.base_url}/cvm/get-approval-forms`,
			header: {
				'Content-type': 'application/JSON',
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
	function getMaterialApprovals() {
		const data = {
			employee_id: localStorage.getItem('employee_id'),
		};
		console.log(data);
		axios({
			method: 'post',
			url: `${baseurl.base_url}/cvm/get-submission-material-view`,
			//url: `http://localhost:8082/v1/api/cvm/get-submission-material-view`,
			header: {
				'Content-type': 'application/JSON',
			},
			data,
		})
			.then((res) => {
				console.log(res.data.data);
				setMaterialApprovals(res.data.data);
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
		selectableRowsHideCheckboxes: true,
	};
	const customerColumns = [
		{ name: 'customer_name', label: 'Customer Name' },
		{ name: 'company_code', label: 'Company Code' },
		{ name: 'mobile_no', label: 'Mobile Number' },
		{ name: 'approver_employee_id', label: 'Approver ID' },
		{ name: 'approver_mail_id', label: 'Approver Mail ID' },
		{ name: 'ai_status', label: 'Approval Status' },
		{ name: 'status', label: 'Overall Status' },
	];
	const vendorOptions = {
		elevation: 1,
		onRowClick: function (rowData, rowMeta) {
			console.log(rowMeta.dataIndex);
			setSingleVendorApproval(vendorApprovals[rowMeta.dataIndex]);
			setVendorApprovalDialog(true);
		},
		selectableRowsHideCheckboxes: true,
	};
	const vendorColumns = [
		{ name: 'created_by', label: 'Applied By' },
		{ name: 'vendor_name', label: 'Vendor Name' },
		{ name: 'company_code', label: 'Company Code' },
		{ name: 'mobile_no', label: 'Mobile Number' },
		{ name: 'approver_employee_id', label: 'Approver ID' },
		{ name: 'ai_status', label: 'Approval Status' },
		{ name: 'status', label: 'Overall Status' },
	];
	const materialOptions = {
		elevation: 1,
		onRowClick: function (rowData, rowMeta) {
			console.log(rowMeta.dataIndex);
			setSingleMaterialApproval(materialApprovals[rowMeta.dataIndex]);
			setMaterialApprovalDialog(true);
		},
		selectableRowsHideCheckboxes: true,
	};
	const materialColumns = [
		{ name: 'created_by', label: 'Applied By' },
		{ name: 'mat_short_desc', label: 'Material Description' },
		{ name: 'sales_organization', label: 'Sales Organization' },
		{ name: 'mat_group', label: 'Material Group' },
		{ name: 'approver_employee_id', label: 'Approver ID' },
		{ name: 'ai_status', label: 'Approval Status' },
		{ name: 'status', label: 'Overall Status' },
	];
	return (
		<SlTabGroup style={{ marginTop: '20px' }}>
			<SlTab slot="nav" panel="customer_form">
				Customer Form
			</SlTab>
			{/* <SlTab slot="nav" panel="vendor_form">
				Vendor Form 
			</SlTab> */}
			<SlTab slot="nav" panel="material_creation">
				Material Creation
			</SlTab>

			<SlTabPanel name="customer_form">
				<div className="view-table">
					<MUIDataTable options={customerOptions} title="Customer Forms View" data={customerApprovals} columns={customerColumns} />
					<SlDialog label="Form Data" open={customerApprovalDialog} style={{ '--width': '50vw' }} onSlAfterHide={() => setCustomerApprovalDialog(false)}>
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
							<div className="cutomer-form-data-inner">
								<h4>Status At Approver's End:</h4>
								<SlTag
									slot="footer"
									size="large"

									style={{ maxWidth: '200px' }}
									variant={
										singleCustomerApproval?.ai_status == 'pending'
											? 'primary'
											: singleCustomerApproval?.ai_status == 'rejected'
												? 'danger'
												: singleCustomerApproval?.ai_status == 'future_approval'
													? 'neutral'
													: 'success'
									}>
									{singleCustomerApproval?.ai_status}
								</SlTag>
							</div>

						</div>

						<SlTag
							slot="footer"
							size="large"
							pill
							style={{ marginRight: '20px' }}
							variant={singleCustomerApproval?.status == 'pending' ? 'primary' : singleCustomerApproval?.status == 'rejected' ? 'danger' : 'success'}>
							{singleCustomerApproval?.status}
						</SlTag>
						{/* 	<SlTag
							slot="footer"
							size="large"
							pill
							style={{ marginRight: '20px' }}
							variant={
								singleCustomerApproval?.ai_status == 'pending'
									? 'primary'
									: singleCustomerApproval?.ai_status == 'rejected'
									? 'danger'
									: singleCustomerApproval?.ai_status == 'future_approval'
									? 'neutral'
									: 'success'
							}>
							{singleCustomerApproval?.ai_status}
						</SlTag> */}
						<SlButton slot="footer" variant="primary" onClick={() => setCustomerApprovalDialog(false)}>
							Close
						</SlButton>
					</SlDialog>
				</div>
			</SlTabPanel>
			{/* <SlTabPanel name="vendor_form">
				<div className="view-table">
					<MUIDataTable options={vendorOptions} title="Vendor Forms View" data={vendorApprovals} columns={vendorColumns} />
					<SlDialog label="Form Data" open={vendorApprovalDialog} style={{ "--width": "50vw" }} onSlAfterHide={() => setVendorApprovalDialog(false)}>
						Data Dikhana Hai
						<SlTag slot="footer" size="large" pill style={{ "marginRight": "20px" }} variant={singleVendorApproval?.status == 'pending' ? 'primary' : (singleVendorApproval?.status == 'rejected' ? 'danger' : 'success')}>{singleVendorApproval?.status}</SlTag>
						<SlTag slot="footer" size="large" pill style={{ "marginRight": "20px" }} variant={singleVendorApproval?.ai_status == 'pending' ? 'primary' : (singleVendorApproval?.ai_status == 'rejected' ? 'danger' : singleVendorApproval?.ai_status == 'future_approval' ? 'neutral' : 'success')}>{singleVendorApproval?.ai_status}</SlTag>
						<SlButton slot="footer" variant="primary" onClick={() => setVendorApprovalDialog(false)}>
							Close
						</SlButton>
					</SlDialog>
				</div>
			</SlTabPanel> */}
			<SlTabPanel name="material_creation">
				<div className="view-table">
					<MUIDataTable options={materialOptions} title="Material Creation View" data={materialApprovals} columns={materialColumns} />
					<SlDialog label="Form Data" open={materialApprovalDialog} style={{ '--width': '50vw' }} onSlAfterHide={() => setMaterialApprovalDialog(false)}>
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
								<div className="cutomer-form-data-inner">
									<h4>Approver Name:</h4>
									<span>{singleMaterialApproval?.approver_employee_name}</span>
								</div>
								<div className="cutomer-form-data-inner">
									<h4>Approver Email Id:</h4>
									<span>{singleMaterialApproval?.approver_mail_id}</span>
								</div>
								<div className="cutomer-form-data-inner">
									<h4>Approver Mobile Number:</h4>
									<span>{singleMaterialApproval?.approver_phone_number}</span>
								</div>
								<div className="cutomer-form-data-inner">
									<h4>Remarks:</h4>
									<span>{singleMaterialApproval?.approver_remarks}</span>
								</div>
								<div className="cutomer-form-data-inner">
									<h4>Approver Name:</h4>
									<span>{singleMaterialApproval?.approver_employee_name}</span>
								</div>
								<div className="cutomer-form-data-inner">
									<h4>Approver Email Id:</h4>
									<span>{singleMaterialApproval?.approver_mail_id}</span>
								</div>
								<div className="cutomer-form-data-inner">
									<h4>Approver Mobile Number:</h4>
									<span>{singleMaterialApproval?.approver_phone_number}</span>
								</div>
								<div className="cutomer-form-data-inner">
									<h4>Remarks:</h4>
									<span>{singleMaterialApproval?.approver_remarks}</span>
								</div>
								<div className="cutomer-form-data-inner">
									<h4>Status At Approver's End:</h4>
									<SlTag
										slot="footer"
										size="large"

										style={{ maxWidth: '200px' }}
										variant={
											singleMaterialApproval?.ai_status == 'pending'
												? 'primary'
												: singleMaterialApproval?.ai_status == 'rejected'
													? 'danger'
													: singleMaterialApproval?.ai_status == 'future_approval'
														? 'neutral'
														: 'success'
										}>
										{singleMaterialApproval?.ai_status}
									</SlTag>

								</div>
							</div>
						</div>

						<SlTag
							slot="footer"
							size="large"
							pill
							style={{ marginRight: '20px' }}
							variant={singleMaterialApproval?.status == 'pending' ? 'primary' : singleMaterialApproval?.status == 'rejected' ? 'danger' : 'success'}>
							{singleMaterialApproval?.status}
						</SlTag>
						<SlTag
							slot="footer"
							size="large"
							pill
							style={{ marginRight: '20px' }}
							variant={
								singleMaterialApproval?.ai_status == 'pending'
									? 'primary'
									: singleMaterialApproval?.ai_status == 'rejected'
										? 'danger'
										: singleMaterialApproval?.ai_status == 'future_approval'
											? 'neutral'
											: 'success'
							}>
							{singleMaterialApproval?.ai_status}
						</SlTag>
						<SlButton slot="footer" variant="primary" onClick={() => setMaterialApprovalDialog(false)}>
							Close
						</SlButton>
					</SlDialog>
				</div>
			</SlTabPanel>
		</SlTabGroup>
	);
}

export default View;
