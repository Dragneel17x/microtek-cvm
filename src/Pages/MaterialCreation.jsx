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
          state_code: res.data.data.state
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
        >
          {plantName?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.plant_name}>
                {item.plant_name}
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
          label="material short description"
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
            setFormData({ ...formData, district: e.target.value });
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


        <div className="input-field-main customer_name">

          {/*District*/}

          {formData.vendor_group == "ZIRM - Vendor Import - Raw Material" ?
            ("") : formData.vendor_group == "ZIMN -  Vendor Import - Maintainence" ? ("") : (<SlInput
              required
              disabled={formData.country == "India" ? true : false}
              value={formData.district}
              onSlInput={(e) => {
                setFormData({ ...formData, district: e.target.value });
              }}
              label="District"
            />)}

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

          {formData.vendor_group == "ZIRM - Vendor Import - Raw Material" || formData.vendor_group == "ZIMN -  Vendor Import - Maintainence" ? (<SlSelect
            required
            disabled={false}
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
          </SlSelect>) : (<SlSelect
            required
            disabled={true}
            label="Select Country"
            value={"India"}
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
          </SlSelect>)}


          {/*                       State/Region Code */}

          {formData.vendor_group == "ZIRM - Vendor Import - Raw Material" ?
            ("") : formData.vendor_group == "ZIMN -  Vendor Import - Maintainence" ? ("") : (<SlSelect
              required
              disabled={true}
              label="Select Region/State Code"
              value={formData.state_code}
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
            </SlSelect>)}

          {/* {formData.cust_group !== "ZEXP - export customer" ? (
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
          )} */}
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

        <SlInput
          required={true}
          pattern="^[0-9]{10}$"
          className="helptext"
          name="mobile_no"
          helpText={error.mobile_no ? "" : "wrong entry"}
          maxlength={40}
          value={formData.mobile_no}
          label="Mobile Number"
          onSlInput={(e) => {
            validCheck(e.target.name, e.target.value);
            setFormData({ ...formData, mobile_no: e.target.value });
          }}
        />

        {/*            email ID */}

        {formData.vendor_group == "ZEMP - Employee Vendor " ? (
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

        {/*         Order Currency  */}

        {formData.vendor_group == "ZEMP - Employee Vendor " ? ("") : (
          <SlSelect
            required
            label="Order Currency"
            onSlChange={(e) => {
              setFormData({ ...formData, order_currency: e.target.value });
            }}
          >
            {orderCurrency?.map((item, i) => {
              return (
                <SlMenuItem key={`sl${i}`} value={item.order_currency}>
                  {item.order_currency}
                </SlMenuItem>
              )
            })

            }

          </SlSelect>)}


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

        {/*           Purchasing organisation mapping  */}

        <SlSelect
          required
          label="Purchasing Organization"
          onSlChange={(e) => {
            setFormData({ ...formData, purchasing_org: e.target.value });
          }}
        >
          <SlMenuItem value="1000 - MIPL">1000 - MIPL</SlMenuItem>
          <SlMenuItem value="1001 - Ref-MIPL">1001 - Ref-MIPL</SlMenuItem>
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
          pattern="^[0-9]$"
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
          pattern="^[A-Z]{4}0([A-Z]|[0-9]){6}$"
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
          pattern="^([A-Z]|[a-z]| )+$"
          className="helptext"
          name=""
          value={formData.name_on_acc}
          maxlength={40}
          label="name on account"
          helpText={error.name_on_acc ? "" : "Wrong Entry"}
          onSlInput={(e) => {
            validCheck(e.target.name, e.target.value);
            setFormData({ ...formData, name_on_acc: e.target.value });
          }}
        />



        {/*           GSTIN input */}

        {formData.vendor_group == "ZEMP - Employee Vendor " ? (
          ""
        ) : formData.vendor_group == "ZIMN -  Vendor Import - Maintainence" ? (
          ""
        ) : formData.vendor_group == "ZIRM - Vendor Import - Raw Material" ? ("") : (
          <SlInput
            label="GSTIN"
            pattern="^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]([0-9]|[A-Z])Z[0-9]$"
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

        {formData.vendor_group == "ZIMN -  Vendor Import - Maintainence" ? (
          ""
        ) : formData.vendor_group == "ZIRM - Vendor Import - Raw Material" ? ("") : (
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

        )}


        {/*         Withholding Tax Input */}

        {formData.vendor_group == "ZDSR - Vendor Domestic - Service " ? (<SlInput
          label="Withholding Tax"
          required={false}
          className="helptext"
          name="witholding tax"
          value={formData.witholding_tax}
          onSlInput={(e) => {
            validCheck(e.target.name, e.target.value);
            setFormData({ ...formData, witholding_tax: e.target.value });
          }}
        />) : ("")}





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
