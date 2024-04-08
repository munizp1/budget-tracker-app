
import { createClient } from '@/utils/supabase/server';
import Layout from "../components/layout"

export default async function Notes() {
  const supabase = createClient();
  const { data: notes } = await supabase.from("notes").select();

  return (
    <Layout>
      
        <header className="bg-gray-800 text-white py-4">
          <div className="container mx-auto w-full px-6">
            <h1 className="text-2xl font-semibold">WELCOME TO BUDGET TRACKER!!!!</h1>
            {/* Add any additional header elements here */}
          </div>
        </header>
        <div className="container mx-auto w-full px-6">
          <pre>{JSON.stringify(notes, null, 2)}</pre>

        </div>
        <div className="container mx-auto w-full px-6">
          <pre>{JSON.stringify(notes, null, 2)}</pre>
          
        </div>
      
    </Layout>
  );
  
}
