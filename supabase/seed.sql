-- Seed initial message templates
INSERT INTO public.message_templates (name, channel, body, description) VALUES
  ('Win-back offer', 'whatsapp', 'Hi {name}, we miss you in {city}! Here''s 20% off your next order — code COMEBACK20.', 'Re-engage lapsed customers'),
  ('VIP thank-you', 'email', 'Dear {full_name}, thank you for being a Lumière VIP. Enjoy early access to our new serum collection.', 'Reward top spenders'),
  ('Diwali offer', 'whatsapp', 'Happy Diwali {name}! ✨ Light up your routine with 25% off premium serums.', 'Festive seasonal blast')
ON CONFLICT DO NOTHING;
