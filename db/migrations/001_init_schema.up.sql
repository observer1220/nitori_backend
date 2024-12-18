CREATE TABLE
  "products" (
    "id" bigserial PRIMARY KEY,
    "name" VARCHAR(100),
    "price" INTEGER NOT NULL,
    "discount_price" INTEGER,
    "stock" INTEGER NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    "status" Boolean NOT NULL
  );