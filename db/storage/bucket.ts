import { supabase } from "../data/supabase";

export const bucket = supabase.storage.from("pdf");
