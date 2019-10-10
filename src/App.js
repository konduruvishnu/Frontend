import React from "react";
import Input from './components/common/forms/field'
import Button from './components/common/forms/button'
import axios from 'axios';
import "./App.css";

class App extends React.Component{
  state={
    selectFile:null,
    name:''
  }
  handleSelectedFile = (e) =>{
    e.preventDefault();
    this.setState(
      {
        selectFile: e.target.files[0],
        name: e.target.files[0].name
      },
      () => console.log(this.state, "state")
    );
  }

  onSubmit = () => {
    const formData = new FormData();
    formData.append("myFile", this.state.selectFile, this.state.name);
    axios
      .post(
        "https://8ageors5wj.execute-api.us-east-2.amazonaws.com/default/AWSLambda2",
        formData,
        {
          headers: {
            "Content-type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res, "resss");
      })
      .catch(err => console.log(err, "err"));
  }

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
              label={this.state.name || "Choose File"}
              onChange={this.handleSelectedFile}
            />
          </div>
          &nbsp;
          <Button
            buttonLabel="Upload Image"
            className="btn btn-outline-primary"
            onClick={this.onSubmit}
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
              <tr>
                <td scope="col">doc</td>
                <td scope="col">date</td>
                <td scope="col"><Button value="Download"/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
