const axios = require('axios');

exports.getPics = async (req, res) => {
    const { id } = req.params;
    try{
        const response = await axios.get(`https://www.instagram.com/${id}/?__a=1`);
        console.log("response.data",response.data);
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