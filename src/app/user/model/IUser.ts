import { EmailValidator } from "@angular/forms"
import { IRole } from "src/app/role/model/IRole"

export interface IUser
{
  name: string, 
  description: string,
  role:IRole,
  email:EmailValidator,
  number:number,
  password:number,
  id:string
}