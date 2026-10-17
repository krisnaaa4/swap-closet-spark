CREATE TABLE public.listings (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID NOT NULL, title TEXT NOT NULL, description TEXT, category TEXT, gender TEXT, brand TEXT, size TEXT, condition TEXT, price INT, photo_urls TEXT[] DEFAULT '{}', ai_confidence NUMERIC, status TEXT NOT NULL DEFAULT 'Menunggu QC', created_at TIMESTAMPTZ NOT NULL DEFAULT now());
GRANT SELECT, INSERT, UPDATE, DELETE ON public.listings TO authenticated;
GRANT ALL ON public.listings TO service_role;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own listings" ON public.listings FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own listings" ON public.listings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own listings" ON public.listings FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own listings" ON public.listings FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.b2b_partners (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID, org_name TEXT NOT NULL, org_type TEXT NOT NULL, contact_name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, city TEXT, volume_estimate TEXT, message TEXT, status TEXT NOT NULL DEFAULT 'pending', created_at TIMESTAMPTZ NOT NULL DEFAULT now());
GRANT SELECT, INSERT ON public.b2b_partners TO authenticated;
GRANT ALL ON public.b2b_partners TO service_role;
ALTER TABLE public.b2b_partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own partner applications" ON public.b2b_partners FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can submit partner application" ON public.b2b_partners FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);