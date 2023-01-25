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
  const [storageLocation, setStorageLocation] = useState();
  const [matSalesOrg, setMatSalesOrg] = useState();
  const [matDistChannel, setMatDistChannel] = useState();
  const [baseUnitMeasure, setBaseUnitMeasure] = useState()
  const [matGrp, setMatGrp] = useState()
  const [matDiv, setMatDiv] = useState()
  const [matPriceGrp, setMatPriceGrp] = useState()
  const [matPurchaseGrp, setMatPurchaseGrp] = useState()
  const [serialNoProfile, setSerialNoProfile] = useState()
  const [qualityInspType, setQualityInspType] = useState()
  const [matType, setMatType] = useState()
  const [valuationType, setValuationType] = useState()
  const [formData, setFormData] = useState({
    mat_logic_no: "",
    plant_name: "",
    plant_code: "",
    storage_location: "",
    mat_sales_org: "",
    mat_dist_channel: "",
    mat_short_desc: "",
    base_unit_measure: "",
    mat_long_desc: "",
    mat_grp: "",
    mat_div: "",
    mat_price_grp: "",
    mat_purchase_grp: "",
    gr_proc_time: "",
    hsn_code: "",
    serial_no_profile: "",
    quality_insp_type: "",
    manufactured: "",
    mat_type: "",
    valuation_type: "",
    approval: ""
  });

  function getStorageLocation(plant_name) {
    const data = {
      plant_name: plant_name
    };
    axios({
      method: "post",
      url: `${baseurl.base_url}/cvm/get-storage-location`,
      header: {
        "Content-type": "application/JSON",
      },
      data,
    })
      .then((res) => {
        console.log(res);
        setStorageLocation(res?.data?.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getValuationType(mat_type) {
    const data = {
      mat_type: mat_type
    }

    axios({
      method: "post",
      url: `${baseurl.base_url}/cvm/get-valuation-type`,
      header: {
        "Content-type": "application/JSON",
      },
      data,
    })
      .then((res) => {
        console.log(res);
        setValuationType(res?.data?.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleSubmit(event) {
    event.preventDefault();
    //alert("All fields are valid!");
    setConfirmDialog(true);

  }

  useQuery("get-mat-type", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-mat-type`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.data);
        setMatType(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  })
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
  useQuery("get-mat-sales-org", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-mat-sales-org`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setMatSalesOrg(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  useQuery("get-mat-dist-channel", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-mat-dist-channel`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setMatDistChannel(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  useQuery("get-base-unit-measure", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-base-unit-measure`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setBaseUnitMeasure(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  useQuery("get-mat-grp", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-mat-grp`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setMatGrp(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  useQuery("get-mat-div", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-mat-div`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setMatDiv(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  useQuery("get-mat-price-grp", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-mat-price-grp`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setMatPriceGrp(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  useQuery("get-mat-purchase-grp", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-mat-purchase-grp`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setMatPurchaseGrp(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  useQuery("get-serial-no-profile", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-serial-no-profile`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setSerialNoProfile(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  useQuery("get-quality-insp-type", () => {
    axios({
      method: "get",
      url: `${baseurl.base_url}/cvm/get-quality-insp-type`,
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        setQualityInspType(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  })



  const [error, setError] = useState({

    mat_logic_no: true,
    gr_proc_time: true,
    hsn_code: true,
  });

  const regexp = {
    mat_logic_no: /^[0-9]+$/,
    gr_proc_time: /^[0-9]{3}$/,
    hsn_code: /^[0-9]{6}$/,
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


        {/*         Material Type Mapping */}

        <SlSelect
          required
          label="Material Type"
          onSlChange={(e) => {
            setFormData({ ...formData, mat_type: e.target.value });
            getValuationType(e.target.value);
            console.log("change");
          }}
        >
          {matType?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.material_type}>
                {item.material_type}
              </SlMenuItem>
            );
          })}
        </SlSelect>

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
          {storageLocation?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.storage_location_desc}>
                {item.storage_location_desc}
              </SlMenuItem>
            );
          })}
        </SlSelect>

        {/*         Sales Organization Mapping */}

        <SlSelect
          required
          label="Sales Organization"
          onSlChange={(e) => {
            setFormData({ ...formData, mat_sales_org: e.target.value });
          }}
        >
          {matSalesOrg?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.mat_sales_org}>
                {item.mat_sales_org}
              </SlMenuItem>
            );
          })}
        </SlSelect>

        {/*           Material Distribution Channel */}

        <SlSelect
          required
          label="Distribution Channel"
          onSlChange={(e) => {
            setFormData({ ...formData, mat_dist_channel: e.target.value });
          }}
        >
          {matDistChannel?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.mat_dist_channel}>
                {item.mat_dist_channel}
              </SlMenuItem>
            );
          })}
        </SlSelect>

        {/*         Base Unit of Measure */}

        <SlSelect
          required
          label="Base Unit of Measure"
          onSlChange={(e) => {
            setFormData({ ...formData, base_unit_measure: e.target.value });
          }}
        >
          {baseUnitMeasure?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.base_unit_measure}>
                {item.base_unit_measure}
              </SlMenuItem>
            );
          })}
        </SlSelect>

        {/*         Material Group Mapping */}

        <SlSelect
          required
          label="Material Group"
          onSlChange={(e) => {
            setFormData({ ...formData, mat_grp: e.target.value });
          }}
        >
          {matGrp?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.mat_grp}>
                {item.mat_grp}
              </SlMenuItem>
            );
          })}
        </SlSelect>

        {/*         Material Division Group */}

        <SlSelect
          required
          label="Division"
          onSlChange={(e) => {
            setFormData({ ...formData, mat_div: e.target.value });
          }}
        >
          {matDiv?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.mat_div}>
                {item.mat_div}
              </SlMenuItem>
            );
          })}
        </SlSelect>

        {/*         Material Price Group Mapping */}

        <SlSelect
          required
          label="Material Price Group"
          onSlChange={(e) => {
            setFormData({ ...formData, mat_price_grp: e.target.value });
          }}
        >
          {matPriceGrp?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.mat_price_grp}>
                {item.mat_price_grp}
              </SlMenuItem>
            );
          })}
        </SlSelect>

        {/*         Purchase Group */}

        <SlSelect
          required
          label="Material Purchase Group"
          onSlChange={(e) => {
            setFormData({ ...formData, mat_purchase_grp: e.target.value });
          }}
        >
          {matPurchaseGrp?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.mat_purchase_grp}>
                {item.mat_purchase_grp}
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
            setFormData({ ...formData, mat_short_desc: e.target.value });
          }}
          label="Material Short Description"
        />

        {/*         Material Long Description */}

        <SlInput
          required
          value={formData.mat_long_desc}
          maxlength={1000}
          onSlInput={(e) => {
            setFormData({ ...formData, mat_long_desc: e.target.value });
          }}
          label="Material Long Description"
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
          pattern="^[0-9]{6}$"
          helpText={error.hsn_code == true ? "" : "wrong entry"}
          name="hsn_code"
          onSlInput={(e) => {
            setFormData({ ...formData, district: e.target.value });
          }}
          label="HSN Code"
        />

        {/*         Serial Number Profile */}
        <SlSelect
          required
          label="Serial Number Profile"
          onSlChange={(e) => {
            setFormData({ ...formData, serial_no_profile: e.target.value });
          }}
        >
          {serialNoProfile?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.serial_no_profile}>
                {item.serial_no_profile}
              </SlMenuItem>
            );
          })}
        </SlSelect>

        {/*         Quality Inspection Type */}
        <SlSelect
          required
          label="Quality Inspection Type"
          onSlChange={(e) => {
            setFormData({ ...formData, quality_insp_type: e.target.value });
          }}
        >
          {qualityInspType?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.quality_insp_type}>
                {item.quality_insp_type}
              </SlMenuItem>
            );
          })}
        </SlSelect>

        {/*         Valuation Type */}


        <SlSelect
          required
          label="Valuation Type/ Price Control"
          onSlChange={(e) => {
            setFormData({ ...formData, valuation_type: e.target.value });
          }}
        >
          {valuationType?.map((item, i) => {
            return (
              <SlMenuItem key={`cg${i}`} value={item.price_control_desc}>
                {item.price_control_desc}
              </SlMenuItem>
            );
          })}
        </SlSelect>






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
