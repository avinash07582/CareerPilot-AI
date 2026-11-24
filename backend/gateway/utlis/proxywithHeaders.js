import proxy from "express-http-proxy"
// jab is auth user mila toh secrequst me usweer ata aor phir usko proxyReqOpts se haeder set kartg hai user id 


export const proxyWithHeaders = (serviceUrl)=>{
    return proxy (
        serviceUrl,
        {
            proxyReqOptDecorator:(proxyReqOpts ,srcReq)=>{
                if(srcReq.user){
                    proxyReqOpts.headers["x-user-id"] =srcReq.user.userId
                }
                return proxyReqOpts

            }
        }

    )
}