import React from "react";
import Input from './components/common/forms/field'
import Button from './components/common/forms/button'
import axios from 'axios';
import "./App.css";
import { parse } from "@babel/core";


class App extends React.Component{
  state={
    selectFile:null,
    name:'',
    fileuploadlist:null,
  }


  
   handleSelectedFile = (e) =>{
    //var filebuffer=null;
    let files = e.target.files;

    var fileInfo=null;
var file = files[0];
    var reader = new FileReader();
    reader.onload = (evt) =>{
      // https://www.w3.org/TR/FileAPI/#dom-filereader-readystate
      if (evt.target.readyState == FileReader.DONE) {                    
          var arrayBuffer = evt.target.result;                    
           fileInfo = {
              "name": file.name,
              "content": this._arrayBufferToBase64(arrayBuffer)//,
              
          };
        

      }

      this.setState(
        {
          selectFile: fileInfo,
          name: fileInfo.name
        },
        () => console.log(this.state, "state")
      );
      
  }

  reader.readAsArrayBuffer(file);
    e.preventDefault();
  };

   _arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

  onSubmit = () => {
    console.log(this.state.selectFile);
    //formData.append("myFile", this.state.selectFile);
    //console.log(formData);
    return fetch("https://4dfbkq7d87.execute-api.us-east-2.amazonaws.com/Prod",{
        body:JSON.stringify(this.state.selectFile),
        method:"PUT",
        mode:"cors",
          headers: {
            "Access-Control-Allow-Origin":"*",
            "Content-type": "text/plain"
            
          }
        }
      )
      .then(function(response) {
        console.log(response);
        if (!response.ok) {
          throw Error(response.statusText);
        }
      })
      // .then(response=>{
      //   this.onfilelistsubmit();
      // })
      .catch(err=>{
        this.onfilelistsubmit();
        console.log(err)
      })
    }

    onfilelistsubmit=()=>{
      return fetch("https://4dfbkq7d87.execute-api.us-east-2.amazonaws.com/Prod",{
        method:"GET",
        mode:"cors",
          headers: {
            "Access-Control-Allow-Origin":"*",
            "Content-type": "application/json"
            
          }
        }
      )
      .then(response => {
        response.json().then(res => {
          console.log(res);
          this.setState({ fileuploadlist: res.body});
        });
        //var res= ndjsonStream(response.body).getReader().read();
        
        //return res.result;
    })
    

    }
    

      

  // onSubmitaxios = () => {
  //   console.log(this.state.selectFile);
  //  // formData.append("myFile", this.state.selectFile, this.state.name);
  //   axios
  //     .put(
  //       "https://regclv3878.execute-api.us-east-2.amazonaws.com/Prod",
  //       JSON.stringify(this.state.selectFile),        
  //       {
  //         mode:"cors",
  //         headers: {
  //           "Access-Control-Allow-Origin":"*",
  //           "Content-type": "application/json"
  //         }
  //       }
  //     )
  //     .then(res => {
  //       console.log(res, "resss");
  //     })
  //     .catch(err => console.log(err, "err"));
  // }

  onDownloadFile = (params) => {
      axios({
        url: `http://localhost:5000/domain/download/${params}`,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${params}`);
        document.body.appendChild(link);
        link.click();
      });
  }

  render(){
    var fileuploadlist=JSON.parse(this.state.fileuploadlist);
    return (
      <div className="App container">
        <h1>Upload Image</h1>
        <div class="input-group mb-3">
          <div class="custom-file">
            <Input
              type="file"
              name="upload_image"
              // class="custom-file-input"
              id="inputGroupFile01"
              labelclass="custom-file-label"
              single="single"
              label={this.state.name || "Choose File"}
              onChange={(e) => this.handleSelectedFile(e)}
            />
          </div>
          &nbsp;
          <Button
            buttonLabel="Upload Image"
            className="btn btn-outline-primary"
            onClick={this.onSubmit}
          />
          <Button
            buttonLabel="List Document"
            className="btn btn-outline-primary"
            onClick={this.onfilelistsubmit}
          />
        </div>
        <div className="table__container">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Document Name</th>
                <th scope="col">Uploaded At</th>
                <th scope="col">Download</th>
              </tr>
            </thead>
            <tbody>            
            {fileuploadlist && fileuploadlist.map((data, key) =>
              <tr>
                <td scope="col">{data.Name}</td>
                <td scope="col">{data.CreatedTimestamp}</td>
                <td scope="col"><button type="button" attr-tag={data.Id}>DownloadFile</button></td>
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default App;
