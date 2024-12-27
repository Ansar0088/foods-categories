import axios from "axios";

export const fetchCategories = async () => {
    const response = await fetch("https://app.chickenfriedhub.com/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  };

  export const loginUser = async (email: string, password: string) => {
    const response = await fetch("https://app.chickenfriedhub.com/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to log in");
    }
  
    const data = await response.json();
    console.log("User logged in successfully:", data);
  
    return data;
  };


  

export const fetchCustomers = async (query: string) => {
  const token = "1|PQyFtP0XWWahY716dnQAa3x8uaAtO9cRPNheexy4485d32ad"; 

  const response = await axios.get(
    `https://app.chickenfriedhub.com/api/customer/list`,
    {
      params: { search: query },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data.data; 
};

  
  
  
  