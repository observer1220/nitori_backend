CREATE TABLE
    "customers" (
        "id" bigserial PRIMARY KEY,
        "full_name" VARCHAR(100) NOT NULL,
        "email" VARCHAR(100) NOT NULL,
        "mobile" VARCHAR(20) NOT NULL,
        "address" VARCHAR(200) NOT NULL
    );