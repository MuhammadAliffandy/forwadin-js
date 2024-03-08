// const getServerSession = async()=>{
//     const session: any = await getServerSession(
//         request as unknown as NextApiRequest,
//         {
//             ...response,
//             getHeader: (name: string) => response.headers?.get(name),
//             setHeader: (name: string, value: string) => response.headers?.set(name, value),
//         } as unknown as NextApiResponse,
//         authConfig
//     );
// }
// export default getServerSession