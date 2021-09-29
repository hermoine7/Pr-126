
import React from 'react';
import {View,Text,Button,Image,Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class CameraP extends React.Component{

    state = {image:null}
    getPer=async()=>{
        if(Platform.OS != 'web'){
            const{status}=await Permissions.askAsync(Permissions.CAMERA_ROLL)
            if(status != 'granted'){
                alert('Camera Permission not given')
            }
        }
    }
    pickImage=async()=>{
        try{
            let result=await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect:[4,3],
                quality:1
            })
            if(!result.cancelled){
                this.setState({image:result.data})
                this.uploadImage(result.uri)
            }
        }
        catch(E){
            console.log(E)
        }
    }
    uploadImage=async(uri)=>{
        const data=new FormData();
        let fileName=uri.split("/")[uri.split("/").lenght-1]
        let type = "image/${fname.split('.') [uri.split('.').length-1]}"
        const fileToUpload = {
            uri:uri,
            name:fileName,
            type:type
        }
        data.append('digit', fileToUpload);
        fetch('https://548d65985c56.ngrok.io/predict-digit',{
            method:'POST',
            body: data,
            headers:{'content-type':'multipart/form-data'}
        })
        .then((response)=>response.json())
        .then((result)=>{console.log('Success: ', result)})
        .catch((error)=>{console.error('Error: ', error)})
    }

    render(){
        let{image}=this.state
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <Button title='pick a picture' onPress={this.pickImage} />
            </View>
        )
    }

}
