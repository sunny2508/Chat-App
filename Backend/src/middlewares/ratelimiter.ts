import {ipKeyGenerator, rateLimit} from "express-rate-limit"
import type { Request } from "express"

const useRateLimit = rateLimit({
    windowMs:60*1000, //1min
    limit:30,
    keyGenerator:(req:Request)=>{
        if(req.user?._id)
        {
            return req.user._id.toString()
        }

        const ip=
            req.ip??
            req.socket.remoteAddress??
            "0.0.0.0"
        

        return ipKeyGenerator(ip)
    },
    standardHeaders:true,
    legacyHeaders:false
})

export default useRateLimit;