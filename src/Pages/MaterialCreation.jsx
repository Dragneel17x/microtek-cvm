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
import { toast } from "react-toastify";


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
    approval: "",
    employee_id : localStorage.getItem("employee_id")
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
        console.log(res.data);
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
    mat_logic_no: /^[0-9]{18}$/,
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
      <form onSubmit={handleSubmit} >


      <div className="form-main">
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
              <SlMenuItem key={`cg${i}`} value={item.mat_desc}>
                {item.mat_desc}
              </SlMenuItem>
            );
          })}
        </SlSelect>

        {/*         Material Logic Number */}

        {/*         <div className="input-field-main customer_name">

        </div> */}

        {formData.mat_type == 'ZPOP - Promotional Material ' || formData.mat_type == 'ZCON - Cosnumables Material ' || formData.mat_type == 'ZSPR - Spares Material ' || formData.mat_type == 'ZTND - Tools and Dies Material ' || formData.mat_type == 'ZMIS - Miscellaneous Material' || formData.mat_type == 'ZPKG - Packaging Material' ? ("") : (


          <SlInput
            className="helptext"
            required
            pattern="^[0-9]{18}$"
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
        )}

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
          className="helptext"
          value={formData.gr_proc_time}
          maxlength={3}
          pattern="^[0-9]{3}$"
          helpText={error.gr_proc_time == true ? "" : "wrong entry"}
          name="gr_proc_time"
          onSlInput={(e) => {
            validCheck(e.target.name, e.target.value)
            setFormData({ ...formData, gr_proc_time: e.target.value });
          }}
          label="GR Processing Time"
        />

        {/*         HSN CODE */}

        <SlInput
          required
          value={formData.hsn_code}
          className="helptext"
          maxlength={6}
          pattern="^[0-9]{6}$"
          helpText={error.hsn_code == true ? "" : "wrong entry"}
          name="hsn_code"
          onSlInput={(e) => {
            validCheck(e.target.name, e.target.value);
            setFormData({ ...formData, hsn_code: e.target.value });
          }}
          label="HSN Code"
        />

        {/*         Serial Number Profile */}

        {formData.mat_type == 'ZHLC - FG Health care Solutions' || formData.mat_type == 'ZPSD - FG Power Solutions ' || formData.mat_type == 'ZESD - FG Electrical Solutions'?
        (        <SlSelect
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
        </SlSelect>):("")}


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


      </div>

      




        <SlButton
          type="submit"
          className="customer-submit-button"
          variant="success"
          onClick={(e) => {
            console.log(formData);
            return
            //setConfirmDialog(true
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
              data: formData,
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

{/*         <SlButton
          onclick={() => {
            setOpen(true);
          }}
        >
          Upload file
        </SlButton> */}
{/*         <SlDialog
          label="Upload Files"
          open={open}
          onSlAfterHide={() => setOpen(false)}
        > */}
          {/* <input
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
          /> */}

{/*           <SlButton
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
          </SlButton> */}
 {/*        </SlDialog> */}
      </form>
      <SlDialog
        label="Preview"
        open={confirmDialog}
        onSlAfterHide={() => setConfirmDialog(false)}
      >
        <div>
        <div className="customer-form-data">
							<div className="cutomer-form-data-inner">
								<h4>Material Type:</h4>
								<span>{formData.mat_type}</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Material Logic Number: </h4>
								<span>
                {formData.mat_logic_no}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Plant Name: </h4>
								<span>
                {formData.plant_name}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Storage Location: </h4>
								<span>
                {formData.storage_location}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Sales Organization: </h4>
								<span>
                {formData.mat_sales_org}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Distribution Channel: </h4>
								<span>
                {formData.mat_dist_channel}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Material Short Description: </h4>
								<span>
                {formData.mat_short_desc}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Material Long Description: </h4>
								<span>
                {formData.mat_long_desc}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Material Division: </h4>
								<span>
                {formData.mat_div}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Material Price Group: </h4>
								<span>
                {formData.mat_price_grp}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Base Unit of Measure: </h4>
								<span>
                {formData.base_unit_measure}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Purchasing Group: </h4>
								<span>
                {formData.mat_purchase_grp}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>HSN Code: </h4>
								<span>
                {formData.hsn_code}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>GR Processing Time:</h4>
								<span>
                {formData.gr_proc_time}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Serial Number Profile:</h4>
								<span>
                {formData.serial_no_profile}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Quality Inspection Type:</h4>
								<span>
                {formData.quality_insp_type}
								</span>
							</div>
							<div className="cutomer-form-data-inner">
								<h4>Valuation Type/Price Control"</h4>
								<span>
                {formData.price_control_desc}
								</span>
							</div>
            </div>
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
            console.log(formData);
/*             setConfirmDialog(false)
            const formDatas = new FormData();
            Object.keys(formData).forEach((key) =>
              formDatas.append(key, formData[key])
            ); */
            axios({
              method: "post",
              url: `${baseurl.base_url}/cvm/post-material-form-data`,
              header: {
                "Content-type": "application/JSON",
              },
              data: formData,
            })
              .then((res) => {
                toast.success("Form Submitted Successfully")
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
                if (err?.response?.data?.message) {
                  toast.error(err?.response?.data?.message)
                }
                else {
                  toast.error("Some Un-Expected Error Occured \n Please Try After Some Time");
                }
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
