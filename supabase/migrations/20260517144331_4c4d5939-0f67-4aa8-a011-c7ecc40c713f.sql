CREATE TABLE public.content_filters (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE UNIQUE,
  parent_id UUID NOT NULL,
  age_preset TEXT,
  category_states JSONB NOT NULL DEFAULT '{}'::jsonb,
  blocked_sites TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  safe_search BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.content_filters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents view own filters" ON public.content_filters FOR SELECT USING (auth.uid() = parent_id);
CREATE POLICY "Parents insert own filters" ON public.content_filters FOR INSERT WITH CHECK (auth.uid() = parent_id);
CREATE POLICY "Parents update own filters" ON public.content_filters FOR UPDATE USING (auth.uid() = parent_id);
CREATE POLICY "Parents delete own filters" ON public.content_filters FOR DELETE USING (auth.uid() = parent_id);

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER content_filters_touch BEFORE UPDATE ON public.content_filters
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();