import React from "react";
import Input from './components/common/forms/field'
import Button from './components/common/forms/button'
import "./App.css";

function App() {
  return (
    <div className="App container">
      <h1>Upload Image</h1>
      <div class="input-group mb-3">
        <div class="custom-file">
          <Input
            type="file"
            name="upload_image"
            class="custom-file-input"
            id="inputGroupFile01"
            labelclass="custom-file-label"
            label="Choose File"
          />
        </div>
        &nbsp;
        <Button
          buttonLabel="Upload Image"
          className="btn btn-outline-primary"
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
            <tr className="text-center">
              <td colspan="4">No Result</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
