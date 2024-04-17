const getServerSession = async()=>{
    const session= await getServerSession(
        request ,
        {
            ...response,
            getHeader: (name) => response.headers?.get(name),
            setHeader: (name, value) => response.headers?.set(name, value),
        } ,
        authConfig
    );
}
export default getServerSession