-- Seed users
INSERT INTO users (id, name, email, password_hash, user_type, location, latitude, longitude) VALUES
('user-1', 'Green Farm Co-op', 'farm@example.com', 'hash123', 'donor', '123 Green St, Portland, OR', 45.5152, -122.6784),
('user-2', 'Sarah Johnson', 'sarah@example.com', 'hash456', 'receptor', '456 Main St, Portland, OR', 45.52, -122.68),
('user-3', 'Sweet Bread Bakery', 'bakery@example.com', 'hash789', 'donor', '789 Baker Lane, Portland, OR', 45.51, -122.67),
('user-4', 'Mike Davis', 'mike@example.com', 'hash012', 'receptor', '321 Oak Ave, Portland, OR', 45.525, -122.69);

-- Seed donations
INSERT INTO donations (id, donor_id, title, description, category, quantity, expiry_date, latitude, longitude, address, status, claimed_by, claimed_at) VALUES
('donation-1', 'user-1', 'Fresh Organic Vegetables', 'Carrots, lettuce, broccoli harvested this morning', 'vegetables', '5 kg', '2025-01-03', 45.5152, -122.6784, '123 Green St, Portland, OR', 'available', NULL, NULL),
('donation-2', 'user-3', 'Artisan Bread Assortment', 'Various freshly baked breads', 'bakery', '8 loaves', '2025-01-02', 45.51, -122.67, '789 Baker Lane, Portland, OR', 'claimed', 'user-2', '2025-01-01T10:30:00Z'),
('donation-3', 'user-1', 'Seasonal Fruits', 'Apples and pears from our orchard', 'fruits', '8 kg', '2025-01-04', 45.5152, -122.6784, '123 Green St, Portland, OR', 'available', NULL, NULL),
('donation-4', 'user-3', 'Pastries Mix', 'Croissants, danish pastries, and muffins', 'bakery', '12 pieces', '2025-01-02', 45.51, -122.67, '789 Baker Lane, Portland, OR', 'available', NULL, NULL);

-- Seed sample notifications
INSERT INTO notifications (id, user_id, type, title, message, related_donation_id, read) VALUES
('notif-1', 'user-2', 'new-donation', 'New Donation Available', 'Fresh Organic Vegetables is now available near you', 'donation-1', FALSE),
('notif-2', 'user-1', 'donation-claimed', 'Donation Claimed!', 'Your donation has been claimed by Sarah Johnson', 'donation-2', TRUE),
('notif-3', 'user-2', 'donation-ready', 'Donation Ready', 'Your claimed donation is ready for pickup', 'donation-2', TRUE);
