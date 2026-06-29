-- 1. USERS TABLE
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number VARCHAR(15) UNIQUE NOT NULL,
  name VARCHAR(100),
  language VARCHAR(10) DEFAULT 'hindi',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. FAMILY MEMBERS TABLE
CREATE TABLE family_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  relation VARCHAR(20) NOT NULL,
  -- relation values: 'self', 'father', 'mother', 
  --                  'child', 'spouse', 'grandparent', 'other'
  dob DATE,
  blood_group VARCHAR(5),
  -- blood_group values: 'A+','A-','B+','B-','O+','O-','AB+','AB-'
  allergies TEXT[],
  chronic_conditions TEXT[],
  emergency_contact VARCHAR(15),
  gender VARCHAR(10),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HEALTH RECORDS TABLE
CREATE TABLE health_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  record_type VARCHAR(30) NOT NULL,
  -- record_type values: 'blood_report', 'prescription', 
  --                     'tablet_box', 'discharge_summary', 'other'
  title VARCHAR(200) NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  image_url TEXT,
  ai_summary TEXT,
  raw_data JSONB,
  -- raw_data: extracted values from report
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. VACCINATIONS TABLE
CREATE TABLE vaccinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  vaccine_name VARCHAR(100) NOT NULL,
  dose_number INTEGER DEFAULT 1,
  scheduled_date DATE,
  given_date DATE,
  status VARCHAR(20) DEFAULT 'pending',
  -- status values: 'done', 'due', 'overdue', 'upcoming'
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. DOSE REMINDERS TABLE
CREATE TABLE dose_reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,
  medicine_name VARCHAR(200) NOT NULL,
  time_of_day VARCHAR(20) NOT NULL,
  -- time_of_day values: 'morning', 'afternoon', 'evening', 'night'
  time_label VARCHAR(20),
  -- time_label: '8:00 AM', '9:00 PM' etc
  days VARCHAR(20) DEFAULT 'daily',
  -- days values: 'daily', 'mon-fri', 'alternate'
  is_active BOOLEAN DEFAULT true,
  last_taken_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. CHAT HISTORY TABLE
CREATE TABLE chat_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  message_type VARCHAR(20) DEFAULT 'text',
  -- message_type values: 'text', 'image', 'document'
  metadata JSONB,
  -- metadata: image_url, document_type, etc
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. SCHEMES SAVED TABLE
CREATE TABLE schemes_saved (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  scheme_name VARCHAR(200) NOT NULL,
  scheme_name_hindi VARCHAR(200),
  benefit_description TEXT,
  amount VARCHAR(100),
  eligibility_criteria TEXT,
  official_link TEXT,
  eligibility_answers JSONB,
  last_verified DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. JAN AUSHADHI HISTORY TABLE
CREATE TABLE jan_aushadhi_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  branded_name VARCHAR(200) NOT NULL,
  generic_name VARCHAR(200),
  salt_composition VARCHAR(200),
  branded_price DECIMAL(10,2),
  generic_price DECIMAL(10,2),
  monthly_savings DECIMAL(10,2),
  yearly_savings DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- INDEXES for performance
CREATE INDEX idx_family_members_user_id ON family_members(user_id);
CREATE INDEX idx_health_records_member_id ON health_records(member_id);
CREATE INDEX idx_vaccinations_member_id ON vaccinations(member_id);
CREATE INDEX idx_dose_reminders_user_id ON dose_reminders(user_id);
CREATE INDEX idx_chat_history_user_id ON chat_history(user_id);
CREATE INDEX idx_schemes_saved_user_id ON schemes_saved(user_id);
CREATE INDEX idx_jan_aushadhi_user_id ON jan_aushadhi_history(user_id);

-- ROW LEVEL SECURITY
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE vaccinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE dose_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE schemes_saved ENABLE ROW LEVEL SECURITY;
ALTER TABLE jan_aushadhi_history ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES (user sirf apna data dekhe)
CREATE POLICY "Users can view own data" ON users
  FOR ALL USING (auth.uid()::text = id::text);

CREATE POLICY "Users can manage own family" ON family_members
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE auth.uid()::text = id::text
  ));

CREATE POLICY "Users can manage own health records" ON health_records
  FOR ALL USING (member_id IN (
    SELECT id FROM family_members WHERE user_id IN (
      SELECT id FROM users WHERE auth.uid()::text = id::text
    )
  ));

CREATE POLICY "Users can manage own vaccinations" ON vaccinations
  FOR ALL USING (member_id IN (
    SELECT id FROM family_members WHERE user_id IN (
      SELECT id FROM users WHERE auth.uid()::text = id::text
    )
  ));

CREATE POLICY "Users can manage own dose reminders" ON dose_reminders
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE auth.uid()::text = id::text
  ));

CREATE POLICY "Users can view own chat history" ON chat_history
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE auth.uid()::text = id::text
  ));

CREATE POLICY "Users can manage own schemes saved" ON schemes_saved
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE auth.uid()::text = id::text
  ));

CREATE POLICY "Users can view own jan aushadhi history" ON jan_aushadhi_history
  FOR ALL USING (user_id IN (
    SELECT id FROM users WHERE auth.uid()::text = id::text
  ));
