export interface Customer {
    id: number
    name: string
    email: string | null
    phone: string
    image: string
    address: string
  }
  
  export interface CustomerResponse {
    success: boolean
    data: {
      data: Customer[]
      current_page: number
      last_page: number
      total: number
    }
    message: string[]
  }
  
  