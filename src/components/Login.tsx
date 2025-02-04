function Login(){
    return(
        <>
        <div className="full-page-centered flex-col">
            <h1 className="h1-custom mb-5">Login</h1>
            <form  action="" className="flex flex-col gap-5 mt-4">
                <input type="text" placeholder="Username" />
                <input type="text" placeholder="Password" />
                <button className="box-shadow-black bg-white rounded-sm p-2">LOGIN</button>
            </form>
        </div>
        </>
    )
}

export default Login;