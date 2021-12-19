declare module 'idCard' {
  export interface IdCardInfo {
    idCard: string
    relation: string
    age: number
    name: string
    sex: string
    birthday: string
    mobile: string
  }

  export interface IdCardInput {
    age: number
    sex: string
    areaCode: string
    birthday: string
    number: number
    relation: string
  }
}
