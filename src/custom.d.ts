type Fetch=(api:string, data:object)=>Promise<any>

type Data = {
    userName: string,
    password?: string
    code?: string
}