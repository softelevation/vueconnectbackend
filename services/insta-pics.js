const axios = require('axios');
const profiles = require('../models').profiles;
const fs = require("fs");
var appRoot = require('app-root-path');

exports.getPics = async (req, res) => {
    const { id } = req.params;
    try{

        const instaId=(id+'').replace('@','')
        const existingProfile = await profiles.findOne({ where: { instaId } });

        fs.createWriteStream(appRoot+'/static/'+iId+'.jpg')
        const path = appRoot+'/static/'+iId+'.jpg';
        fs.existsSync( path )
        
        const response = await axios.get(`https://www.instagram.com/${instaId}/?__a=1`);
        const picUrl=response.data['graphql']['user']['profile_pic_url_hd'] 
        const fileRes= await axios({
                                    url:picUrl,
                                    method: 'GET',
                                    responseType: 'stream'});
        fileRes.data.pipe(res);
    }catch(e){
        console.log("error",e);
        res.send(e);
    }
}


exports.save = async (req, res) => {
    let { fullName,instaId,twitter,email } = req.body;
    try{
        instaId=(instaId+'').replace('@','')
       /* const response = await axios.get(`https://www.instagram.com/${iId}/?__a=1`);
        const picUrl=response.data['graphql']['user']['profile_pic_url_hd'] 
        const pic= await axios({
                                    url:picUrl,
                                    method: 'GET',
                                    responseType: 'stream'});
        
        pic.data.pipe(fs.createWriteStream(appRoot+'/static/'+iId+'.jpg'));*/

        const existingProfile = await profiles.findOne({ where: { instaId } });

        if(existingProfile==null){
            const result= await profiles.create({
                fullName,
                instaId,
                twitter,
                email
            })
            res.status(200).send(result);
        }else{
            await profiles.update({
                fullName,
                twitter,
                email
            },{ where: { instaId } })
            const result= await profiles.findOne({ where: { instaId } });
            res.status(200).send(result);
        }
    }catch(e){
        console.log("error",e);
        res.status(500).send(e);
    }
   
}


exports.getAll = async (req, res) => {
    try{
        const result= await profiles.findAll();
        res.status(200).send(result);
    }catch(e){
        console.log("error",e);
        res.status(500).send(e);
    }
   
}