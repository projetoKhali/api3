CREATE TABLE IF NOT EXISTS notifications (
    apt_id INT PRIMARY KEY,
    usr_id integer,
    status boolean DEFAULT false,
    type apt_status DEFAULT 'Pending',
    CONSTRAINT fk_apt_id FOREIGN KEY
    (apt_id) REFERENCES appointments(apt_id),
    CONSTRAINT fk_usr_id FOREIGN KEY
    (usr_id) REFERENCES users(usr_id)
);
