import { createClient } from "@supabase/supabase-js/dist/index.cjs";
import 'dotenv/config'

const supabase = createClient(
    process.env.supabase_url, 
    process.env.supabase_API_KEY
)


export { supabase }