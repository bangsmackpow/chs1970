-- D1 Schema for Creston Community High School Class of 1970 Digital Time Capsule

-- Classmates table
CREATE TABLE IF NOT EXISTS classmates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    maiden_name TEXT,
    status TEXT NOT NULL DEFAULT 'alive' CHECK(status IN ('alive', 'deceased', 'unknown')),
    bio TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    photo_url TEXT,
    r2_photo_key TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Memorials table for deceased classmates
CREATE TABLE IF NOT EXISTS memorials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    classmate_id INTEGER NOT NULL,
    memorial_text TEXT NOT NULL,
    date_of_passing DATE,
    obituary_url TEXT,
    photo_url TEXT,
    r2_photo_key TEXT,
    candle_lit INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (classmate_id) REFERENCES classmates(id) ON DELETE CASCADE
);

-- Gallery metadata for yearbook scans and newspaper clippings
CREATE TABLE IF NOT EXISTS gallery_metadata (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    caption TEXT,
    category TEXT NOT NULL CHECK(category IN ('Academics', 'Sports', 'Candid', 'Events', 'Newspaper')),
    date_taken DATE,
    r2_object_key TEXT NOT NULL,
    thumbnail_r2_key TEXT,
    width INTEGER,
    height INTEGER,
    tags TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Timeline events for 1970 Creston local history
CREATE TABLE IF NOT EXISTS timeline_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    category TEXT CHECK(category IN ('School', 'Community', 'Sports', 'Civic', 'National')),
    image_r2_key TEXT,
    source_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for search performance
CREATE INDEX IF NOT EXISTS idx_classmates_last_name ON classmates(last_name);
CREATE INDEX IF NOT EXISTS idx_classmates_status ON classmates(status);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_metadata(category);
CREATE INDEX IF NOT EXISTS idx_timeline_date ON timeline_events(event_date);
CREATE INDEX IF NOT EXISTS idx_memorials_classmate ON memorials(classmate_id);
