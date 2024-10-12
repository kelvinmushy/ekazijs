import React from "react";
import Layout from "../../components/Layout";
import UserLogin from "../../components/Auth/UserLogin";
const Login=()=>{

    return(
        <Layout>
            <div className="mb-5 mt-5">
            <UserLogin/>
            </div>
        </Layout>
    )

    
}

export default Login;