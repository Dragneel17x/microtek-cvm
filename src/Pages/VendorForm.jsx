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

function Form() {
  const [countryCodes, setCountryCodes] = useState();
  const [stateList, setStateList] = useState();
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [companyCode, setCompanyCode] = useState();
  const [payTerm, setPayTerm] = useState();
  const [vendorGrp, setVendorGrp] = useState();
  const [open, setOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [declarationCheck, setDeclarationCheck] = useState(false);
  const [formData, setFormData] = useState({
    vendor_group: "",
    vendor_name_op1: "",
    vendor_name: "",
    vendor_address: "",
    vendor_address_op1: "",
    vendor_address_op2: "",
    vendor_address_op3: "",
    district: "",
    state_code: "",
    city: "",
    postal_code: "",
    country: "India",
    company_code: "",
    co_person: "",
    mobile_no: "",
    email_id: "",
    company_code: "",
    bank_acc_no: "",
    name_on_acc: "",
    pay_term: "",
    gstin: "",
    pan: "",
    ifsc_code:"",
    witholding_tax:""
    //employee_id: "57055",
/*     blank_cheque: "",
    GST_Image: "",
    PAN_Image: "",
    declaration: "",
    DAPF: "", */
  });

  const [pincodeMapping, setPincodeMapping] = useState([]);


  function getPincodeDetails(pincode) {
    axios({
      method: "post",
      url: `${baseurl.base_url}/cvm/get-pincode-data`,
      headers: {
        "Content-type": "application/json",
      },
      data: { pincode: pincode },
    })
      .then((res) => {
        console.log(res.data.data);
        setFormData({
          ...formData,
          postal_code: pincode,
          city: res.data.data.city,
          district: res.data.data.district,
        });
        setError({ ...error, ["postal_code"]: true });
      })
      .catch((err) => {
        console.log(err);
        setFormData({
          ...formData,
          postal_code: pincode,
          city: "",
          district: "",
        });
        console.log({ "invalid pincode": pincode });
        setError({ ...error, ["postal_code"]: false });
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    //alert("All fields are valid!");
    setConfirmDialog(true);
  }

  useQuery("get-vendor-grp", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-vendor-grp`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.data.data);
        setVendorGrp(res.data.data);
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
  useQuery("get-bank-acc-no", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-bank-acc-no`,
      header: { Content: "application/JSON" },
    })
      .then((res) => {
        console.log(res);
        //setReconAcc(res.data.data);
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
        setPincodeMapping(res.data.data);
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
    /* ind_cust_num: true,
    local_cust_num: true,
    intl_cust_num: true, */
    gstin: true,
    pan: true,
    bank_acc_no: true,
    ifsc_code: true
  });

  const regexp = {
    co_person: /^([A-Z]|[a-z]| )+$/,
    vendor_name: /^([A-Z]|[a-z]| )+$/,
    name_on_acc: /^([A-Z]|[a-z]| )+$/,
    vendor_name_op1: /^([A-Z]|[a-z]| )+$/,
    postal_code: /^[0-9]+$/,
    city: /^([A-Z]|[a-z]| )+$/,
 /*    ind_cust_num: /^[0-9]{10}$/,
    local_cust_num: /^[0-9]{10}$/,
    intl_cust_num: /^[0-9]+$/, */
    gstin: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]([0-9]|[A-Z])Z[0-9]$/,
    pan: /^[A-Z]{5}[0-9]{4}[A-Z]$/,

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
        {/*         Vendor Group Mapping */}
        <SlSelect
          required
          label="Select Vendor Group"
          onSlChange={(e) => {
            setFormData({ ...formData, vendor_group: e.target.value });
          }}
        >
          {vendorGrp?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.customer_group}>
                {item.customer_group}
              </SlMenuItem>
            );
          })}
        </SlSelect>

        {/*         Vendor NAME */}

        <div className="input-field-main vendor_name">
          <SlInput
            className="helptext"
            required
            pattern="^([A-Z]|[a-z]| )+$"
            name="vendor_name"
            helpText={error.vendor_name ? "" : "wrong entry"}
            value={formData.vendor_name}
            maxlength={40}
            onSlInput={(e) => {
              validCheck(e.target.name, e.target.value);
              setFormData({ ...formData, vendor_name: e.target.value });
            }}
            label="Vendor Name"
          />
          <SlInput
            maxlength={40}
            className="helptext"
            pattern="^([A-Z]|[a-z]| )+$"
            name="vendor_name_op1"
            helpText={error.vendor_name_op1 ? "" : "wrong entry"}
            value={formData.vendor_name_op1}
            onSlInput={(e) => {
              validCheck(e.target.name, e.target.value);
              setFormData({ ...formData, vendor_name_op1: e.target.value });
            }}
            label="Vendor Name Optional"
          />
        </div>

        <div className="input-field-main vendor_name">
          <SlInput
            required
            onSlInput={(e) => {
              setFormData({ ...formData, vendor_address: e.target.value });
            }}
            label="Vendor Address"
          />
          <SlInput
            onSlInput={(e) => {
              setFormData({ ...formData, vendor_address_op1: e.target.value });
            }}
            label="Address Optional 1"
          />
          <SlInput
            onSlInput={(e) => {
              setFormData({ ...formData, vendor_address_op2: e.target.value });
            }}
            label="Address optional 2"
          />
          <SlInput
            onSlInput={(e) => {
              setFormData({ ...formData, vendor_address_op3: e.target.value });
            }}
            label="Address optional 3"
          />

          {/*District*/}
          <SlInput
            required
            disabled={formData.country == "India" ? true : false}
            value={formData.district}
            onSlInput={(e) => {
              setFormData({ ...formData, district: e.target.value });
            }}
            label="District"
          />

          {/*City*/}
          <SlInput
            className="helptext"
            required
            disabled={formData.country == "India" ? true : false}
            name="city"
            helpText={error.city == true ? "" : "wrong entry"}
            value={formData.city}
            onSlInput={(e) => {
              validCheck(e.target.name, e.target.value);
              setFormData({ ...formData, city: e.target.value });
            }}
            label="City"
          />

          {/*Postal Code*/}
          <SlInput
            className="helptext"
            pattern="^[0-9]+$"
            name="postal_code"
            required
            helpText={error.postal_code == true ? "" : "wrong entry"}
            value={formData.postal_code}
            onSlBlur={(e) => {
              getPincodeDetails(e.target.value);
            }}
            onSlInput={(e) => {
              validCheck(e.target.name, e.target.value);
              setFormData({ ...formData, postal_code: e.target.value });
              //getPincodeDetails(e.target.value)
              /* let pinData = pincodeMapping.filter(item=>{return(item.pincode == e.target.value)}) */

              /* if(pinData?.length){
                setFormData({ ...formData, postal_code: e.target.value, city: pinData[0].city, district: pinData[0].district });
                return
              }
              else{
                setFormData({ ...formData, postal_code: e.target.value, city: "", district: "" });
                console.log({"invalid pincode" : e.target.value});
                setError({ ...error, [e.target.name]: false });
              } */
            }}
            label="Postal Code"
          />
          {/*           Country */}

          {countryCodes ? (
            <SlSelect
              required
              label="Select Country"
              value={formData.country}
              onSlInput={(e) => {
                setSelectedCountry(e.target.value);
                setFormData({ ...formData, country: e.target.value });
              }}
            >
              {countryCodes?.map((item, i) => {
                return (
                  <SlMenuItem key={`${i}c`} value={item.country}>
                    {item.country}
                  </SlMenuItem>
                );
              })}
            </SlSelect>
          ) : (
            ""
          )}

          {/*                       State/Region Code */}

          {formData.cust_group !== "ZEXP - export customer" ? (
            <SlSelect
              required
              label="Select Region/State Code"
              onSlChange={(e) => {
                setFormData({ ...formData, state_code: e.target.value });
              }}
            >
              {stateList?.map((item, i) => {
                return (
                  <SlMenuItem key={`sl${i}`} value={item.state}>
                    {item.state}
                  </SlMenuItem>
                );
              })}
            </SlSelect>
          ) : (
            ""
          )}
        </div>

        {/*C/O Person*/}
        <SlInput
          className="helptext"
          name="co_person"
          required
          pattern="^([A-Z]|[a-z]| )+$"
          helpText={error.co_person == true ? "" : "wrong entry"}
          value={formData.co_person}
          onSlInput={(e) => {
            validCheck(e.target.name, e.target.value);
            setFormData({ ...formData, co_person: e.target.value });
          }}
          label="C/O Person"
        />

        {/*         Mobile Number  */}


        {formData.cust_group == "ZINC - individual customer" ? (
          <SlInput
            required={false}
            pattern="^[0-9]{10}$"
            className="helptext"
            name="ind_cust_num"
            value={formData.mobile_no}
            maxlength={40}
            label="Mobile Number"
            helpText={error.ind_cust_num ? "" : "Wrong Entry"}
            onSlInput={(e) => {
              validCheck(e.target.name, e.target.value);
              setFormData({ ...formData, mobile_no: e.target.value });
            }}
          />
        ) : formData.cust_group == "ZEXP - export customer" ? (
          <SlInput
            required={true}
            maxlength={40}
            name="intl_cust_num"
            className="helptext"
            helpText={error.intl_cust_num ? " " : "wrong entry"}
            pattern="^[0-9]+$"
            value={formData.mobile_no}
            label="Mobile Number"
            onSlInput={(e) => {
              validCheck(e.target.name, e.target.value);
              setFormData({ ...formData, mobile_no: e.target.value });
            }}
          />
        ) : (
          <SlInput
            required={true}
            pattern="^[0-9]{10}$"
            className="helptext"
            name="ind_cust_num"
            helpText={error.ind_cust_num ? "" : "wrong entry"}
            maxlength={40}
            value={formData.mobile_no}
            label="Mobile Number"
            onSlInput={(e) => {
              validCheck(e.target.name, e.target.value);
              setFormData({ ...formData, mobile_no: e.target.value });
            }}
          />
        )}

        {/*            email ID */}

        {formData.cust_group == "ZINC - individual customer" ? (
          <SlInput
            required={false}
            type="email"
            label="E-Mail ID"
            onSlInput={(e) => {
              setFormData({ ...formData, email_id: e.target.value });
            }}
          />
        ) : (
          <SlInput
            required={true}
            type="email"
            label="E-Mail ID"
            onSlInput={(e) => {
              setFormData({ ...formData, email_id: e.target.value });
            }}
          />
        )}

        {/*         Order Currency  */  }




        {/*                 Company Code Mapping */}

        <SlSelect
          required
          label="Company Code"
          onSlChange={(e) => {
            setFormData({ ...formData, company_code: e.target.value });
          }}
        >
          {companyCode?.map((item, i) => {
            return (
              <SlMenuItem key={`cc${i}`} value={item.company_code}>
                {item.company_code}
              </SlMenuItem>
            );
          })}
        </SlSelect>

         {/*             Pay Term Mapping */}

         <SlSelect
          required
          label="Pay Term"
          onSlChange={(e) => {
            setFormData({ ...formData, pay_term: e.target.value });
          }}
        >
          {payTerm?.map((item, i) => {
            return (
              <SlMenuItem key={`pt${i}`} value={item.pay_term}>
                {item.pay_term}
              </SlMenuItem>
            );
          })}
        </SlSelect>


        {/*          Bank Account Number mapping */}

        <SlInput
            required={false}
            pattern="^[0-9]{10}$"
            className="helptext"
            name=""
            value={formData.bank_acc_no}
            maxlength={40}
            label="Bank Account No"
            helpText={error.bank_acc_no ? "" : "Wrong Entry"}
            onSlInput={(e) => {
              validCheck(e.target.name, e.target.value);
              setFormData({ ...formData, bank_acc_no: e.target.value });
            }}
          />

       
        {/*         IFSC Code Input */}

        <SlInput
            required={false}
            pattern="^[0-9]{10}$"
            className="helptext"
            name=""
            value={formData.bank_acc_no}
            maxlength={40}
            label="IFSC Code"
            helpText={error.ifsc_code ? "" : "Wrong Entry"}
            onSlInput={(e) => {
              validCheck(e.target.name, e.target.value);
              setFormData({ ...formData, ifsc_code: e.target.value });
            }}
          />

        {/*           Name on Account */}
        
        <SlInput
            required={false}
            pattern="^[0-9]{10}$"
            className="helptext"
            name=""
            value={formData.name_on_acc}
            maxlength={40}
            label="IFSC Code"
            helpText={error.name_on_acc ? "" : "Wrong Entry"}
            onSlInput={(e) => {
              validCheck(e.target.name, e.target.value);
              setFormData({ ...formData, name_on_acc: e.target.value });
            }}
          />
   


        {/*           GSTIN input */}

        {formData.cust_group == "ZEXP - export customer" ? (
          ""
        ) : formData.cust_group == "ZINC - individual customer" ? (
          <SlInput
            label="GSTIN"
            pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]([0-9]|[A-Z])Z[0-9]$"
            className="helptext"
            name="gstin"
            helpText={error.gstin ? "" : "wrong Entry"}
            value={formData.gstin}
            onSlInput={(e) => {
              validCheck(e.target.name, e.target.value);
              setFormData({ ...formData, gstin: e.target.value });
            }}
          />
        ) : (
          <SlInput
            label="GSTIN"
            required
            className="helptext"
            name="gstin"
            helpText={error.gstin ? "" : "wrong Entry"}
            value={formData.gstin}
            onSlInput={(e) => {
              validCheck(e.target.name, e.target.value);
              setFormData({ ...formData, gstin: e.target.value });
            }}
          />
        )}

        {/*           PAN Number */}
        {formData.cust_group == "ZEXP - export customer" ? (
          ""
        ) : formData.cust_group != "ZINC - individual customer" ? (
          <SlInput
            label="PAN Number"
            required={true}
            className="helptext"
            name="pan"
            value={formData.pan}
            helpText={error.pan ? "" : "Wrong Entry"}
            pattern="^[A-Z]{5}[0-9]{4}[A-Z]$"
            onSlInput={(e) => {
              validCheck(e.target.name, e.target.value);
              setFormData({ ...formData, pan: e.target.value });
            }}
          />
        ) : (
          <SlInput
            label="PAN Number"
            required={false}
            className="helptext"
            name="pan"
            helpText={error.pan ? "" : "Wrong Entry"}
            pattern="^[A-Z]{5}[0-9]{4}[A-Z]$"
            value={formData.pan}
            onSlInput={(e) => {
              validCheck(e.target.name, e.target.value);
              setFormData({ ...formData, pan: e.target.value });
            }}
          />
        )}

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
              url: "${baseurl.base_url}/cvm/post-form-data",
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
          <input
            style={{ marginBottom: "20px" }}
            type="file"
            name=""
            id=""
            onChange={(e) => {
              setFormData({ ...formData, declaration: e.target.files[0] });
            }}
          />
          <input
            style={{ marginBottom: "20px" }}
            type="file"
            name=""
            id=""
            onChange={(e) => {
              setFormData({ ...formData, DAPF: e.target.files[0] });
            }}
          />
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
        <SlCheckbox checked={declarationCheck} onSlChange={e=>{setDeclarationCheck(e.target.checked)}}>
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
              url: "${baseurl.base_url}/cvm/post-form-data",
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
