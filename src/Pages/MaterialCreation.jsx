import React, { useEffect, useState } from "react";
import {
  SlButton,
  SlCard,
  SlDivider,
  SlDropdown,
  SlDialog,
  SlIcon,
  SlInput,
  SlMenu,
  SlMenuItem,
  SlSelect,
  SlCheckbox,
} from "@shoelace-style/shoelace/dist/react";
import "./Form.css";
import { useQuery } from "react-query";
import axios, { Axios } from "axios";
import { useFetcher } from "react-router-dom";
import { baseurl } from "../config/apiConfig";
/* const baseurl = {
  base_url: "http://localhost:8082/v1/api",
} */
function Form() {
  const [countryCodes, setCountryCodes] = useState();
  const [stateList, setStateList] = useState();
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [companyCode, setCompanyCode] = useState();
  const [payTerm, setPayTerm] = useState();
  const [plantName, setPlantName] = useState();
  const [orderCurrency, setOrderCurrency] = useState();
  const [open, setOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [declarationCheck, setDeclarationCheck] = useState(false);
  const [formData, setFormData] = useState({
    mat_logic_no: "",
    plant_name: "",
    plant_code:"",
    storage_location: "",
    sales_org: "",
    dist_channel: "",
    mat_short_desc: "",
    base_unit_measure: "",
    mat_long_desc: "",
    mat_group: "",
    division: "",
    mat_price_grp: "",
    purchase_grp: "",
    gr_proc_time: "",
    hsn_code: "",
    serial_no_profile: "",
    quality_insp_type: "",
    manufactured: "",
    mrp_type: "",
    approval: ""
  });

  const [storageLocationMapping, setStorageLocationMapping] = useState([]);


  function getStorageLocation(plant_name) {
    axios({
      method: "post",
      url: `${baseurl.base_url}/cvm/get-storage-location-mapping`,
      headers: {
        "Content-type": "application/json",
      },
      data: { plant_name: plant_name },
    })
      .then((res) => {
        console.log(res.data.data);
        setFormData({
          ...formData,
          plant_name  : plant_name,
          city: res.data.data.city,
          district: res.data.data.district,
          state_code: res.data.data.state
        });
        setError({ ...error, ["postal_code"]: true });
      })
      .catch((err) => {
        console.log(err);
        setFormData({
          ...formData,
          plant_name: plant_name,
          city: "",
          district: "",
        });
        console.log({ "invalid pincode": plant_name });
        setError({ ...error, ["postal_code"]: false });
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    //alert("All fields are valid!");
    setConfirmDialog(true);

  }

  useQuery("get-plant-name", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-plant-name`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        setPlantName(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  useQuery("get-country-codes", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-country-codes`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        setCountryCodes(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  useQuery("get-company-code", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-company-code`,
      header: {
        "Content-type": "application/JSON",
      },
    })
      .then((res) => {
        console.log(res);
        setCompanyCode(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  useQuery("get-pay-term", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-pay-term`,
      header: { Content: "application/JSON" },
    })
      .then((res) => {
        console.log(res);
        setPayTerm(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  useQuery("get-order-currency", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-order-currency`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setOrderCurrency(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  useQuery("get-pincode-mapping", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-pincode-mapping`,
      header: {
        "Content-type": "application/JSON",
      },
    })
      .then((res) => {
        console.log(res);
        setStorageLocationMapping(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  useEffect(() => {
    if (selectedCountry) {
      getState();
    }
  }, [selectedCountry]);

  function getState() {
    const data = {
      country: selectedCountry,
    };
    axios({
      method: "post",
      url: `${baseurl.base_url}/cvm/get-state-list`,
      header: {
        "Content-type": "application/JSON",
      },
      data,
    })
      .then((res) => {
        console.log(res);
        setStateList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [error, setError] = useState({
    co_person: true,
    vendor_name: true,
    vendor_name_op1: true,
    postal_code: true,
    city: true,
    mat_logic_no: true,
    /* ind_cust_num: true,
    local_cust_num: true,
    intl_cust_num: true, */
    gstin: true,
    pan: true,
    bank_acc_no: true,
    ifsc_code: true,
    name_on_acc: true,
    mobile_no: true,
    gr_proc_time: true,
    hsn_code: true,
  });

  const regexp = {
    co_person: /^([A-Z]|[a-z]| )+$/,
    vendor_name: /^([A-Z]|[a-z]| )+$/,
    name_on_acc: /^([A-Z]|[a-z]| )+$/,
    vendor_name_op1: /^([A-Z]|[a-z]| )+$/,
    mat_logic_no:/^[0-9]+$/,
    postal_code: /^[0-9]+$/,
    city: /^([A-Z]|[a-z]| )+$/,
    mobile_no: /^[0-9]{10}$/,
    gstin: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]([0-9]|[A-Z])Z([0-9]|[A-Z])$/,
    pan: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
    bank_acc_no: /^[0-9]+$/,
    ifsc_code: /^[A-Z]{4}0([A-Z]|[0-9]){6}$/,
    gr_proc_time: /^[0-9]{3}$/,
    hsn_code : /^[0-9]{6}$/,
  };

  function validCheck(name, value) {
    if (!regexp[name].test(value)) {
      setError({ ...error, [name]: false });
      return;
    }

    setError({ ...error, [name]: true });
  }
  return (
    <div className="content_main">
      <form onSubmit={handleSubmit} className="form-main">
        

        {/*         Material Logic Number */}

{/*         <div className="input-field-main customer_name">

        </div> */}

        <SlInput
            className="helptext"
            required
            pattern="^[0-9]+$"
            name="mat_logic_no"
            helpText={error.mat_logic_no == true ? "" : "wrong entry"}
            value={formData.mat_logic_no}
            maxlength={18}
            onSlInput={(e) => {
              validCheck(e.target.name, e.target.value);
              setFormData({ ...formData, mat_logic_no: e.target.value });
            }}
            label="Material Logic Number"
          />
        {/*         Plant DropDown List  */}

        <SlSelect
          required
          label="Plant Name"
          onSlChange={(e) => {
            setFormData({ ...formData, plant_name: e.target.value });
          }}
          onSlBlur={(e)=>{
            getStorageLocation(e.target.value);
          }}
        >
          {plantName?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.plant_name}>
                {item.plant_name}
              </SlMenuItem>
            );
          })}
        </SlSelect>

                {/*         Storage Location List  */}

                <SlSelect
          required
          label="Storage Location"
          onSlChange={(e) => {
            setFormData({ ...formData, storage_location: e.target.value });
          }}
        >
          {plantName?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.storage_location_desc}>
                {item.storage_location_desc}
              </SlMenuItem>
            );
          })}
        </SlSelect>

        {/*         Material Short Description */}

        <SlInput
          required
          value={formData.mat_short_desc}
          maxlength={40}
          onSlInput={(e) => {
            setFormData({ ...formData, district: e.target.value });
          }}
          label="Material Short Description"
        />

        {/*         GR Processing Time  */}

        <SlInput
          required
          value={formData.gr_proc_time}
          maxlength={3}
          pattern="^[0-9]{3}$"
          helpText={error.gr_proc_time == true ? "" : "wrong entry"}
          name="gr_proc_time"
          onSlInput={(e) => {
            setFormData({ ...formData, gr_proc_time: e.target.value });
          }}
          label="GR Processing Time"
        />

        {/*         HSN CODE */}

        <SlInput
          required
          value={formData.hsn_code}
          maxlength={6}
          pattern = "^[0-9]{6}$"
          helpText={error.hsn_code == true ? "" : "wrong entry"}
          name = "hsn_code"
          onSlInput={(e) => {
            setFormData({ ...formData, district: e.target.value });
          }}
          label="HSN Code"
        />



        <SlButton
          type="submit"
          variant="success"
          onClick={(e) => {
            console.log(formData);
            //setConfirmDialog(true);
            return
            const formDatas = new FormData();
            Object.keys(formData).forEach((key) =>
              formDatas.append(key, formData[key])
            );
            axios({
              method: "post",
              url: "${baseurl.base_url}/cvm/post-vendor-form-data",
              header: {
                "Content-type": "multipart/form-data",
              },
              data: formDatas,
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
            /* console.log(Object.keys(formData).toString());
              console.log(Object.values(formData).toString()); */
          }}
        >
          Continue
        </SlButton>

        {/*         // Upload Button */}

        <SlButton
          onclick={() => {
            setOpen(true);
          }}
        >
          Upload file
        </SlButton>
        <SlDialog
          label="Upload Files"
          open={open}
          onSlAfterHide={() => setOpen(false)}
        >
          <input
            style={{ marginBottom: "20px" }}
            type="file"
            name=""
            id=""
            onChange={(e) => {
              setFormData({ ...formData, blank_cheque: e.target.files[0] });
            }}
          />
          <input
            style={{ marginBottom: "20px" }}
            type="file"
            name=""
            id=""
            onChange={(e) => {
              setFormData({ ...formData, GST_Image: e.target.files[0] });
            }}
          />
          <input
            style={{ marginBottom: "20px" }}
            type="file"
            name=""
            id=""
            onChange={(e) => {
              setFormData({ ...formData, PAN_Image: e.target.files[0] });
            }}
          />
          {/*           <input
            style={{ marginBottom: "20px" }}
            type="file"
            name=""
            id=""
            onChange={(e) => {
              setFormData({ ...formData, declaration: e.target.files[0] });
            }}
          /> */}
          {/*           <input
            style={{ marginBottom: "20px" }}
            type="file"
            name=""
            id=""
            onChange={(e) => {
              setFormData({ ...formData, DAPF: e.target.files[0] });
            }}
          /> */}
          <SlButton
            style={{ marginRight: "20px" }}
            slot="footer"
            variant="success"
            onClick={() => setOpen(false)}
          >
            Upload
          </SlButton>
          <SlButton
            slot="footer"
            variant="danger"
            onClick={() => setOpen(false)}
          >
            Close
          </SlButton>
        </SlDialog>
      </form>
      <SlDialog
        label="Preview"
        open={confirmDialog}
        onSlAfterHide={() => setConfirmDialog(false)}
      >
        <div>
          <h4>Vendor Group: <span>{formData.vendor_group}</span></h4>
          <h4>Vendor Name: <span>{formData.vendor_name} {formData.vendor_name_op1}</span></h4>
          <h4>Vendor Address: <span>{formData.vendor_address} {formData.vendor_address_op1} {formData.vendor_address_op2} {formData.cust_address_op3}</span></h4>
          <h4>District: <span>{formData.district}</span></h4>
          <h4>City: <span>{formData.city}</span></h4>
          <h4>Postal Code: <span>{formData.postal_code}</span></h4>
          <h4>Country: <span>{formData.country}</span></h4>
          <h4>Region Code: <span>{formData.state_code}</span></h4>
          <h4>C/O Person: <span>{formData.co_person}</span></h4>
          <h4>Company Code: <span>{formData.company_code}</span></h4>
          <h4>Bank A/C No: <span>{formData.recon_acc}</span></h4>
          <h4>PayTerm: <span>{formData.pay_term}</span></h4>
          <h4>Mobile Number: <span>{formData.mobile_no}</span></h4>
          <h4>E-mail ID: <span>{formData.email_id}</span></h4>
          <h4>Company Code: <span>{formData.company_code}</span></h4>
          <h4>GSTIN: <span>{formData.gstin}</span></h4>
          <h4>PAN: <span>{formData.pan}</span></h4>
        </div>
        <SlCheckbox checked={declarationCheck} onSlChange={e => { setDeclarationCheck(e.target.checked) }}>
          I hereby confirm that the information entered is true to the best of
          my knowledge.
        </SlCheckbox>
        <SlButton
          slot="footer"
          variant="primary"
          disabled={!declarationCheck}
          onClick={() => {
            setConfirmDialog(false)
            const formDatas = new FormData();
            Object.keys(formData).forEach((key) =>
              formDatas.append(key, formData[key])
            );
            axios({
              method: "post",
              url: "${baseurl.base_url}/cvm/post-vendor-form-data",
              header: {
                "Content-type": "multipart/form-data",
              },
              data: formDatas,
            })
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Submit
        </SlButton>
      </SlDialog>
    </div>
  );
}

export default Form;
