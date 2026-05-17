CREATE TABLE public.contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id uuid NOT NULL,
  child_id uuid NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
  daily_limits jsonb NOT NULL DEFAULT '{}'::jsonb,
  category_rules jsonb NOT NULL DEFAULT '{}'::jsonb,
  reward text,
  status text NOT NULL DEFAULT 'pending',
  share_token text NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  expires_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.contracts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents view own contracts" ON public.contracts FOR SELECT USING (auth.uid() = parent_id);
CREATE POLICY "Parents insert own contracts" ON public.contracts FOR INSERT WITH CHECK (auth.uid() = parent_id);
CREATE POLICY "Parents update own contracts" ON public.contracts FOR UPDATE USING (auth.uid() = parent_id);
CREATE POLICY "Parents delete own contracts" ON public.contracts FOR DELETE USING (auth.uid() = parent_id);

CREATE INDEX idx_contracts_parent ON public.contracts(parent_id);
CREATE INDEX idx_contracts_share_token ON public.contracts(share_token);