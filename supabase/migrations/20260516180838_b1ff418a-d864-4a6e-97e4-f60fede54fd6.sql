
CREATE TABLE public.children (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL CHECK (char_length(first_name) BETWEEN 1 AND 40),
  age INTEGER NOT NULL CHECK (age BETWEEN 0 AND 25),
  avatar_color TEXT NOT NULL CHECK (avatar_color IN ('peach','mint','sky','lavender','butter','rose')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_children_parent ON public.children(parent_id);

ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Parents view own children" ON public.children
  FOR SELECT USING (auth.uid() = parent_id);

CREATE POLICY "Parents insert own children" ON public.children
  FOR INSERT WITH CHECK (auth.uid() = parent_id);

CREATE POLICY "Parents update own children" ON public.children
  FOR UPDATE USING (auth.uid() = parent_id);

CREATE POLICY "Parents delete own children" ON public.children
  FOR DELETE USING (auth.uid() = parent_id);
