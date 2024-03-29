import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import '../App.css'

const Account = () => {

    const [datas, setDatas] = useState([]);
    const [createData, setCreateData] = useState({
      domain:"",
      recordType:"",
      ipAddress:""
    });
  
    const [updateData, setUpdateData] = useState({
      id:null,
      domain:"",
      recordType:"",
      ipAddress:""
    })
    
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState(datas);
  const [noDataMessage, setNoDataMessage] = useState('');
  
    useEffect(() => {
  
    
  
      fetchDatas();
  
    }, []);
  
    const fetchDatas = () => {
      axios.get("/datas")
        .then(response => {
          
          setDatas(response.data);
          setFilterData(response.data);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    };
  
    const updateCreateDataField = (e) =>{
      const {name, value} = e.target;
      setCreateData({
        ...createData,
        [name]:value
      })
    }
  
  
    const createDataField = async (e) => {
      e.preventDefault();
      // Check if any of the fields are empty
      if (!createData.domain || !createData.recordType || !createData.ipAddress) {
        alert("Please fill in all fields");
        return; // Stop execution if any field is empty
      }
    
      try {
        // Create data
        const response = await axios.post("/datas", createData);
        fetchDatas();
        // Update datas state
        setDatas([...datas, response.data.data]);
        // Update filterData state
        setFilterData([...datas, response.data.data]);
        // Clear data fields
        setCreateData({ domain: "", recordType: "", ipAddress: "" });
      } catch (error) {
        console.error("Error creating data:", error);
      }
    };
    
  
    const handleUpdateFieldChange = (e) => {
      const {name, value}= e.target;
      setUpdateData({
        ...updateData,
        [name] : value
      })
    }
  
    const toggleUpdate = (data) => {
      // get the current data value
      // console.log(data)
      // set the update data
      setUpdateData({_id: data._id,domain: data.domain, recordType: data.recordType, ipAddress:data.ipAddress});
    }
  
  
    const deleteData = async (_id) => {
      try {
        await axios.delete(`/datas/${_id}`);
        // Fetch the latest data from the server
        fetchDatas();
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    };
    
    const updateFormData = async (e) => {
      e.preventDefault();
      const { domain, recordType, ipAddress } = updateData;
      try {
        const response = await axios.put(`/datas/${updateData._id}`, {
          domain,
          recordType,
          ipAddress,
        });
        // Fetch the latest data from the server
        fetchDatas();
        setUpdateData({ _id: null, domain: "", recordType: "", ipAddress: "" });
      } catch (error) {
        console.error("Error updating data:", error);
      }
    };
    
  
    const filterFunction = (item) => {
      
      return (
       item.domain.toLowerCase().includes(search.toLocaleLowerCase()) || 
       item.recordType.toLowerCase().includes(search.toLocaleLowerCase()) ||
       item.ipAddress.toLocaleLowerCase().includes(search.toLocaleLowerCase())
       );
   }
   
   const handleSubmit = (e) => {
     e.preventDefault();
     const filterItems = datas.filter(filterFunction);
     setFilterData(filterItems);
     setSearch("");
   
     if(filterItems.length === 0) {
       setNoDataMessage("No Data Found. Please verify your search");
     } else{
       setNoDataMessage("");
     }
   }


   return (
    <div className="App">

  <form onSubmit={handleSubmit} style={{display: "flex", justifyContent: "space-evenly"}} >
        <input
            className='form-control'
            type='text'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder='Search by Domain name, Record Type and IP Address....'
          />

          <button type='submit'  >Submit</button>
  </form>



      {datas.length > 0 && <table>
        <thead>
          <tr>
            <th>Domain</th>
            <th>Record Type</th>
            <th>IP Address/CNAME</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((data, index) => (
            <tr key={index}>
              {data && data.domain && <td>{data.domain}</td>}
              {data && data.recordType && <td>{data.recordType}</td>}
              {data && data.ipAddress && <td>{data.ipAddress}</td>}
              <td><button onClick={()=>toggleUpdate(data)} >update</button></td>
              <td><button onClick={()=>deleteData(data._id)} >delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>}

      {updateData._id && <div>
        <h3>update data</h3>
        <form onSubmit={updateFormData} >
          <input
          onChange={handleUpdateFieldChange}
          value={updateData.domain}
          name="domain"
          type="text"
          placeholder="Domain Name"
          />
          <input
          onChange={handleUpdateFieldChange}
          value={updateData.recordType}
          name="recordType"
          type="text"
          placeholder="Record Type"
          />
          <input
          onChange={handleUpdateFieldChange}
          value={updateData.ipAddress}
          name="ipAddress"
          type="text"
          placeholder="IP Address"
          />
          <button type="submit" >Update</button>
        </form>
      </div>}

     {!updateData._id && <div>
        <h3>Domains list</h3>
        <form onSubmit={createDataField}>
          <input
          onChange={updateCreateDataField}
          value={createData.domain}
          name="domain"
          type="text"
          placeholder="Domain Name"
          />
          <input
          onChange={updateCreateDataField}
          value={createData.recordType}
          name="recordType"
          type="text"
          placeholder="Record Type"
          />
          <input
          onChange={updateCreateDataField}
          value={createData.ipAddress}
          name="ipAddress"
          type="text"
          placeholder="IP Address"
          />
          <button type="submit" >Add</button>
        </form>
      </div> }

    </div>
  );
}

export default Account;
