import React, { useState } from "react";
import axios from 'axios';

export default function UploadPhotos(props) {
    const [selectedFile, setSelectedFile] = useState("");
    const [tags, setTags] = useState("");
    // const apigClientFactory = require('aws-api-gateway-client').default;
    // const config = {invokeUrl:'https://8n1ydxze30.execute-api.us-east-1.amazonaws.com/dev', 'x-api-key':'8DIcTGBK2o3K8XVJKt5MPvSaZW0E3WA6cuzBgp57'}
    // var apigClient = apigClientFactory.newClient(config);

    //TODO: add logic here to validate and upload file, and also take tags
    const onFileUpload = async (e) => {
        e.preventDefault();
        let split = tags.split(",")
        console.log(split)
        console.log(selectedFile);

        
        // var len = selectedFile.length;
        // console.log('file len' + len);

        // var pathParams = {folder: 'ccbd-hw2-photos', object: selectedFile.name}; 
        // var additionalParams = {
        //     headers: {'Content-Type': 'image/jpeg' },
        // };
        // apigClient.invokeApi(pathParams, '/upload/{folder}/{object}', 'PUT', additionalParams, selectedFile)
        //     .then(function(result){
        //         console.log(result);
        //     });
        
        var url = `https://8n1ydxze30.execute-api.us-east-1.amazonaws.com/dev/upload/ccbd-hw2-photos-cf/${selectedFile.name}`

        axios.put(url, selectedFile, {
            headers: {
                'Content-Type': 'image/jpeg',
                'x-api-key': 'abcdefg123456665ffghsdghfgdhfgdh4565',
                'x-amz-meta-customLabels' : split
            }
        }).then(function(result){
            console.log(result);
        })
        
            
        // var additionalParams = {
        //     queryParams: {'q': 'cat'},
        // };
        // apigClient.invokeApi({}, '/search', 'GET', additionalParams, {})
        // .then(function(result){
        //     console.log(result);
        // });
        
    };

    return (
        <>
            <form className="form" onSubmit={onFileUpload}>
                <input type="file" className="input" onChange={(e) => setSelectedFile(e.target.files[0])} />
                <input
                    type="text"
                    name="tags"
                    className="input"
                    placeholder={`Tags seperated by commas`}
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <button className="button"> Upload File</button>
            </form>
        </>
    );
}