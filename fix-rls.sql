-- Drop the existing restrictive policies
drop policy if exists "Users can view own saves" on saves;
drop policy if exists "Users can insert own saves" on saves;
drop policy if exists "Users can update own saves" on saves;
drop policy if exists "Users can delete own saves" on saves;

drop policy if exists "Users can view own tags" on tags;
drop policy if exists "Users can insert own tags" on tags;
drop policy if exists "Users can update own tags" on tags;
drop policy if exists "Users can delete own tags" on tags;

drop policy if exists "Users can view own folders" on folders;
drop policy if exists "Users can insert own folders" on folders;
drop policy if exists "Users can update own folders" on folders;
drop policy if exists "Users can delete own folders" on folders;

drop policy if exists "Users can view own save_tags" on save_tags;
drop policy if exists "Users can insert own save_tags" on save_tags;
drop policy if exists "Users can delete own save_tags" on save_tags;

drop policy if exists "Users can view own preferences" on user_preferences;
drop policy if exists "Users can insert own preferences" on user_preferences;
drop policy if exists "Users can update own preferences" on user_preferences;

-- Create permissive policies for single-user mode
create policy "Allow all saves" on saves for all using (true) with check (true);
create policy "Allow all tags" on tags for all using (true) with check (true);
create policy "Allow all folders" on folders for all using (true) with check (true);
create policy "Allow all save_tags" on save_tags for all using (true) with check (true);
create policy "Allow all preferences" on user_preferences for all using (true) with check (true);
