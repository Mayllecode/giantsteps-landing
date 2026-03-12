-- ============================================================
-- GiantSteps Studio · Supabase Schema
-- ============================================================

-- Estilos de baile disponibles
CREATE TABLE styles (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  slug       text NOT NULL UNIQUE,
  color      text NOT NULL DEFAULT '#00c9b1',
  created_at timestamptz DEFAULT now()
);

-- Instructores
CREATE TABLE instructors (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  role        text NOT NULL,
  bio         text,
  photo_url   text,
  instagram   text,
  whatsapp    text,
  is_active   boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- Relación instructores <-> estilos
CREATE TABLE instructor_styles (
  instructor_id uuid REFERENCES instructors(id) ON DELETE CASCADE,
  style_id      uuid REFERENCES styles(id) ON DELETE CASCADE,
  PRIMARY KEY (instructor_id, style_id)
);

-- Planes de inscripción
CREATE TABLE plans (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  price       numeric(8,2) NOT NULL DEFAULT 0,
  period      text NOT NULL DEFAULT 'mes',
  description text,
  features    text[] NOT NULL DEFAULT '{}',
  is_featured boolean DEFAULT false,
  color       text DEFAULT '#00c9b1',
  is_active   boolean DEFAULT true,
  created_at  timestamptz DEFAULT now()
);

-- Clases del horario semanal
CREATE TABLE classes (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  style_id      uuid REFERENCES styles(id) ON DELETE SET NULL,
  instructor_id uuid REFERENCES instructors(id) ON DELETE SET NULL,
  plan_id       uuid REFERENCES plans(id) ON DELETE SET NULL,
  day_of_week   smallint NOT NULL CHECK (day_of_week BETWEEN 1 AND 7),
  start_time    time NOT NULL,
  end_time      time NOT NULL,
  location      text NOT NULL DEFAULT 'Sala Principal',
  level         text NOT NULL DEFAULT 'Todos los niveles',
  max_students  smallint DEFAULT 20,
  is_active     boolean DEFAULT true,
  created_at    timestamptz DEFAULT now()
);

-- Alumnos / estudiantes
CREATE TABLE students (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name    text NOT NULL,
  email        text UNIQUE,
  phone        text,
  birthdate    date,
  avatar_url   text,
  notes        text,
  is_active    boolean DEFAULT true,
  created_at   timestamptz DEFAULT now(),
  updated_at   timestamptz DEFAULT now()
);

-- Inscripciones (alumno → clase/plan)
CREATE TABLE enrollments (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_id      uuid REFERENCES classes(id) ON DELETE SET NULL,
  plan_id       uuid REFERENCES plans(id) ON DELETE SET NULL,
  status        text NOT NULL DEFAULT 'active'
                  CHECK (status IN ('active','paused','cancelled','completed')),
  enrolled_at   timestamptz DEFAULT now(),
  expires_at    timestamptz,
  amount_paid   numeric(8,2),
  notes         text
);

-- Asistencias
CREATE TABLE attendances (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id uuid NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  class_date    date NOT NULL,
  status        text NOT NULL DEFAULT 'present'
                  CHECK (status IN ('present','absent','late','excused')),
  notes         text,
  created_at    timestamptz DEFAULT now(),
  UNIQUE (enrollment_id, class_date)
);

-- Pagos
CREATE TABLE payments (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  enrollment_id uuid REFERENCES enrollments(id) ON DELETE SET NULL,
  amount        numeric(8,2) NOT NULL,
  currency      text NOT NULL DEFAULT 'PEN',
  method        text NOT NULL DEFAULT 'efectivo'
                  CHECK (method IN ('efectivo','transferencia','yape','plin','tarjeta')),
  status        text NOT NULL DEFAULT 'paid'
                  CHECK (status IN ('paid','pending','refunded','cancelled')),
  reference     text,
  paid_at       timestamptz DEFAULT now(),
  notes         text,
  created_at    timestamptz DEFAULT now()
);

-- Galería de fotos/videos
CREATE TABLE gallery (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title        text,
  description  text,
  media_url    text NOT NULL,
  media_type   text NOT NULL DEFAULT 'image'
                 CHECK (media_type IN ('image','video')),
  category     text,
  is_published boolean DEFAULT true,
  sort_order   smallint DEFAULT 0,
  created_at   timestamptz DEFAULT now()
);

-- Testimonios
CREATE TABLE testimonials (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id   uuid REFERENCES students(id) ON DELETE SET NULL,
  author_name  text NOT NULL,
  author_role  text,
  avatar_url   text,
  comment      text NOT NULL,
  stars        smallint NOT NULL DEFAULT 5 CHECK (stars BETWEEN 1 AND 5),
  is_published boolean DEFAULT false,
  created_at   timestamptz DEFAULT now()
);

-- Mensajes de contacto (WhatsApp / formulario)
CREATE TABLE contact_messages (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  phone       text,
  email       text,
  message     text NOT NULL,
  source      text DEFAULT 'web',
  is_read     boolean DEFAULT false,
  created_at  timestamptz DEFAULT now()
);

-- ============================================================
-- RLS: Habilitar seguridad por filas en todas las tablas
-- ============================================================

ALTER TABLE styles             ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructors        ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructor_styles  ENABLE ROW LEVEL SECURITY;
ALTER TABLE plans              ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes            ENABLE ROW LEVEL SECURITY;
ALTER TABLE students           ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments        ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendances        ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments           ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery            ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials       ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages   ENABLE ROW LEVEL SECURITY;

-- Lectura pública para tablas del landing (sin autenticación)
CREATE POLICY "public_read_styles"        ON styles        FOR SELECT USING (true);
CREATE POLICY "public_read_instructors"   ON instructors   FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_plans"         ON plans         FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_classes"       ON classes       FOR SELECT USING (is_active = true);
CREATE POLICY "public_read_gallery"       ON gallery       FOR SELECT USING (is_published = true);
CREATE POLICY "public_read_testimonials"  ON testimonials  FOR SELECT USING (is_published = true);

-- Insert público solo para mensajes de contacto
CREATE POLICY "public_insert_contact"     ON contact_messages FOR INSERT WITH CHECK (true);

-- Escritura completa solo para el rol admin (service_role o rol personalizado)
CREATE POLICY "admin_all_students"        ON students          FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "admin_all_enrollments"     ON enrollments       FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "admin_all_attendances"     ON attendances       FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "admin_all_payments"        ON payments          FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "admin_all_contact"         ON contact_messages  FOR ALL USING (auth.role() = 'service_role');

-- ============================================================
-- Datos semilla (seed)
-- ============================================================

INSERT INTO styles (name, slug, color) VALUES
  ('Salsa',          'salsa',          '#ff6b35'),
  ('Bachata',        'bachata',        '#00c9b1'),
  ('Hip Hop',        'hip-hop',        '#9b59b6'),
  ('Ballet Básico',  'ballet',         '#e91e8c'),
  ('Contemporáneo',  'contemporaneo',  '#f5c518'),
  ('Urbano',         'urbano',         '#2ecc71');

INSERT INTO plans (name, price, period, description, features, is_featured, color) VALUES
  ('Básico', 80, 'mes', 'Ideal para comenzar tu camino en el baile.',
   ARRAY['1 estilo de baile','2 clases por semana','Acceso a sala de práctica libre','Asesoría básica'],
   false, '#888888'),
  ('Intensivo', 130, 'mes', 'Para quienes quieren avanzar rápido.',
   ARRAY['2 estilos de baile','4 clases por semana','Acceso ilimitado a sala de práctica','Seguimiento personalizado','Clases especiales'],
   true, '#00c9b1'),
  ('Staff / Beca', 0, 'mes', 'Postula y forma parte del equipo GiantSteps.',
   ARRAY['Beca completa o media beca','Todos los estilos','Formación como instructor','Shows y eventos','Certificación interna'],
   false, '#f5c518');
