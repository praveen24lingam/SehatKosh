-- DEMO MODE SETUP
--
-- Authentication has been removed from the app. The existing RLS policies in
-- schema.sql are all keyed on auth.uid(), which is NULL without a session, so
-- every read returns empty and every write is rejected.
--
-- Run this script once against your Supabase project to make the app work with
-- the single hardcoded demo user (see src/lib/constants/demoUser.ts).
--
-- WARNING: this opens every table to the anon key. Only use it for a demo /
-- local build, never for real user data.

-- 1. Seed the demo user (id must match DEMO_USER_ID in the app).
INSERT INTO users (id, phone_number, name, language)
VALUES ('00000000-0000-0000-0000-000000000001', '9999999999', 'Demo User', 'hindi')
ON CONFLICT (id) DO NOTHING;

-- 2. Drop the auth-based policies.
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can manage own family" ON family_members;
DROP POLICY IF EXISTS "Users can manage own health records" ON health_records;
DROP POLICY IF EXISTS "Users can manage own vaccinations" ON vaccinations;
DROP POLICY IF EXISTS "Users can manage own dose reminders" ON dose_reminders;
DROP POLICY IF EXISTS "Users can view own chat history" ON chat_history;
DROP POLICY IF EXISTS "Users can manage own schemes saved" ON schemes_saved;
DROP POLICY IF EXISTS "Users can view own jan aushadhi history" ON jan_aushadhi_history;

-- 3. Allow the anon key full access (demo only).
CREATE POLICY "Demo full access" ON users               FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Demo full access" ON family_members      FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Demo full access" ON health_records      FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Demo full access" ON vaccinations        FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Demo full access" ON dose_reminders      FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Demo full access" ON chat_history        FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Demo full access" ON schemes_saved       FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Demo full access" ON jan_aushadhi_history FOR ALL USING (true) WITH CHECK (true);
