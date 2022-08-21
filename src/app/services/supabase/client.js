import { createClient } from "@supabase/supabase-js";
//
// const options = {
//   schema: 'public',
//   headers: { 'x-my-custom-header': 'my-app-name' },
//   autoRefreshToken: true,
//   persistSession: true,
//   detectSessionInUrl: true
// }
//
const supabase = createClient(
  "https://dooobbgqjthlgnrwsfpw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvb29iYmdxanRobGducndzZnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM1NTcxNzMsImV4cCI6MTk2OTEzMzE3M30.8ed9ta3guh_A-YzHzc1qmUP7JzIf8BMSMspBnddX-SE"
);
//
export default supabase;
