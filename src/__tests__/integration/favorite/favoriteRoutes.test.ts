import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"



describe('/favorite',()=>{
    let connection: DataSource

    beforeAll(async()=>{
        await AppDataSource.initialize().then((res) => {
            connection = res
        }).catch((err) => {
            console.error("Error during Data Source initialization", err)
        })
    })

    afterAll(async() => {
        await connection.destroy()
    })

    test("POST /favorite - should be able to create a favorite",async()=>{
        
    })
})