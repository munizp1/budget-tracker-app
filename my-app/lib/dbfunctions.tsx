

export async function getProfile_id(supabase, user) {
   
    try {
        const { data:profile, error } = await supabase
        
            .from("profile")
            .select("*")
            .eq("id", user);
            
            

        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
       

        if (profile && profile.length > 0) {
            
            
            
            return profile;
        } else {
            console.log("No profile data found for user ID:", user.id);
            return null;
        }
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}



export async function AddIncome(supabase, user, income) {
   
    try {
        const { data:profile, error } = await supabase
        
            .from("profile")
            .update({ income: income })
            .eq("id", user[0].id);
            
            

        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
       

        
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}

export async function AddPayment(supabase, user, category, time, price) {
    
    
    console.log("USERID",user[0].profile_id);
    try {
        const { data:payment, error } = await supabase
            .from('payment')
            .insert([
            { category: category, time: time, price: price, profile_id_user: user[0].profile_id},
            ])
            .select()
            
            

        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
        
        

        
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}





export async function getPaymentData(supabase, user) {
    
    
    console.log("USERID",user[0].profile_id);
    try {
        const { data:payment, error } = await supabase
            .from('payment')
            .select('*')
            .eq("profile_id_user", user[0].profile_id) 
            
            

        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
    
        return payment;

        
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}


export async function deleteCategory (supabase, categoryId) {
   
    console.log("CATEGORY IDDD", categoryId)
 
    try {
        const { data:payment, error } = await supabase
            .from('payment')
            .delete()
            .eq("id", categoryId) 
            
            

        if (error) {
            console.log("ERRORRRRRRRR")
            throw error;
        }
      
       

        
    } catch (error) {
        console.error('Error getting profile:', error.message);
        throw error;
    }
}

