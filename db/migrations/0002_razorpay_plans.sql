-- Add Razorpay plan IDs to the plans table
ALTER TABLE plans ADD COLUMN razorpay_plan_id TEXT;

-- Update seed plans with Razorpay plan IDs (placeholder — replace with actual Razorpay plan IDs)
UPDATE plans SET razorpay_plan_id = 'rzp_plan_free' WHERE id = 'plan_free';
UPDATE plans SET razorpay_plan_id = 'rzp_plan_starter' WHERE id = 'plan_starter';
UPDATE plans SET razorpay_plan_id = 'rzp_plan_growth' WHERE id = 'plan_growth';
UPDATE plans SET razorpay_plan_id = 'rzp_plan_scale' WHERE id = 'plan_scale';
